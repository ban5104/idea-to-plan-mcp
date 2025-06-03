Before starting work on this project you MUST read PLANNING.md
- Provides high-level vision, architecture, constraints, tech stack, tools, etc.
- reference this file at the beginning of any new conversation.
- Use the structure and decisions outlined in PLANNING.md

## Project Overview
- Refer to PLANNING.md

## Tools Available
- Refer to PLANNING.md

## Architecture Decisions
- refer to PLANNING.md

## Key Commands
```bash
# Install dependencies
npm install  # or pip install -r requirements.txt

# Run development
npm run dev  # or python main.py

# Run tests
npm test  # or pytest

# Lint/Format
npm run lint  # or ruff check .
npm run format  # or black .

# Build
npm run build  # or python setup.py build
```

## Project Structure
```
project-root/
├── .claude/
├── src/
│   └── main.py
├── tests/
│   └── test_main.py
├── knowledge_base/         # Your context files for the AI agent using Anthropic file API
│   ├── document1.txt
│   ├── product_specs.jsonl
│   └── faq.md
├── .gitignore
├── CLAUDE.md               # Main project context file (root level)
├── PLANNING.md             # Project planning and roadmap
├── README.md
└── requirements.txt
```

## Coding Standards
- **Style**: Follow existing patterns in codebase
- **Naming**: camelCase for functions/variables, PascalCase for classes/components
- **Files**: One component/class per file, named after the export
- **Imports**: Absolute imports from src/, group by external/internal

## Testing Approach
- Iteratively test new features, using results for refinement.
- Unit test utilities/services for foundational reliability.
- UI test with Puppeteer: verify flows, observe, and iteratively refine UI/UX.
- Integration test API endpoints for component connectivity.
- Test file naming: *.test.js or test_*.py.

## Development Workflow
1. Check existing patterns before implementing
2. Run tests before committing
3. Keep changes focused and atomic
4. Update tests when changing functionality

## Important Notes
- before you write code make a plan
- [Any special considerations]
- [Performance requirements]
- [Security considerations]
- [Third-party service dependencies]

## DO NOT
- Commit sensitive data or API keys
- Skip tests for new features
- Break existing functionality
- Add unnecessary dependencies
