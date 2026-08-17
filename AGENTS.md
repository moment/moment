# Agent Instructions

## Project Context

This is the maintained Moment.js 2.x codebase. It provides a dependency-free
date and time API with a large locale catalog and a long compatibility history.
Favor small, conservative changes that preserve public behavior, package shape,
and legacy consumers. Do not modernize syntax, metadata, or distribution formats
unless the task specifically requires it.

Development tooling uses the Node and pnpm versions declared in `package.json`.
The published library has a much broader runtime target; tooling requirements
must not leak into shipped code.

## Working In The Repository

Run `pnpm install` to set up the development dependencies.

Authoritative implementation code lives under `src/`. Core behavior is split
across `src/lib`, while locale definitions live in `src/locale`. Tests mirror
that distinction under `src/test/moment` and `src/test/locale`. Add regression
coverage near the behavior being changed and follow the style of neighboring
tests.

The root `moment.js`, `locale/`, `dist/`, `min/`, and parts of legacy package
metadata are generated release artifacts. Do not edit them by hand or include
regenerated output in ordinary pull requests. `pnpm release` intentionally
rewrites these committed files and should only be run for release preparation
or when a task explicitly requires generated artifacts. `build/` and
`coverage/` are disposable local output.

Type declarations remain handwritten and support old TypeScript consumers.
Keep `moment.d.ts` parseable by TypeScript 1.8 and preserve the separate modern
declarations in `ts3.1-typings`.

## Validation

Use `pnpm test -- --only=<test>` for focused test runs while developing, then
run `pnpm validate` before finishing. Run `pnpm test:typescript` whenever
declarations, module resolution, package contents, or public APIs may be
affected. Build and release tooling changes should also be checked with
`pnpm build` and the relevant release-specific command; avoid a full release
build merely as a generic test.

## Code Conventions

Match surrounding code instead of introducing a new style. Source and tests are
linted as ES2015 and retain compatibility-oriented patterns such as `var` and
the enforced `one-var` rule. Scripts may use current Node syntax. The standalone
runtime smoke test must remain executable on Node 8, and generated library code
must continue to pass the runtime compatibility workflow.

Moment has no runtime dependencies; do not add one without an explicit design
decision. Preserve CommonJS, browser, locale, declaration, and legacy package
entry points when changing build or packaging behavior. Locale changes require
locale-specific tests and the evidence-based review described in
`CONTRIBUTING.md`.

Keep `AGENTS.md` focused on durable instructions for agents. Contributor-facing
guidance belongs in `CONTRIBUTING.md`, and release procedure belongs in
`RELEASING.md`; update those files when the corresponding behavior changes.

## Reviewing Locale Changes

Validate locale changes first against the latest published Unicode CLDR data,
including supplemental data when the change concerns calendars or week rules.
Then verify the specific behavior with authoritative language or cultural
references. Prefer primary sources such as government or institutional style
guides, national standards, language-academy dictionaries, and official
calendars; use independent evidence of contemporary practice when it helps
establish how a convention is actually applied.

Treat CLDR as the default unless the non-CLDR evidence overwhelmingly shows
that it is stale, inaccurate, or inappropriate for the locale's documented
convention. When sources conflict, explain the conflict and why one interpretation
is better supported rather than merely choosing the proposed change. Check the
exact context affected, including grammatical case, number, noun class,
formatting notation, or year-boundary behavior, and require tests for each
distinct form changed.

When responding to a locale review, cite the CLDR data and external sources
used, summarize what each source establishes, and state whether the tests and
locale/style checks cover the verified behavior. Do not approve a locale change
based only on intuition, machine translation, or an unsupported assertion from
the contributor.
