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
- Save your Module 4 end state on a new branch:

- First confirm the working tree is clean:

```bash
git status
```
- If you still have uncommitted Module 4 changes, commit them before creating the Module 5 baseline branch
```bash
git checkout -b module-5-start-attempt
```


- Open these files in VS Code:
  - `App.tsx`
  - `TaskInput.tsx`
  - `types/task.ts`


Demo setup: Use the Figma frame link (verify MCP)
=================================================
- In Copilot Chat (Agent mode), paste this prompt:

```text
<FIGMA LINK>
Get design context from this Figma frame
```

- If Copilot returns design values and details, the MCP connection is working


Demo: Vague prompt with Figma link
=================================================
- Open files: `App.tsx`, `TaskInput.tsx`, `types/task.ts`
- In Copilot Chat (Agent mode):

```text
<FIGMA LINK>
Recreate the Figma design exactly in React + Tailwind CSS.
Match spacing, font sizes, and colors precisely.
```


Demo: Constrained prompt with Figma link
=================================================
- Revert the changes:

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
- Revert before this demo:

```bash
git restore packages/frontend/src/
```

- Open files:
  - `TaskItem.tsx`
  - `TaskList.tsx`
  - `App.tsx`
  - `types/task.ts`
- Attach both screenshots in Copilot Chat (Agent mode):
  - `M5_screenshot_R3_state1.png`
  - `M5_screenshot_R3_state2.png`

```text
I am sharing screenshots of two UI states. Build components that implement both states.

Requirements:
- Organize shared layout in parent; keep state-specific pieces in children or conditional branches
- Match colors and spacing across screenshots so the two states feel like one system
- Use TypeScript props to model the varying state, e.g. variant or isEmpty

Design already solved the variants - reuse structure, do not reinvent it.
```


Exercise Task 2: FocusModeCard variants
=================================================
- Do **not** revert before this exercise; build on top of the variant demo
- Open files:
  - `FocusModeCard.tsx`
  - `App.tsx`
  - `Button.tsx`
- Attach both screenshots in Copilot Chat (Agent mode):
  - `M5_screenshot_R4_state1.png`
  - `M5_screenshot_R4_state2.png`

```text
Build the FocusModeCard component - one component, two visual states.

The only thing that changes between states is the button label and click handler:
- When isInFocusView is false: button says 'View Insights' and calls onViewInsights
- When isInFocusView is true: button says 'Back to Tasks' and calls onBackToTasks

Everything else is shared layout:
- Dark gradient background, dark purple tones
- Title: 'Focus Mode' in white, bold
- Subtitle: '{count} high-impact tasks waiting' from highImpactCount prop
- Decorative blurred circle in the bottom-right corner

Props:
- highImpactCount: number
- isInFocusView: boolean
- onViewInsights: function
- onBackToTasks: function

Use the existing Button component - import it, do not create a new button.
Do not duplicate the card layout. One component, one return statement.
```


Fix prompt: Integration wiring
=================================================
- Use only if the star button or FocusModeCard is missing after the previous prompts
- Open files:
  - `TaskItem.tsx`
  - `TaskList.tsx`
  - `App.tsx`

```text
Fix the wiring across App.tsx, TaskList.tsx, and TaskItem.tsx only.
Do not change any other file.

Fix 1 - Star/high-impact toggle (TaskItem.tsx):
- Import Star icon from lucide-react
- Add onToggleHighImpact: (id: number) => void to TaskItem props
- Add star button between task text and delete button
- opacity-0 by default, visible on group-hover
- Filled yellow when isHighImpact is true; outlined grey otherwise

Fix 2 - Pass handler through (TaskList.tsx):
- Add onToggleHighImpact to TaskListProps and pass it through to each TaskItem

Fix 3 - App state wiring (App.tsx):
- Add toggleHighImpact function that toggles isHighImpact by task id
- Pass onToggleHighImpact={toggleHighImpact} to TaskList
- Render FocusModeCard on both Tasks and Focus views
- Pass isInFocusView={currentView === 'Focus'}
- Pass highImpactCount={tasks.filter(t => !t.completed && t.isHighImpact).length}
- Keep onViewInsights switching to Focus and onBackToTasks switching back

Output: updated App.tsx, TaskList.tsx, and TaskItem.tsx only.
```
