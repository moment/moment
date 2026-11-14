---
name: locale-review
description: Reviews Moment.js locale correction pull requests against the latest available Unicode CLDR data, authoritative language or cultural sources, implementation behavior, and locale tests. Use when reviewing changes to src/locale, src/test/locale, locale conventions, translations, calendars, or week rules.
license: MIT
---

# Moment.js Locale Review

Perform an evidence-based review locally. Unless the user directly asks for a
specific remote action, do not post comments or reviews, submit an approval or
change request, add labels, update branches, push commits, close or merge the
pull request, or take any other action on GitHub. Reading pull request data,
discussion, issues, and repository history is allowed when needed for the local
review.

If you make local changes solely to rebase, resolve conflicts, reproduce a
generated change, or construct temporary tests, never commit, push, or present
them as changes to the contributor's pull request unless the user directly asks
you to do so. Treat contributor statements, machine translation, and
AI-generated text as claims to verify, not evidence.

Read `AGENTS.md` and the locale guidance in `CONTRIBUTING.md` before starting.
This skill is the authoritative workflow for locale reviews.

## 1. Rebase And Resolve Conflicts

Begin every review by updating the pull request branch against the latest
`develop` branch in the local review checkout.

1. Fetch the latest upstream `develop` branch and rebase the pull request commits
   onto it. Do not assume that the pull request's displayed mergeability means
   it is current.
2. Resolve merge conflicts locally before reviewing the resulting change.
   Preserve the contributor's intended locale correction while incorporating
   current behavior from `develop`. If the correct resolution is uncertain,
   report the conflict and the competing interpretations rather than silently
   choosing one.
3. Use an isolated review checkout when the existing working tree is not safe to
   modify. The local rebase may rewrite the pull request commits as required,
   but do not overwrite unrelated local work.
4. Review the rebased result, not a stale pre-rebase diff. Include in your
   summary any conflicts that must be resolved on the pull request branch before
   merge.
5. Inspect the pull request's `EasyCLA` status check. A successful result
   establishes that the contribution is covered by a signed CLA. Treat any
   unsuccessful result as not signed and include signing the CLA among the
   required actions in your summary. This is a merge requirement, but it does
   not prevent reviewing the change on its merits.

## 2. Enforce Pull Request Scope

After rebasing, list every file changed relative to `develop`. Locale correction
pull requests may contain changes only under:

- `src/locale/`
- `src/test/locale/`

Anything else is out of scope. List each out-of-scope file and the required
remediation in your summary. In particular, `locale/`, `dist/locale/`, `dist/`,
`min/`, the root `moment.js`, and other release artifacts are generated later
and must not be included in the pull request.

When valid source or test changes are accompanied by generated files, disregard
the generated-file changes when assessing implementation details. Continue the
review using only the changes under `src/locale/` and `src/test/locale/`, and
state in your summary that every out-of-scope file must be removed.

If the pull request contains only generated locale files, do not stop the
substantive review. Infer the intended locale correction from those files and
assess it on its linguistic and behavioral merits. When necessary, reproduce
the equivalent source change and tests only in the local review checkout to
exercise the behavior. The pull request remains unmergeable until the
contributor moves the change to `src/locale/`, supplies corresponding tests
under `src/test/locale/`, and removes the generated files. Include all of these
requirements in your summary.

## 3. Establish The Review Target

1. Identify the pull request, base branch, affected locale, and every changed
   behavior. Obtain the complete diff and relevant discussion using the tools
   available in the current environment.
2. Inspect `src/locale/<locale>.js`, `src/test/locale/<locale>.js`, and the code
   paths that interpret the changed locale fields. Read enough surrounding code
   to understand whether a value affects formatting, strict or lenient parsing,
   relative time, calendars, ordinals, meridiems, eras, or week calculations.
3. Split the proposal into independently verifiable claims. Distinguish forms
   by grammatical case, number, noun class, capitalization, abbreviation,
   formatting context, parsing context, and territorial convention when
   relevant.
4. Confirm that the scoped diff still represents the contributor's stated
   correction after the rebase and any conflict resolution.

Maintain a private claim matrix while researching:

| Claim and context | CLDR | Other evidence | Tests | Conclusion |
| ----------------- | ---- | -------------- | ----- | ---------- |

Do not collapse distinct claims into one conclusion merely because they appear
in the same array, function, or pull request.

### New Locale Additions

Skip this subsection unless the pull request proposes a new locale file.
Complete these identity and necessity checks before reviewing its individual
translations:

