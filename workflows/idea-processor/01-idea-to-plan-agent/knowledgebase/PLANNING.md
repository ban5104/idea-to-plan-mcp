# Project Planning
- Provides high-level vision, architecture, constraints, tech stack, tools, etc.

## 0. Guiding Principle: Reference-Driven Specification
**Concept:** Instead of describing desired behaviors (especially UI/UX interactions) from scratch, this plan will often point to existing, well-known applications or patterns as "Reference Implementations." This leverages shared understanding and aligns with how AI models are trained.

**Examples:**
- "Make the command window behave like VS Code's terminal."
- "Text selection should work like in a standard web browser."
- "Combine references: Command interface like VS Code's Command Palette with the smoothness of iTerm2."

**Benefit:** This approach promotes clarity, conciseness, adaptability, and better alignment with AI capabilities. A predefined mapping (like the user's `referenceMappings` example) can be used to standardize these references.

## 1. Problem Statement
**What problem are you solving?**
[Describe the core problem in 2-3 sentences]

**Who experiences this problem?**
[Target users/audience]

**Current solutions and their limitations:**
- [Existing solution 1] - Limited by [...]
- [Existing solution 2] - Fails to [...]

## 2. Solution Overview
**Core Idea:**
[Your solution in one paragraph]

**Key Benefits:**
1. [Benefit 1]
2. [Benefit 2]
3. [Benefit 3]

## 3. User Stories
As a [user type], I want to [action] so that [benefit]
**Primary User Flow:**
1. User arrives at [entry point]
2. User [action 1]
3. User [action 2]
4. User achieves [goal]

**Example Scenarios:**
- Scenario 1: [Specific use case]
- Scenario 2: [Another use case]

## 4. Feature Breakdown

### MVP (Minimum Viable Product)
- [ ] Feature 1: [Description]
    - [ ] Feature 2: [Description]
    - [ ] Feature 3: [Description]

### Phase 2
- [ ] Feature 4: [Description]
- [ ] Feature 5: [Description]

### Future Considerations
- [ ] Feature 6: [Nice to have]

## 5. Technical Architecture

**Tech Stack Decision:**
[Define the technical architecture for this project. This involves specifying the primary technologies for frontend, backend, and database, along with justifications based on project requirements.]

- **Frontend:** [e.g., "React, because its component-based architecture is well-suited for the described UI requirements..."]
- **Backend:** [e.g., "Node.js with Express, as it offers non-blocking I/O ideal for handling multiple API requests and real-time features..."]
- **Database:** [e.g., "PostgreSQL, due to its robustness, support for complex queries, and scalability needed for..."]

- **Key Services, APIs, and Integrations:**
  [From the list below, **select** the necessary tools to use]

  * **PydanticAI (Python Agent Framework):**
     * **Role:** A Python agent framework intended for developing production-ready Generative AI applications. It is particularly suited for projects requiring the construction of AI agents, managing complex interactions with Large Language Models (LLMs), and leveraging Pydantic's data validation and schema management capabilities within AI workflows.
     * **Typical Use Cases:** 
        * Building and managing AI agents.
        * Developing multi-agent applications if required. 
        * Implementing conversational AI features (e.g., chatbots, advanced support systems).
        * Establishing Retrieval Augmented Generation (RAG) pipelines.
        * Enabling capabilities like SQL generation from natural language.

  * **Airtable (via API, for Gmail contacts):** General Use: Integrate to access/manage contact lists for code-driven communication or user data tasks within the application.
  * **Artifact (Claude Interface Tool):** General Use: Creates interactive, editable code artifacts that can be displayed and modified in the Claude interface. Useful for generating complete files, components, or applications that users can interact with directly.
  * **Context7 (Service/API):** General Use: Integrate to provide the application or its users with access to up-to-date documentation or project-specific context. (Note: If this service is intended to be used directly by an AI component within the project via MCP, specify that).
  * **Crawl (Web Scraping Tool):** General Use: Allows crawling and scraping web content from URLs to gather information or analyze websites programmatically.
  * **Execute (Sandboxed Code Runner):** General Use: Enables running code in various programming languages within a sandboxed environment. Useful for testing code snippets, running scripts, or demonstrating functionality.
  * **Gmail API:** General Use: Integrate for programmatic email functionalities within the application (e.g., sending notifications, processing inbound project-related emails).
  * **Google Calendar API:** General Use: Integrate for features requiring programmatic scheduling of project events, task reminders, or managing team/user calendars.
  * **Puppeteer (Node.js Library):** General Use: Utilize in the backend for tasks like automated UI testing of the project's frontend, web scraping for data acquisition, or generating PDFs/screenshots from web pages.
  * **REPL (Interactive Code Environment):** General Use: Provides an interactive Read-Eval-Print Loop environment for languages like Python, JavaScript, etc. Allows for interactive coding sessions and iterative development.
  * **Supabase (Backend-as-a-Service):** General Use: Leverage for its managed PostgreSQL database, authentication, storage, and/or its capabilities for Retrieval Augmented Generation (RAG) if the project includes AI features needing contextual data from this database.
  * **Web Search (API/Integration):** General Use: Web search capabilities for general information retrieval features within the application. an alternative web search capability for queries context7 can't satisfy.
  * **Xero (via MCP Server):** General Use: Integrate with Xero accounting software. The use of its Model Context Protocol (MCP) server is advised if an AI agent component within the planned system will interact with Xero, as MCP standardizes this interaction. For non-AI interaction, Xero's standard API might also be an option. Key for features involving financial data, invoicing, or accounting automation.

**Data Model:**
* **User**
    * id
    * email
    * name
    * created_at

[Other entities]

**Key Relationships:**
- User has many [...]Add commentMore actions
- [...] belongs to [...]

## 6. User Interface
**Overall UI/UX Philosophy:**
[e.g., "Clean, intuitive, and efficient, prioritizing ease of use for novice users while offering power features for experts. Strive for a feel similar to [Primary Reference App like Notion or Slack]."]

**Main Screens/Pages:**
1. Landing/Home - [Purpose and key elements]
2. Dashboard - [Key metrics/actions]
3. [Other screens]

**UI/UX Guiding Principles & Reference Implementations:**
- **General Interaction:**
    - **Copy/Paste:** [e.g., "Native OS behavior" or "Google Docs style for rich text if applicable."]
    - **Keyboard Navigation:** [e.g., "Standard web accessibility patterns" or "Keyboard shortcuts inspired by 'VS Code' for power users."]
    - **Selection:** [e.g., "Standard text selection behavior" or "Block-based selection like 'Notion'."]
    - **Undo/Redo:** [e.g., "Standard application behavior, multi-level undo."]
    - **Responsiveness:** [e.g., "Fully responsive like 'Modern web applications', ensuring usability on mobile, tablet, and desktop."]
    - **Accessibility:** [e.g., "Aim for WCAG AA compliance, drawing inspiration from 'WCAG compliant applications'."]
- **Specific Component Behaviors (Examples):**
    - **Text Editor (if applicable):**
        - Copy/Paste: [e.g., "'VS Code' or 'Google Docs'"]
        - Keyboard: [e.g., "'VS Code' or 'Sublime Text' (non-modal by default)"]
        - Selection: [e.g., "'VS Code' or 'Notion'"]
        - Search: [e.g., "'VS Code' or 'Sublime Text'"]
        - Performance: [e.g., "Strive for the snappiness of 'Sublime Text'"]
    - **Terminal/Command Interface (if applicable):**
        - Copy/Paste: [e.g., "'iTerm2' or 'VS Code Command Palette'"]
        - Keyboard: [e.g., "'iTerm2' or 'Alfred'"]
        - Selection: [e.g., "'iTerm2' or 'Windows Terminal'"]
        - Search: [e.g., "'Alfred' or 'VS Code Command Palette'"]
        - Performance: [e.g., "Responsiveness of 'Alacritty'"]
    - **Data Visualization (if applicable):**
        - Responsive Layout: [e.g., "'Tableau' or 'Observable' examples"]
        - Drag & Drop: [e.g., "'Tableau' or 'Power BI' for chart building"]
        - Performance: [e.g., "Smooth interactions like 'D3.js examples'"]
- **Other Key Interactions:**
    - [e.g., "File Uploads: Drag-and-drop behavior similar to Google Drive."]
    - [e.g., "Notifications: Non-intrusive toast notifications like Slack."]

**Mockup References:**
- [Link to sketches/wireframes if available. These should align with or be inspired by the chosen reference implementations.]
- [Or describe layout in words, relating it to reference applications.]

## 7. Technical Requirements

**Performance:**
- Page load time < [X seconds] (or e.g., "Comparable to [Reference App like Gmail/Fastmail]")
- Support [X concurrent users]
- Interactive element responsiveness: [e.g., "Feels as responsive as 'Sublime Text' for core editing tasks."]

**Security:**
- Authentication method: [e.g., JWT]
- Data encryption: [requirements]
- API security: [approach]

**Scalability:**
- Expected growth: [users/data over time]
- Scaling strategy: [vertical/horizontal]

**Browser/Device Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (as per reference in UI section)
- [Any specific requirements]

## 8. External Dependencies

**APIs/Services:**
- [Service 1]: For [purpose]
- [Service 2]: For [purpose]

**Libraries/Frameworks:**
- [Key libraries you want to use and why]

## 9. Success Metrics
How will you measure success?
- [Metric 1]: Target [X]
- [Metric 2]: Target [Y]
- User satisfaction: [How measured, possibly comparing to satisfaction levels with reference apps]

## 10. Risks and Mitigation

**Technical Risks:**
- Risk: [e.g., Difficulty perfectly replicating a nuanced behavior from a reference app]
  - Mitigation: [e.g., Prioritize core functionality, accept close approximations, or allocate specific R&D time.]
- Risk: [e.g., API rate limits]
  - Mitigation: [e.g., Implement caching]


**Business Risks:**
- Risk: [e.g., User adoption]
  - Mitigation: [e.g., Beta testing program]

## 11. Development Phases

**Phase 1: Foundation (Week 1-2)**
- Set up development environment
- Create basic project structure
- Implement authentication

**Phase 2: Core Features (Week 3-4)**
- [Specific deliverables, defined with reference behaviors where applicable]

**Phase 3: Polish (Week 5)**
- Testing
- UI improvements (refining based on reference implementations)
- Deployment

## 12. Open Questions
Things to research or decide:
- [ ] [Question 1: e.g., "Which aspects of 'VS Code's terminal' are most critical for our MVP command interface?"]
- [ ] [Question 2]

## 13. Constraints
- Budget: [Any budget limitations]
- Timeline: [Deadline if any]
- Technical: [Any technical constraints]
- Legal/Compliance: [Any regulations to consider, e.g., accessibility standards referenced]
