---
name: lab-from-rmd
description: Create or update Lab.md from a course module .Rmd revealjs source by extracting the module's demo flow first, then its activity or exercise flow, drafting an action-oriented lab handout, and separating learner-facing activities from worked answers. Use this when a user gives you an .Rmd file and asks for Lab.md.
---

# Lab From Rmd

Create `Lab.md` from a module `.Rmd` slide source by converting presentation content into a linear, action-oriented handout. When the module includes activities with worked answers, keep learner-facing activity prompts in `Lab.md` and put worked answers in `exercise_solution.md`, using the repo's existing exercise-solution format.

## Use This Skill When

- The user provides an `.Rmd` module source that targets `revealjs`.
- The repo already contains an example root `Lab.md` or expects one in that style.
- The user wants a lab handout, demo guide, or step-by-step markdown derived from slides.

Do not use this skill for direct `.Rmd` rendering, HTML fixes, or slide-theme work.

## Inputs To Read

Read only what is needed:

1. The provided `.Rmd` source.
2. The existing root `Lab.md` as the example output shape and tone.
3. `exercise_solution.md` if it exists, or create it when activity answers should be separated from `Lab.md`.

## Output Target

Write or update:

- `Lab.md`
- `exercise_solution.md` when the module includes activity answers, expected results, worked prompts, or solution scaffolding that should not appear in the learner handout

## Core Workflow

Follow this order every time:

1. Read the provided `.Rmd` and identify the module title and overall sequence.
2. Find the demo slides first.
3. Extract the live-demo workflow from those slides.
4. Find the activity, task, or exercise slides next.
5. Extract the learner work that should follow the demo.
6. Read the existing example `Lab.md` to match output style, not to copy content.
7. Draft `Lab.md` so demo sections can be explicit, but activity sections stay learner-facing and do not include worked answers.
8. If the source contains solution content for activities, write that material to `exercise_solution.md` instead of `Lab.md`.
9. Format `exercise_solution.md` like the existing repo examples: introduction, correctness criteria, numbered tasks, part-by-part solutions, prompts, expected outputs, and screenshots when provided by the source or repo materials.

This skill is general across modules, but the content of the output must stay specific to the module supplied in the `.Rmd`.

## What To Extract From The Rmd

From the demo portion, extract:

- the main demo name or endpoint
- the ordered beats or phases
- setup and preparation steps
- visible vs hidden file guidance
- exact Copilot prompts
- accept or reject review criteria
- manual verification or test-running steps
- expected outcomes

From the activity or exercise portion, extract:

- the learner task name
- the high-level learner task or question
- the deliverables for each part, only when they do not reveal the answer
- constraints the learner must preserve
- required files, APIs, schemas, or helpers, only when needed to perform the task
- any solution content, expected answers, worked prompts, or explicit outcome criteria for `exercise_solution.md`
- any screenshots or image references associated with the activity solution flow

Treat recap slides, checklist slides, knowledge checks, and transition slides as secondary. Use them only if they improve the handout.

## Conversion Goal

Turn slide content into a document that someone can follow in order during a live demo or lab.

The output should:

- preserve the instructional sequence
- stay specific to the current module's demo and exercise
- keep concrete prompts, code snippets, file paths, and commands
- rewrite slide bullets into imperative steps where appropriate
- group the flow into clear demo beats or phases named by the module
- explain expected outcomes after each action
- keep activities as tasks to perform, not as pre-solved answer walkthroughs
- keep `exercise_solution.md` structured as a worked instructor answer key, not a minimal note dump

The output should not:

- include YAML frontmatter
- include R setup chunks or helper functions
- include `params`, `include=FALSE`, or rendering metadata
- include speaker notes from `<aside class='notes'>`
- include inline R expressions such as `` `r ...` ``
- include image embeds unless the user explicitly asks to preserve them
- read like slide fragments
- depend on the example `Lab.md` for module facts that are not in the current `.Rmd`
- include worked activity prompts, filled-in blanks, expected answers, or review criteria for learner activities unless the user explicitly asks for a solved handout

For `exercise_solution.md`, do not:

- collapse solutions into short summaries when the repo expects step-by-step solution sections
- omit tab-hygiene guidance if the corresponding activity depends on visible vs hidden files
- flatten multi-part tasks into one section when the activity is clearly split into parts

## Structure Rules

Use a simple markdown handout structure:

1. Title line from the module title.
2. Demo section first, based on the demo slides.
3. Exercise or activity section second, based on the activity slides.
4. Keep the same overall order as the module.
5. For demos, convert slides into:
   - overview
   - prep
   - step-by-step actions
   - review criteria
   - manual verification steps
