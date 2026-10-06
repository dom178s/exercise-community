# AGENTS.md

## 1. Purpose

This file defines the rules that AI agents and human contributors should follow when working on the Exercise Community repository.

The project is currently an MVP being tested with a small number of users. Changes should prioritize safe validation, clarity, and preserving working behavior over adding unnecessary complexity.

## 2. Repository structure

Current main application files:

- `index.html`: UI structure and input elements
- `style.css`: styling and responsive layout
- `script.js`: application logic, localStorage handling, points, streaks, cheering, stickers, exercise plans, and Supabase REST API integration
- `README.md`: project overview and development status
- `docs/architecture.md`: system architecture and data flow
- `docs/repository-map.md`: repository map and change impact
- `docs/current-status.md`: implemented features, known issues, unknowns, and next checks

Update this section when the repository structure materially changes.

## 3. Before starting work

Before making changes, an AI agent should:

1. Read `README.md`.
2. Read relevant files under `docs/`.
3. Inspect the current implementation related to the task.
4. Check the related GitHub Issue when one exists.
5. Confirm the current branch and avoid direct work on the default branch.
6. Check whether the requested behavior is already implemented.
7. Identify unknown requirements instead of guessing.
8. Consider whether the change affects stored user data, Supabase, points, streaks, or other connected features.

## 4. Branch policy

- Do not normally commit feature, bug-fix, or documentation work directly to `main`.
- Create a task-specific branch from the current default branch.
- When an Issue exists, include its number in the branch name when practical.

Examples:

```text
fix/12-supabase-report-save
feature/23-user-identification
docs/31-update-readme
```

- Do not force-push unless a responsible human explicitly approves it for a specific reason.
- Do not rewrite published history without explicit approval.

## 5. Issue → branch → commit → PR workflow

Preferred workflow:

1. Create or confirm a GitHub Issue.
2. Define scope and completion criteria.
3. Create a task branch.
4. Make small, understandable changes.
5. Test the affected behavior.
6. Update relevant documentation.
7. Create a Pull Request.
8. Link the PR to the Issue, for example with `Closes #123` when appropriate.
9. Review before merging into `main`.

Do not create duplicate Issues without checking existing Issues first.

## 6. Commit policy

Commits should be small enough to understand and should represent one meaningful change when practical.

Use concise messages that describe the change.

Examples:

```text
Fix Supabase report payload
Add current project status
Document repository structure
```

Avoid vague messages such as `update`, `fix`, or `changes` when a clearer description is possible.

## 7. Pull Request expectations

A Pull Request should explain:

- what changed
- why it changed
- related Issue
- affected files/features
- tests or manual checks performed
- known limitations or remaining questions
- screenshots when a visual change benefits from them
- migration/data impact when relevant

Do not claim a test passed unless it was actually run.

## 8. Testing, static analysis, and build commands

### Current confirmed state

The application is currently a static HTML/CSS/JavaScript project without a confirmed package manager or build step.

No automated test suite or static-analysis command is currently confirmed in the repository.

### Rule

Do not invent commands such as `npm test`, `npm run build`, or lint commands unless the required configuration actually exists.

Until automated checks are added, record the browser/manual checks that were actually performed.

If test, lint, build, or CI tooling is added later, document the exact commands here and in the README.

## 9. Documentation updates

When behavior or architecture changes, check whether these documents also need updating:

- `README.md`
- `docs/architecture.md`
- `docs/repository-map.md`
- `docs/current-status.md`
- this `AGENTS.md`

Examples:

- New feature → README/current-status
- Data flow or external service change → architecture
- File responsibilities change → repository-map
- Known issue fixed or new issue found → current-status
- Development workflow changes → AGENTS.md / CONTRIBUTING.md

## 10. Coding conventions

The existing project uses plain HTML, CSS, and JavaScript.

When modifying existing code:

- Prefer simple code that a beginner contributor can understand.
- Preserve existing behavior unless the task explicitly changes it.
- Avoid introducing a framework or large dependency without discussion.
- Keep function and variable names descriptive.
- Avoid unrelated refactoring inside a focused bug fix.
- Reuse existing application rules instead of duplicating them.
- Check HTML IDs/classes against JavaScript and CSS references when renaming them.
- Do not present fixed exercise plans as AI-generated results unless actual AI generation is implemented.

If conventions change as the project grows, update this section.

## 11. Secrets and sensitive information

Never commit:

- Supabase secret/service-role keys
- private API keys
- access tokens
- passwords
- credentials
- personal information that is not necessary for the repository

The current frontend uses a browser-oriented Supabase publishable key. Treat public-client configuration separately from secrets, and rely on correctly configured authorization/RLS rather than secrecy of a browser key.

Before committing configuration changes:

1. Check whether a value is intended to be public.
2. Never substitute a secret key for a publishable client key.
3. Do not paste real secret values into `.env.example`, documentation, Issues, PRs, logs, or screenshots.
4. If a secret is suspected to have been committed, stop and report it rather than merely deleting the current line; repository history may also require remediation.

## 12. Database and Supabase changes

Database-related work requires extra care.

Before changing application payloads, tables, or policies:

- inspect the actual table/schema
- confirm column names and data types
- inspect required/nullability constraints when relevant
- inspect RLS policies and permissions
- consider existing test/user data
- identify whether a migration is needed
- document any migration or compatibility impact

Do not disable RLS merely to make a failing request succeed.

Do not guess the final database schema.

## 13. localStorage changes

Current user state is heavily dependent on localStorage.

Before renaming or deleting a localStorage key, consider compatibility with existing users' browser data.

Current known keys include:

- `points`
- `streak`
- `pointHistory`
- `reports`
- `cheers`
- `cheerCount`
- `lastCheerDate`
- `lastReportDate`
- `ownedStickers`

If storage responsibilities move to Supabase, document the transition and avoid silently losing existing data.

## 14. Prohibited actions without explicit approval

AI agents must not:

- force-push
- rewrite Git history
- delete existing work to simplify a task
- directly deploy a risky/unverified change to production
- commit secret credentials
- disable security controls as a shortcut
- fabricate test results
- invent unclear product requirements
- silently change point/business rules unrelated to the task
- create large numbers of Issues or files without reviewing scope and duplicates

## 15. Unclear specifications

When requirements are unclear:

1. State what is confirmed.
2. State what can be inferred from the code.
3. Mark the remaining point as requiring confirmation.
4. Ask the responsible person instead of inventing the specification.

Use the labels:

- **確認済み**
- **コードからの推定**
- **要確認**

where they help distinguish certainty.

## 16. End-of-work report

At the end of a development task, report:

- branch name
- Issue number/URL when applicable
- files changed
- summary of changes
- commits created
- tests/checks actually performed and results
- Pull Request URL when created
- remaining questions or risks
- recommended next Issue/task

If something was not tested or could not be verified, say so explicitly.

## 17. MVP priorities

Current working direction:

1. Make the small-user MVP reliable.
2. Resolve known data-saving problems.
3. Establish safe user identification/data separation before expanding usage.
4. Validate user value and willingness to pay.
5. Consider broader public release only after the small-user version is sufficiently stable.

This direction can be revised by the project owner or seminar supervisor. AI agents should not independently decide that the project is ready for general public release.
