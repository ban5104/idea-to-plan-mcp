#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

class WorkflowMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "workflow-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_step_instructions",
            description: "Get instructions for a specific workflow step",
            inputSchema: {
              type: "object",
              properties: {
                workflowId: {
                  type: "string",
                  description: "ID of the workflow",
                },
                stepNumber: {
                  type: "number",
                  description: "Step number (1-based)",
                },
              },
              required: ["workflowId", "stepNumber"],
            },
          },
          {
            name: "save_step_output",
            description: "Save output from a completed workflow step",
            inputSchema: {
              type: "object",
              properties: {
                workflowId: {
                  type: "string",
                  description: "ID of the workflow",
                },
                stepId: {
                  type: "string",
                  description: "ID of the step",
                },
                output: {
                  type: "object",
                  description: "Step output data",
                },
              },
              required: ["workflowId", "stepId", "output"],
            },
          },
          {
            name: "get_previous_context",
            description: "Get context from previous steps in the workflow",
            inputSchema: {
              type: "object",
              properties: {
                workflowId: {
                  type: "string",
                  description: "ID of the workflow",
                },
                currentStep: {
                  type: "number",
                  description: "Current step number",
                },
              },
              required: ["workflowId", "currentStep"],
            },
          },
          {
            name: "list_workflows",
            description: "List all available workflows",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "get_workflow_status",
            description: "Get the current status of a workflow execution",
            inputSchema: {
              type: "object",
              properties: {
                workflowId: {
                  type: "string",
                  description: "ID of the workflow",
                },
              },
              required: ["workflowId"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_step_instructions":
            return await this.getStepInstructions(args.workflowId, args.stepNumber);
          case "save_step_output":
            return await this.saveStepOutput(args.workflowId, args.stepId, args.output);
          case "get_previous_context":
            return await this.getPreviousContext(args.workflowId, args.currentStep);
          case "list_workflows":
            return await this.listWorkflows();
          case "get_workflow_status":
            return await this.getWorkflowStatus(args.workflowId);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async getStepInstructions(workflowId, stepNumber) {
    const configPath = join(PROJECT_ROOT, 'workflows', workflowId, 'config.json');
    const config = JSON.parse(await readFile(configPath, 'utf8'));
    
    const step = config.steps[stepNumber - 1];
    if (!step) {
      throw new Error(`Step ${stepNumber} not found in workflow ${workflowId}`);
    }

    const stepPath = join(PROJECT_ROOT, 'workflows', workflowId, step.file);
    let stepContent = await readFile(stepPath, 'utf8');
    
    // Inject context and variables
    stepContent = await this.injectContext(stepContent, workflowId, stepNumber, config);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            instructions: stepContent,
            metadata: step,
            totalSteps: config.steps.length,
            workflowName: config.name,
            currentStep: stepNumber
          }, null, 2),
        },
      ],
    };
  }

  async saveStepOutput(workflowId, stepId, output) {
    const statePath = join(PROJECT_ROOT, 'state', workflowId);
    await mkdir(statePath, { recursive: true });
    
    const outputPath = join(statePath, `${stepId}-output.json`);
    await writeFile(outputPath, JSON.stringify(output, null, 2));
    
    return {
      content: [
        {
          type: "text",
          text: `Step output saved successfully for ${workflowId}/${stepId}`,
        },
      ],
    };
  }

  async getPreviousContext(workflowId, currentStep) {
    const context = {};
    const statePath = join(PROJECT_ROOT, 'state', workflowId);
    
    // Get workflow config to map step numbers to IDs
    const configPath = join(PROJECT_ROOT, 'workflows', workflowId, 'config.json');
    const config = JSON.parse(await readFile(configPath, 'utf8'));
    
    for (let i = 0; i < currentStep - 1; i++) {
      const step = config.steps[i];
      const outputPath = join(statePath, `${step.id}-output.json`);
      try {
        const output = JSON.parse(await readFile(outputPath, 'utf8'));
        context[step.id] = output;
      } catch (e) {
        // Step not completed yet or file doesn't exist
      }
    }
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(context, null, 2),
        },
      ],
    };
  }

  async listWorkflows() {
    const workflowsPath = join(PROJECT_ROOT, 'workflows');
    const { readdir } = await import('fs/promises');
    
    try {
      const entries = await readdir(workflowsPath, { withFileTypes: true });
      const workflows = [];
      
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== 'shared') {
          const configPath = join(workflowsPath, entry.name, 'config.json');
          try {
            const config = JSON.parse(await readFile(configPath, 'utf8'));
            workflows.push({
              id: entry.name,
              name: config.name,
              version: config.version,
              stepCount: config.steps.length
            });
          } catch (e) {
            // Skip directories without valid config
          }
        }
      }
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(workflows, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list workflows: ${error.message}`);
    }
  }

  async getWorkflowStatus(workflowId) {
    const configPath = join(PROJECT_ROOT, 'workflows', workflowId, 'config.json');
    const config = JSON.parse(await readFile(configPath, 'utf8'));
    const statePath = join(PROJECT_ROOT, 'state', workflowId);
    
    const status = {
      workflowId,
      name: config.name,
      totalSteps: config.steps.length,
      completedSteps: [],
      nextStep: null
    };
    
    for (let i = 0; i < config.steps.length; i++) {
      const step = config.steps[i];
      const outputPath = join(statePath, `${step.id}-output.json`);
      
      try {
        await access(outputPath);
        status.completedSteps.push({
          stepNumber: i + 1,
          stepId: step.id,
          name: step.name
        });
      } catch (e) {
        if (!status.nextStep) {
          status.nextStep = {
            stepNumber: i + 1,
            stepId: step.id,
            name: step.name
          };
        }
        break;
      }
    }
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(status, null, 2),
        },
      ],
    };
  }

  async injectContext(content, workflowId, stepNumber, config) {
    // Get user's working directory from environment
    const userWorkingDirectory = process.env.PWD || process.cwd();
    
    // Replace variables (including dynamic userWorkingDirectory)
    const allVariables = {
      ...(config.variables || {}),
      userWorkingDirectory: userWorkingDirectory
    };
    
    for (const [key, value] of Object.entries(allVariables)) {
      content = content.replace(new RegExp(`{{variable: ${key}}}`, 'g'), value);
    }
    
    // Include shared files
    const includeRegex = /{{include: ([^}]+)}}/g;
    let match;
    while ((match = includeRegex.exec(content)) !== null) {
      const includePath = join(PROJECT_ROOT, 'workflows', workflowId, match[1]);
      try {
        const includeContent = await readFile(includePath, 'utf8');
        content = content.replace(match[0], includeContent);
      } catch (e) {
        content = content.replace(match[0], `<!-- Could not include ${match[1]} -->`);
      }
    }
    
    // Inject previous outputs
    const outputRegex = /{{previousOutput: ([^}]+)}}/g;
    while ((match = outputRegex.exec(content)) !== null) {
      const [stepId, property] = match[1].split('.');
      const outputPath = join(PROJECT_ROOT, 'state', workflowId, `${stepId}-output.json`);
      try {
        const output = JSON.parse(await readFile(outputPath, 'utf8'));
        const value = property ? output[property] : JSON.stringify(output, null, 2);
        content = content.replace(match[0], value || '');
      } catch (e) {
        content = content.replace(match[0], `<!-- Previous output ${match[1]} not available -->`);
      }
    }
    
    return content;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Workflow MCP Server running on stdio");
  }
}

const server = new WorkflowMCPServer();
server.run().catch(console.error);