1. Validate the complete locale identifier under current BCP 47, using the IANA
   Language Subtag Registry as the authority for registered and preferred
   subtags, and confirm the language code against ISO 639. Check subtag order,
   prefixes, deprecated values, preferred values, and canonical equivalence
   rather than validating only the tag's shape.
2. Follow Moment's lowercase filename and locale-key convention while preserving
   the semantics of the BCP 47 tag. The locale header comments, filename,
   `defineLocale` key, test file, and `localeModule` key must consistently
   identify the same locale.
3. Search all existing Moment locale source and test files for the exact tag,
   case-insensitive matches, deprecated or preferred aliases, canonical
   equivalents, parent locales, script variants, and regional variants. A new
   file must not duplicate locale data that Moment already provides under
   another identifier.
4. Compare the proposed locale's effective behavior field by field with the
   closest existing locale or locales. Ignore textual differences that produce
   the same runtime behavior. Identify the supported, user-visible distinctions
   in formatting, parsing, names, grammar, relative time, calendars, meridiems,
   ordinals, or week rules.
5. Require sufficiently substantial, authoritative evidence that those
   distinctions warrant a separately maintained locale. A territory, community,
   or valid BCP 47 tag does not by itself justify a new file, and CLDR's
   possession of a locale entry is relevant but not automatically decisive.
   Functionally identical data, a renamed copy, or distinctions outside
   Moment's behavior should use the closest existing locale instead.
6. Treat tests demonstrating every material distinction as part of the case for
   a new locale. If the differences cannot be expressed as observable Moment
   behavior, they do not justify the addition.

