# Module 6 - Design Tokens and Performance Optimization

## Exercise Solutions

This document contains the reference answers for the two activity tasks in Module 6. Try the tasks first using `Lab.md` before reading these solutions.

---

## Task 1 solution - Strong constrained refactor prompt

A strong prompt for refactoring `Header.tsx` and `HeroSection.tsx` to consume `theme.ts` looks like this:

```text
Refactor Header.tsx and HeroSection.tsx to use values from theme.ts
instead of hardcoded color values.

One allowed goal: replace hardcoded values with theme token references.
Nothing else may change.

Constraints:
- The visual output must be identical - a side-by-side comparison shows no difference
- Do not rename any component, prop, or exported function
- Do not remove or change any conditional logic
- If a color in the component does not exist in theme.ts yet, add it to theme.ts first
- Only touch Header.tsx, HeroSection.tsx, and theme.ts - nothing else
```

### Why each line matters

| Line | What it protects |
| --- | --- |
| One allowed goal | Stops the model from mixing optimization or cleanup into the refactor |
| Visual output must be identical | Gives a verifiable post-run check |
| Do not rename anything | Stops silent prop or function-name drift |
| Do not change conditional logic | Keeps state-driven styles intact |
| Add to theme.ts if missing | Allows the theme to grow if needed, rather than the component approximating a value |
| Only touch these three files | The scope guard - the line that matters most |

### The constraint that matters most

The scope line - "Only touch Header.tsx, HeroSection.tsx, and theme.ts" - is what stops the model from "helpfully" refactoring `TaskItem.tsx` or `TaskInput.tsx`. Without it, the demo work from earlier in the module can be silently overwritten. Scope limits are not pedantic. They are what stop the model from doing more than was asked.

---

## Task 2 solution - Three problems in the flawed prompt

### Problem 1 - missing pair (the coupling)

The prompt asks to memoize `TaskItem` but never asks to stabilize the handlers passed into it. Memo on TaskItem does nothing on its own here.

**Fix:** add a line like:

```text
- Also stabilize the handler functions passed to TaskItem (toggle, delete, star) so they are not recreated on every render.
```

This is the most important problem. The prompt looks complete on paper. Code review passes - TaskItem is memoized, comments are in place. But the app re-renders just as much as before because the function references change on every parent render, so `React.memo`'s comparison always fails.

### Problem 2 - unnecessary memoization

The prompt asks to memoize the `EmptyState` component. EmptyState renders a single short message. Memoizing it adds a comparison cost without saving anything in return.

**Fix:** remove that bullet from the prompt:

```text
- Memoize the EmptyState component   <- delete this line
```

### Problem 3 - missing scope guard

The constraints say "do not change the data interface" but nothing stops the model from memoizing additional components it decides are "worth it."

**Fix:** add this line to the constraints:

```text
- Do not add memoization beyond what is listed above.
```

Without this, the model may wrap `Header`, `TabNavigation`, `FocusModeCard`, or other components, all of which add comparison cost without measurable benefit at this scale.

### The takeaway

Problem 1 is the most important - it creates **false confidence**. The optimization looks correct in code review, but at runtime the app behaves exactly as before. A constrained prompt is what forces the coupling to be thought through before the model writes a single line.
