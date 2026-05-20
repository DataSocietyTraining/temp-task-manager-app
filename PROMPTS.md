## Prompt 1 — Red: Generate Failing DELETE Tests

```text

The contract and validation schema for DELETE /tasks/:id are defined.

The handler is currently a stub that returns 501.

Generate tests that assert the documented behaviors. Tests must fail until the handler is implemented.

Cover exactly:

  (1) Happy path: valid id returns 204 with no body

  (2) 404: task id does not exist

  (3) 400: id is not a valid format (for example, a string instead of a number)

Name each test after the rule it enforces.

Use Vitest + supertest.

Do not run tests or terminal commands.

```

## Prompt 2 — Green: Implement DELETE Handler

```text

Implement the DELETE /tasks/:id handler so every test above passes.

Do not add behaviors, endpoints, or fields that the tests do not require.

Validate the route parameter before any business logic runs.

Keep validation aligned with the contract.

Do not run tests or terminal commands.
```

## Prompt 3 — Refactor: Safely Refactor DELETE Handler

```text

Refactor handler removeTask() for clarity only.

For example, extract repeated validation error logic into a local helper in this same file.

All tests must still pass with no changes to test expectations.

Do not alter status codes, response body shapes, or validation rules.

Do not move code to new files.

Do not run tests or terminal commands.
```

## Prompt 4 — Unconstrained Refactor: Weak DELETE Refactor Prompt

```text

Refactor this function.

Do not run tests or terminal commands.
```

## Prompt 5 — Constrained Refactor: Safe DELETE Refactor Prompt

```text

Refactor for readability only, inside this function.

Do not rename the function or its parameters.

Do not change the error messages or error types that callers rely on.

Do not remove validation checks of any kind.

Do not extract helpers to new files — keep everything in this file.

All existing tests must still pass without any changes to test code.

Do not run tests or terminal commands.

```