6. For exercises, convert slides into:
   - exercise overview
   - part-by-part task statements
   - constraints
   - only the minimum setup needed to attempt the task
7. Put activity solutions, sample prompts, expected answers, and answer-shaping guidance in `exercise_solution.md` instead of `Lab.md` unless the user explicitly asks for a solved lab.
8. Format `exercise_solution.md` with:
   - a top heading like `## In-Class Exercise Solution`
   - a short intro explaining that the file contains sample answers
   - a short “A correct answer should” block when appropriate
   - numbered task headings like `## Task 3 — ...`
   - part headings like `## Task 3 Part A — ...`
   - subheadings for tab hygiene, prompt, expected result, and after-running-tests notes
   - screenshot references when available and relevant
9. Keep separators as `---` between major sections when helpful.

Prefer headings like:

- `# Demo 1 — ...`
- `# Beat 1 — Red`
- `## Step 1: ...`
- `## Why this tab setup matters`
- `## Expected state`
- `# Activity 1 — ...`
- `## Task 3 Part A — ...`
- `## In-Class Exercise Solution`
- `## Task 4 Part B — ...`

## Rewrite Heuristics

- Convert conceptual slide text into short explanatory setup only when it supports the task.
- Convert “keep X visible / hide Y” slides into explicit tab-hygiene instructions.
- Convert prompt slides into fenced `text` blocks that can be pasted directly.
- Convert expected-behavior tables into markdown tables.
- Convert “review before accepting” slides into accept/reject checklists.
- Convert “run the suite” slides into explicit manual commands and expected results.
- Convert “requirements” slides into concrete learner instructions.
- For activities, prefer short task statements over answer scaffolding.
- Move worked prompts, filled blanks, expected conclusions, and explicit solution criteria into `exercise_solution.md`.
- If the `.Rmd` contains both instructor-demo content and learner-exercise content, keep both in `Lab.md` in that order, but keep solution material out of the activity sections.
- When drafting `exercise_solution.md`, preserve the exercise's part structure and keep explicit prompt blocks, tab setup, expected implementation notes, and post-run expectations separate.
- If the repo or source indicates screenshot-backed solutions, keep the screenshot references in `exercise_solution.md` rather than moving them into `Lab.md`.

When a source section is mostly theory and does not help someone execute the lab, compress it heavily or omit it.

## Style Rules

- Keep the tone direct and instructional.
- Prefer short bullets and short paragraphs.
- Keep code blocks intact.
- Preserve exact API routes, status codes, filenames, and prompt wording unless the source is clearly inconsistent.
- Fix obvious formatting noise from slide export, but do not invent new behavior.
- Use the example `Lab.md` for tone, heading shape, and level of detail, not for copying endpoint-specific content.

## Repo-Specific Guidance

For this repo, match the current root `Lab.md` style:

- action-first wording
- explicit Copilot prompt blocks
- manual test execution called out separately
- narrow file-scoping guidance for each phase
- demo content before exercise content
- numbered headings like `Demo 1`, `Demo 2`, `Activity 1`, `Activity 2`
- activity sections that describe the task without giving away the answer
- companion `exercise_solution.md` content for worked prompts and expected outcomes when needed

For this repo, match the current `exercise_solution.md` style:

- heading starts with `## In-Class Exercise Solution`
- short intro paragraphs before the solution tasks
- “A correct answer should” block when the exercise benefits from one
- numbered task headings and part headings
- explicit tab-hygiene sections
- fenced `text` prompt blocks
- expected implementation or expected output sections
- “when tests are run” or similar result sections when applicable
- screenshot references preserved when available

If the source deck contains more material than belongs in `Lab.md`, prioritize the live demo workflow over recap slides, module checklists, and knowledge checks.

## Quality Check Before Finishing

Verify that `Lab.md`:

- was drafted from the current `.Rmd`, not copied from the example `Lab.md`
- includes the demo flow before the exercise flow
- reflects the specific module content accurately
- can be followed top-to-bottom without the slides
- contains no leftover R Markdown control syntax
- uses consistent file names and endpoint names
- keeps only the material needed for the lab handout format
- does not include activity answer keys, filled-in prompts, or expected conclusions unless explicitly requested

Verify that `exercise_solution.md`, when created or updated:

- follows the repo's exercise-solution heading and section pattern
- keeps task numbering and part numbering consistent
- includes worked prompts only for solution content, not learner handout content
- preserves screenshot references and expected-result sections when available
