# Slides, promtps & attachments

Demo: Run the vague UI prompt
=================================================
- Use `temp-task-manager-app/frontend` for this demo
- Keep `TaskInput.tsx` open and close any other files if opened
Prompt:

```
Create a To-Do app UI with:
- input field
- task list
- checkbox
- delete button

Use React, TypeScript, and Tailwind CSS.
```


Quick contrast: Valid code can still fail the task
=================================================
```
Create a TaskCard component with title, assignee, and status badge.
```


Demo setup: Add useful UI context
=================================================
- Open the files Copilot needs to understand the app:

  - `TaskInput.tsx`
  - `types/task.ts`
  - `App.tsx`
  - Keep unrelated files closed

```text
Create a desktop To-Do app using React + TypeScript + Tailwind CSS.

Acceptance Criteria:
- Centered container (max-width: 600px)
- Input height: 48px, full width
- Task items spaced vertically by 16px
- Each task row: checkbox, text, delete button aligned horizontally
- Completed tasks: line-through + reduced opacity

Component Boundaries:
- TaskInput: handles input and submit only
- TaskList: receives tasks as props, no state
- TaskItem: presentational component
- App: manages state using useState only

Behavior:
- Add task on Enter key
- Toggle complete state
- Delete task
- No API calls

Styling:
- Tailwind CSS only
- 8px spacing system
- Rounded corners (8px)
- Subtle shadow on container
- Delete button visible on hover

Output:
- Provide complete React + TypeScript code
- Keep code clean and readable
```


Exercise 1: Debrief: What a strong prompt includes
=================================================
```text
Create a sticky app header using React + TypeScript + Tailwind CSS for the Methodical Tasks app.

Layout:
- Stays fixed at the top as the user scrolls
- App name “Methodical Tasks” on the left in purple, bold text
- Three navigation tabs in the center: Tasks, Focus, Archive

Tab behavior:
- The active tab has purple text and a purple underline
- Inactive tabs use muted purple text with no underline
- Clicking a tab calls onChangeView with the selected tab name

Props:
- currentView: the active tab name
- onChangeView: function called when the tab changes

Constraints:
- Header and TabNavigation should not manage local state
- App may own currentView state and pass it as props
- Do not add API calls
- Keep Header and TabNavigation as separate components
- Use explicit TypeScript props
- Do not use any

Output:
- Update Header and TabNavigation as separate presentational components
- Keep Header and TabNavigation driven only by props
```

Fix prompt: Wire the header into the app
=================================================

- If the header is created but not visible, use this scoped integration prompt:

```text
The Header and TabNavigation components have been created, but the header is not visible in the running app.

Update App.tsx only enough to render the Header component at the top of the app.

Requirements:
- Import Header from ./components
- Add currentView state with these values: Tasks, Focus, Archive
- Pass currentView and onChangeView props to Header
- Render Header above the existing To-Do app content
- Keep the existing task input, task list, add, toggle, and delete behavior unchanged
- Do not rewrite Header.tsx or TabNavigation.tsx
- Do not add API calls
- Do not rename existing task functions or state variables

Output:
- Update App.tsx only
- The browser should show the Methodical Tasks header with Tasks, Focus, and Archive tabs
```

Demo setup: Give Copilot visual context
=================================================

- Attach the target UI screenshot in Copilot Chat i.e. `P4_reference_screenshot.png`
- Open `TaskInput.tsx`, `TaskList.tsx`, and `types/task.ts`
  - Keep unrelated files closed

Demo: Run the screenshot first pass
=================================================

- In Copilot Chat, attach the screenshot and use this prompt structure:

```text
I am sharing a **screenshot** of the target UI. Analyze it and recreate it as working React + TypeScript.

Requirements:

- Functional components with TypeScript
- Tailwind CSS for styling
- Match layout, spacing, and hierarchy visible in the screenshot as closely as practical
- Sensible component structure; reuse subcomponents where patterns repeat
- Responsive behavior only where the screenshot implies it

Focus on:

- Typography (sizes, weights, spacing)
- Colors and backgrounds
- Spacing (margin, padding, alignment)
- Interactive controls (buttons, inputs, focus states if visible)

Output:

- Complete component code and any subcomponents
- Placeholder copy/images where the screenshot shows media you do not have
```

Demo: Tighten the screenshot prompt
=================================================

```text
I am attaching a **screenshot** that is the visual source of truth. Generate React + TypeScript + Tailwind to match it.

Goal:
Recreate the UI so a side-by-side comparison with the screenshot shows **no intentional layout drift**.

Design constraints (from what is visible in the image):

- Match column widths, alignment, and vertical rhythm shown in the screenshot
- Match colors using exact-looking Tailwind classes or arbitrary values **only** where you can justify them from pixels in the image (state how you sampled them, e.g. browser eyedropper / design handoff)
- If the screenshot is ambiguous (cropped, low resolution), **state assumptions explicitly** in comments instead of inventing details

Component structure:

- Break into TaskInput, TaskItem, TaskList (or names that match what is shown)
- Do not duplicate code
- Keep components minimal and reusable

TypeScript:

- Explicit prop interfaces
- Do not use `any`

Styling:

- Tailwind CSS
- Prefer mapping repeated values to small local constants or a minimal theme object when the same numbers repeat

Behavior:

- No API calls unless the screenshot shows integration points and you are told to stub them

Output:

- Complete working code
- Prioritize visual fidelity over abstraction
```