# Idea Processor MCP

An MCP (Model Context Protocol) server that processes ideas through a structured workflow to create project plans and documentation.

## Workflow Steps

1. **Idea to Plan Agent** - Transforms raw ideas into structured initial plans
2. **Planning Tuner Agent** - Refines plans into a comprehensive PLANNING.md document
3. **Claude Builder Agent** - Creates CLAUDE.md and other project setup files

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Structure

- `agents/` - Contains the three workflow agents with their instructions and knowledge bases
- `src/` - MCP server implementation
- `state/` - Runtime state storage
- `workflow-config.json` - Workflow configuration