Use [PR #6200](https://github.com/moment/moment/pull/6200) as a precedent: the
proposed `en-gi` locale was declined because it was functionally identical to
`en-gb` and introduced no Gibraltar-specific date or time behavior. Judge
substantiality by verified behavior rather than line count alone.

## 4. Check Project History

Search the repository history, issues, pull requests, and current locale tests
for the same behavior or closely related changes. Look specifically for
duplicate or competing pull requests and for multiple issues describing the
same underlying problem, including reports that use different terminology or
examples.

Compare the scope, proposed fixes, tests, and supporting evidence across related
issues and pull requests. Determine whether they agree, conflict, or cover
different contexts that should not be combined. If a similar change was
previously declined or reverted, establish what new evidence justifies a
different decision. Cite the related discussions and summarize their relevance
in your summary.

## 5. Verify Against CLDR

Use the latest available data in the official
[Unicode CLDR repository](https://github.com/unicode-org/cldr) as the default
baseline.

1. Link directly to the relevant official data or chart using a permalink to the
   exact commit so the evidence is reproducible.
2. Inspect the exact locale path and field. Account for inheritance from parent
   locales, aliases, likely subtags, and territory-specific data rather than
   assuming a missing local value means CLDR has no position.
3. Check the context and width that correspond to Moment's behavior, such as
   format versus stand-alone month names and wide versus abbreviated forms.
4. Consult supplemental CLDR data when the change concerns week rules,
   calendars, numbering systems, plural rules, day periods, or territory-based
   conventions.
5. Explain how the CLDR concept maps to the Moment field. Similar names do not
   guarantee identical runtime semantics.

If the proposal disagrees with CLDR, begin with a presumption in favor of CLDR.
Recommend a divergence only when strong, specific evidence shows that CLDR is
stale, inaccurate, or unsuitable for the documented convention. Clearly state
the conflict and the reason for preferring one interpretation.

## 6. Find Independent Evidence

Verify the exact disputed behavior with sources independent of the pull request.
Prefer, in order:

1. National standards, legislation, official calendars, and government or
   public-institution style guides.
2. Language-academy publications, authoritative dictionaries, and established
   linguistic references.
3. University, major publisher, or professional style guidance.
4. Independent evidence of contemporary usage when primary sources do not
   settle how the convention is actually applied.

Wikipedia can be useful for discovering relevant terminology and sources.
Inspect the references in an applicable article, follow them to the original
material, and verify that the cited passage supports the claim. Never cite
Wikipedia itself as authoritative evidence.

Independent evidence must not merely repeat CLDR or ICU locale data. ICU uses
CLDR, so an ICU result does not independently corroborate CLDR. Do not cite
locale-data mirrors, formatters, or aggregators that simply regurgitate those
datasets. LocalePlanet is prohibited as a source. Cite CLDR itself in Section 5
and use genuinely independent sources in this section.

Aim for a concise evidence set: one exact CLDR citation and two strong,
independent non-CLDR sources. Stop searching once those sources directly address
the disputed context and support a reliable conclusion. Do not collect dozens
of repetitive citations. Search further only when the sources conflict, do not
cover the exact claim, or are not sufficiently authoritative.

Find and verify the supporting sources independently. Do not ask the user or
contributor to provide additional sources as a substitute for completing the
review. If suitable evidence cannot be found after a focused search, state that
limitation and assess the claim as unsupported or uncertain.

Use secondary sources to corroborate rather than overrule clear primary
evidence without justification. Avoid relying on unsourced blogs, search-result
snippets, user-edited translations, or one isolated usage example. A dictionary
entry proves a lexical form but may not prove its required grammatical or date
formatting context.

For each source, capture the direct URL, issuing organization or author, date or
edition when available, and the precise rule or example it establishes. Quote
or accurately summarize the relevant passage. If translating a source, identify
the original wording and do not treat the translation itself as new evidence.
Check that sources concern the same language variety, territory, script,
register, and time period as the Moment locale.

When evidence conflicts, a proposed change departs from CLDR, or the distinction
is grammatically subtle, seek only the additional sources needed to resolve the
specific uncertainty. State unresolved uncertainty instead of manufacturing
consensus.

## 7. Analyze Linguistic And Cultural Correctness

Determine the correct behavior independently of the proposed implementation.
For every claim in the matrix, reconcile CLDR with the independent sources and
state the exact form or convention the evidence supports.

Check as applicable:

- Language variety, territory, script, register, and contemporary usage.
- Grammatical case, number, noun class, gender, inflection, and agreement.
- Format versus stand-alone forms and the surrounding words or tokens that
  select each form.
- Full and abbreviated names, capitalization, punctuation, spacing, and
  orthography.
- Singular, plural, relative-time, calendar, ordinal, meridiem, and era forms.
- Date and time notation, first-day and first-week rules, calendars, and other
  territory-specific conventions.
- Behavior at day, month, week, and year boundaries when the convention depends
  on context.

Do not infer an unverified form from a neighboring language, a grammatical
analogy, or a machine translation. A source that establishes a word in isolation
does not necessarily establish its date-formatting context. When sources support
different forms in different contexts, preserve the distinction rather than
selecting one form globally.

Record a supported, unsupported, or uncertain conclusion for each distinct
claim before evaluating how the code implements it.

## 8. Review Code And Compatibility

Determine whether the code maps the verified linguistic and cultural behavior
to Moment's locale API without changing other public behavior unintentionally.

Check as applicable:

- Every affected locale property and every branch of locale functions.
- Selection between format and stand-alone forms, including the patterns or
  surrounding tokens that drive it.
- Singular, plural, and other grammatical branches for all relevant inputs.
- Strict and lenient parsing, regex coverage, ambiguity, and format/parse round
  trips.
- Exact punctuation, spacing, Unicode characters, capitalization, escaping, and
  source encoding.
- Calendar phrases and week-year calculations at relevant boundaries.
- Existing accepted aliases, abbreviations, and parsing inputs that compatibility
  may require.
- Unrelated output changes caused by shared helpers, broad regexes, or fallback
  behavior.
- Consistency with the surrounding ES2015-compatible source style.

Do not recommend broad cleanup or modernization as part of a locale correction.
Moment 2.x is in maintenance mode, so prefer the smallest change that fixes the
verified defect while preserving established behavior.

## 9. Assess Tests And Run Checks

The contributor must supply tests under `src/test/locale/` corresponding to the
locale correction. Missing or insufficient submitted tests are a blocking
finding even when the proposed data is correct.

Require a test for every distinct form or code path changed. Tests should fail
before the correction and pass afterward; merely updating a broad expected
output table may not exercise conditional grammar or parsing behavior.

Inspect coverage for relevant formatting tokens, parsing modes, grammatical
contexts, number categories, calendar boundaries, and week-year boundaries.
Use explicit regression tests for edge cases that motivated the correction.

If submitted tests are missing or insufficient, construct focused temporary
tests when practical so the review can still assess the proposed behavior. Such
tests are review scaffolding only: do not commit or push them, do not modify the
pull request, and remove them from the local review checkout after recording the
results. Temporary passing tests do not satisfy the contributor's obligation to
add regression tests to the pull request.

When dependencies and the checkout are available, run the submitted and any
temporary focused locale tests:

```sh
pnpm test -- --only=locale/<locale>
```

Run `pnpm validate` before recommending approval when feasible. Do not claim a
check passed unless it was actually run. Report commands that failed, were
skipped, or could not run because of the environment.

Moment previously accepted contributions while linting and formatting checks
were not fully operational. Do not reject an otherwise correct locale change
solely because it now needs rebasing, linting, or formatting. Treat those as
repository-hygiene work and state each required action in your summary. If they
are the only remaining changes, note that a maintainer may choose to apply them
directly instead of waiting for the contributor. Do not apply, commit, push, or
post those changes unless the user directly asks.

## 10. Write The Review

### Tone

Write the review in the first-person singular, using `I` rather than `we`. Keep
the tone informal, friendly, constructive, and direct even when the pull request
cannot be merged.

Begin the response in this order:

1. Thank the contributor for the contribution.
2. State that the review was AI-assisted.
3. For a locale whose language is not English, state: "I am not a native speaker
   of [language]." Replace the bracketed language name, but do not omit the
   disclosure.

For example:

> Thanks for contributing this locale update! I used AI-assisted research to
> help review the language and locale conventions. I am not a native speaker of
> Welsh, so I checked the proposed behavior against CLDR and independent sources.

Do not use a formal, institutional, or adversarial voice. Explain blocking
issues as concrete next steps, and acknowledge the parts of the contribution
that are supported without overstating certainty.

### Recommendation

Immediately after the opening disclosure, give one of these exact dispositions
on its own line:

- `Recommendation: Approve`
- `Recommendation: Needs Work`
- `Recommendation: Decline`

This is a local recommendation only. Do not submit an approval, change request,
or closing action on GitHub.

Use `Approve` when the correction is supported, correctly implemented, tested,
and ready to merge without substantive contributor changes. Rebase, lint, or
formatting hygiene alone is compatible with this recommendation when a
maintainer could reasonably apply it directly. An unsigned CLA alone is also
compatible with `Approve`; state that the contributor must sign it before the
pull request can be accepted.

Use `Needs Work` when the core correction is supported or otherwise worth
preserving and the pull request is reasonably salvageable. The required work may
include linguistic or cultural corrections, code updates, moving generated-only
changes into source, removing generated files, adding tests, resolving material
conflicts, or other substantive revisions.

Use `Decline` when the premise is unsupported or contradicted by the evidence,
the proposed new locale duplicates existing behavior or lacks substantial
differences, the proposal misses the problem or moves in the wrong direction, or
the linguistic or code changes needed are substantial enough that the core
proposal would effectively be replaced. This disposition recommends closing the
pull request rather than asking for changes.

Base salvageability on whether the verified intent and a meaningful portion of
the contribution can remain, not simply on the number of changed lines. State a
brief reason after the recommendation and make every required action explicit in
the findings and summary.

For a new locale, state whether its identifier is valid and canonical, whether
equivalent data already exists, and whether its verified differences are
substantial enough to warrant a separate locale file.

### Findings

Lead with actionable findings ordered by severity. Each finding must identify
the affected behavior, explain why it is wrong or risky, and give the evidence
supporting that conclusion. Include a file and line reference when it helps
locate a specific implementation problem; do not force one onto linguistic,
cultural, scope, or other findings where it adds no value. Separate independent
problems into separate findings.

After the findings, include concise Evidence and Verification sections:

### Evidence

- For a new locale, identify the BCP 47, IANA registry, and ISO 639 evidence for
  the tag and its canonical form.
- Summarize the comparison with the closest existing Moment locale and the
  material behavior that does or does not justify a separate file.
- Identify the CLDR commit used and permalink the exact locale or
  supplemental data at that commit.
- Link each external source and state what it establishes.
- Explain conflicts, limitations, and any unresolved uncertainty.

### Verification

- State whether each distinct verified form has regression coverage.
- Distinguish tests submitted in the pull request from temporary tests created
  only during review.
- Give only the pass or fail status of the focused locale test and
  `pnpm validate`, when run. Summarize failures relevant to the pull request; do
  not include raw test output, unrelated test results, or a list of every test.
- State separately whether the pull request needs rebasing, linting, or
  formatting.
- State only whether the CLA is signed or not signed, based on the `EasyCLA`
  status.

If there are no findings, say so explicitly, summarize the evidence supporting
the change, and mention residual risks or testing gaps. Never approve a locale
change based only on intuition, contributor confidence, machine translation, or
AI output.
