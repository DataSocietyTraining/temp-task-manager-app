# Slides, prompts & attachments

Demo setup: Connect Figma MCP in VS Code
=================================================
- Open the Command Palette: `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows)
- Search for: `MCP: Open User Configuration`
- Paste the following into `mcp.json` and save:

```json
{
  "inputs": [],
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

- Click the **▷ Start** button that appears above the server entry
- Complete the Figma OAuth login in the browser that opens


Demo setup: Branch and files
=================================================
- Create a clean working branch from the provided `module-5-start` baseline:

```bash
git checkout -b module-5-start-attempt module-5-start
```

- This keeps the provided `module-5-start` branch untouched as a safe fallback
- The new `module-5-start-attempt` branch is the working baseline; a few demos use `git restore` to return to it between prompts

- Open these files in VS Code:
  - `App.tsx`
  - `TaskInput.tsx`
  - `types/task.ts`


Demo setup: Use the Figma frame link (verify MCP)
=================================================
- In Copilot Chat (Agent mode), paste this prompt:

```text
https://www.figma.com/design/FFPdwRiIoEa5NV3XupRlXV/Full-Stack-IQVIA-course?node-id=7-708&t=Q4sUeZxh1dO2Xopf-1

Get design context from this Figma frame
```

- If Copilot returns design values and details, the MCP connection is working


Demo: Vague prompt with Figma link
=================================================
- Files open: `App.tsx`, `TaskInput.tsx`, `types/task.ts`
- In Copilot Chat (Agent mode):

```text
<FIGMA LINK>

Recreate the Figma design exactly in React + Tailwind CSS.
Match spacing, font sizes, and colors precisely.
```


Demo: Constrained prompt with Figma link
=================================================
- Revert the changes from the vague prompt:

```bash
git restore packages/frontend/src/
```

- Same files open: `App.tsx`, `TaskInput.tsx`, `types/task.ts`
- In Copilot Chat (Agent mode):

```text
<FIGMA LINK>

Using the provided Figma design, generate React + TypeScript components using Tailwind CSS.

Goal: Recreate the UI with pixel-perfect accuracy based on the design source of truth.

Design constraints:
- Match layout, spacing, typography, and colors exactly from Figma
- Desktop frame: 1440px, container max-width: 1296px, 72px side gutters
- Follow exact spacing values - no approximation
- Use exact color values from the design

Extraction rules:
- If MCP is available: extract all values directly from the Figma file
- State assumptions explicitly in code comments

Component structure:
- Break into TaskInput, TaskItem, TaskList - no code duplication
- Keep components minimal and reusable

TypeScript: explicit prop interfaces, no any
Styling: Tailwind CSS only; prefer design tokens over hardcoded values
Behavior: no API calls; keep components presentational

Output: complete working React + TypeScript code. Visual fidelity over abstraction
```


Live demo: TaskItem variants
=================================================
- Open files:
  - `TaskItem.tsx`
  - `TaskList.tsx`
  - `App.tsx`
  - `types/task.ts`
- Learners capture screenshots from the Figma file showing TaskItem in:
  - State 1: active (unchecked)
  - State 2: completed (checked)
- Attach both screenshots in Copilot Chat (Agent mode):

```text
I am sharing screenshots of two UI states. Build components that implement both states.

Requirements:
- Organize shared layout in parent; keep state-specific pieces in children or conditional branches
- Match colors and spacing across screenshots so the two states feel like one system
- Use TypeScript props to model the varying state, e.g. variant or isEmpty

Design already solved the variants - reuse structure, do not reinvent it.
```

- Optional follow-up: try rewording the variant description and observe how the output shifts


Exercise Task 1: FocusModeCard (fill-in-the-blanks)
=================================================

## Step 1: Describe the card (for learners)

- The Focus Mode card appears when there are high-impact tasks
- It has two visible states; same layout, one thing changes:
  - State 1 (not in Focus view): button labeled **'View Insights'**
  - State 2 (in Focus view): button labeled **'Back to Tasks'**
- Uses a shared `Button` component already in the codebase; do not generate a new one
- One prop controls which state is shown: `isInFocusView` (true or false)
- Files to open:
  - `FocusModeCard.tsx`
  - `App.tsx`
  - `Button.tsx`

## Step 2: Give learners the blank prompt

```text
Build the FocusModeCard component with two states - same layout, only the button changes.

When the user is not in focus view, the button should say 'View Insights' and [BLANK 1].
When they are in focus view, it should say 'Back to Tasks' and [BLANK 2].

The card has a dark purple gradient background, a bold white 'Focus Mode' title, and a subtitle that reads [BLANK 3]. It also has [BLANK 4] in the bottom-right corner.

Use the existing Button component - don't create a new one. One component, one return statement, no duplicated layout.

Wire this into App.tsx for full navigation behavior so I can see how it works
```

## Step 3: Guiding questions (help learners fill the blanks)

- **Q1** Label changes between states, but what else should change? What does each button do when clicked?
- **Q2** The subtitle shows "the task count", what should the full string say?
- **Q3** What decorative detail is on the card that the description leaves out? Think about its shape.

## Step 4: One valid filled-in prompt (debrief)

```text
Build the FocusModeCard component with two states - same layout, only the button changes.

When the user is not in focus view, the button should say 'View Insights' and take them to the insights view.
When they are in focus view, it should say 'Back to Tasks' and return them to the task list.

The card has a dark purple gradient background, a bold white 'Focus Mode' title, and a subtitle that reads '{count} high-impact tasks waiting'. It also has a decorative blurred circle in the bottom-right corner.

Use the existing Button component - don't create a new one. One component, one return statement, no duplicated layout.

Wire this into App.tsx for full navigation behavior so I can see how it works
```
