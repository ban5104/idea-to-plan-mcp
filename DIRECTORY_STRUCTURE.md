# Workflow MCP - Directory Structure

This document provides a visual reference for the complete project directory structure.

```
workflow-mcp/
├── local-server.js
├── node_modules/
├── package-lock.json
├── package.json
├── src/
│   └── index.js
├── state/
└── workflows/
    ├── idea-processor/
    │   ├── config.json
    │   ├── 01-idea-to-plan-agent/
    │   │   ├── knowledgebase/
    │   │   │   └── idea-to-plan.md
    │   │   └── custom-instructions/
    │   │       └── idea-to-plan.md
    │   ├── 02-planning-tuner-agent/
    │   │   ├── knowledgebase/
    │   │   │   └── PLANNING.md
    │   │   └── custom-instructions/
    │   │       └── planning-tuner.md
    │   └── 03-claude-builder-agent/
    │       ├── knowledgebase/
    │       │   └── CLAUDE.md
    │       └── custom-instructions/
    │           └── claude-builder.md
    └── shared/
        ├── patterns.md
        └── principles.md
```

## Component Descriptions

### Core System
- **`src/index.js`** - MCP server implementation that handles workflow execution
- **`local-server.js`** - Server entry point for the MCP workflow system
- **`state/`** - Directory where workflow execution state is stored

### Workflow Configuration
- **`workflows/idea-processor/config.json`** - Workflow configuration defining steps, dependencies, and outputs
- **Numbered agent directories** - Sequential organization (01, 02, 03) for clear workflow progression

### Agent Structure
Each agent directory contains:
- **`knowledgebase/`** - Agent-specific knowledge base files that get injected into instructions
- **`custom-instructions/`** - Agent behavior definitions and prompting instructions

### Workflow Process
1. **01-idea-to-plan-agent** - Takes raw ideas and creates structured plans
2. **02-planning-tuner-agent** - Refines plans into properly formatted PLANNING.md documents  
3. **03-claude-builder-agent** - Creates CLAUDE.md files for implementation guidance

### Shared Resources
- **`shared/`** - Common patterns and principles that can be used across multiple workflows

## Usage Notes
- Agent directories are numbered for clear sequential execution
- Each agent has isolated knowledge bases and instructions
- The `{{include: path}}` mechanism injects knowledge base content into agent instructions
- Workflow state is preserved in the `state/` directory for step-by-step execution