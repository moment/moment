# The Moment.js Threat Model

Moment is a date and time library that operates within the same trust boundary
as the code that calls it. This document defines what Moment trusts and does not
trust. A report is in scope only when Moment itself violates its documented
behavior, or fails to maintain integrity, confidentiality, or availability under
standard usage. Vulnerabilities that require compromising a trusted element,
such as the JavaScript runtime, the host environment, or developer controlled
input, are out of scope. Because Moment maintains process global state by
design, reports that depend on an application routing untrusted input into that
global state are treated as application responsibilities, and genuine internal
hardening gaps are addressed as robustness improvements rather than as security
advisories.

> [!NOTE]
> Moment is a legacy project in maintenance mode, and its documented API as it
> exists today is the contract this threat model is measured against. In most
> cases you should choose a different library. For details and the maintainers'
> recommendations, see
> [Project Status](https://momentjs.com/docs/#/-project-status/).

## Elements Moment Does NOT Trust

1. **Data provided to Moment functions.** Moment treats the values passed to its
   parsing, formatting, and manipulation APIs (for example `moment(input)`,
   `.format(token)`, `.add`, `.diff`) as data. It parses leniently and does not
   validate the semantic correctness of inputs. _If an untrusted input can cause
   Moment to execute behavior beyond what is documented, such as an
   unrecoverable crash, unbounded resource consumption, pollution of globals, or
   code execution, that would indicate a security vulnerability._

2. **Untrusted network sources or user controlled data.** Any input derived from
   unvalidated user input, network responses, file contents, or deserialized
   data is untrusted. Moment does not perform input isolation or sandboxing.

3. **Tampering with Moment internals at runtime.** Modifying Moment's internal
   symbols, monkey patching its functions, or overwriting internal references at
   runtime is outside the trusted boundary. If such modification changes Moment
   behavior, that reflects a compromise of trusted code, not a Moment
   vulnerability.

## Elements Moment Trusts

1. **The JavaScript runtime and its standard library.** Moment assumes a
   correct, uncompromised runtime environment (Node.js, browser, or equivalent).
   Vulnerabilities in the runtime itself, and the language's own prototype chain
   semantics, are out of scope.

2. **The environment and its configuration.** Moment relies on the correct
   functioning of the host environment and the global objects it uses (`Object`,
   `Array`, `Date`, `Intl`, `JSON`).

3. **The code that invokes Moment.** The application or library using Moment is
   responsible for validating user input and deciding what data is safe to pass
   in, including not routing untrusted input into Moment's global state setters.

4. **Installed package integrity.** Moment assumes the installed package (via
   npm, a CDN, or similar) has not been tampered with and originates from the
   legitimate distribution channel.

5. **The privileges and permissions of the execution context.** Moment inherits
   the privileges of the user or process that invokes it. Over privileged
   execution environments are not within scope.

## Global state is a documented design property

Moment maintains process global state by design. The active locale, the registry
of defined locales, and the global default configuration are shared across the
whole process, and `moment.locale()`, `moment.defineLocale()`,
`moment.updateLocale()`, and the global configuration setters mutate that shared
state on purpose so that a single call changes formatting behavior everywhere.

Because that state is global and mutable by design, passing untrusted input into
one of these setters, or sharing a single global Moment across trust domains, is
an application decision. Corruption, exceptions, or altered formatting that can
only be reached when attacker controlled input flows into a global setter is out
of scope; the documented guidance is to validate locale names against an
allowlist before setting them. Genuine hardening gaps here (for example an
internal registry that should reject reserved keys, or a lookup that should use
own property checks) are still worth fixing as robustness improvements, and may
be tracked as public issues, but are not treated as security vulnerabilities.

## Examples of Vulnerabilities (in scope)

- **Inefficient Regular Expression Complexity
  ([CWE-1333](https://cwe.mitre.org/data/definitions/1333.html)).** A documented
  parsing or formatting path driven into super linear time by an input within
  its documented usage, so that a single reasonable input hangs the caller.

- **Path Traversal ([CWE-22](https://cwe.mitre.org/data/definitions/22.html)).**
  A crafted value passed to a documented API that causes Moment to resolve and
  load a file outside the intended locale directory, crossing from date handling
  into undocumented file system access.

- **Uncontrolled Resource Consumption
  ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)).** Unbounded
  memory growth or non termination while operating on otherwise valid inputs
  within documented usage limits.

- **Unrecoverable Crash on Documented Usage
  ([CWE-248](https://cwe.mitre.org/data/definitions/248.html)).** Documented,
  trusted usage that throws in a way the caller cannot catch through the
  documented API, or that leaves Moment in a broken state the caller cannot
  recover from.

## Examples of Non-Vulnerabilities (out of scope)

### Unvalidated Application Input

Applications using Moment are responsible for input validation. Passing attacker
controlled data directly into Moment APIs, in particular into the global state
setters described above, is an application bug, not a Moment vulnerability.

### Prototype Chain Reads in Internal Registries

Moment uses plain objects internally as registries and caches, for example for
defined locales and compiled format functions. Reading such a structure with an
attacker supplied key that collides with an inherited property (`__proto__`,
`constructor`, `prototype`) can resolve to a value from `Object.prototype`
rather than a real entry. This is only reachable when the application passes an
untrusted key into a Moment API, and the underlying read is JavaScript's own
prototype resolution, not behavior Moment introduces. Reading inherited
properties is how the language works, so a report that shows only read only
prototype access is describing JavaScript, not a Moment vulnerability. Reports
of this shape are treated as robustness gaps and addressed as ordinary hardening
(own property checks, null prototype registries, rejecting reserved keys).

### Type Confusion and Gadget Chains

Some Moment APIs identify or consume objects by shape, for example by checking
internal marker properties. A forged plain object that imitates that shape
(typically parsed from untrusted JSON) is an untrusted value that trusted code
chose to accept and forward, so the root cause is in the caller, not Moment.
More generally, a Moment vulnerability has to be exploitable through Moment
alone: if the impact depends on combining Moment behavior with a separate bug
elsewhere, or on another component later accepting an object shape Moment
produced, the root cause is in that other code.

### Lenient Parsing of Malformed Input

Moment's parser is intentionally lenient and falls back to best effort
interpretation of ambiguous or malformed input, emitting deprecation warnings in
some cases. Producing an unexpected but well formed date, or emitting a
documented warning, is documented behavior, not a vulnerability, unless it also
crashes, hangs, or corrupts state as described above.

### Malicious or Vulnerable Third-Party Packages ([CWE-1357](https://cwe.mitre.org/data/definitions/1357.html))

A malicious dependency that overrides Moment behavior or injects code into
Moment's namespace is not a Moment vulnerability. Moment trusts its runtime and
installation context.

### Environmental Misconfiguration ([CWE-15](https://cwe.mitre.org/data/definitions/15.html))

Issues arising from misconfigured execution environments, such as running
outdated Node.js versions or insecure browser configurations, are not Moment
vulnerabilities.

### Vulnerabilities Requiring an End-of-Life Runtime

Moment provides a stable API across many runtime versions. A vulnerability that
only manifests on an end of life JavaScript runtime, or that requires a bug in
the runtime itself, is out of scope.

### Supply Chain Compromise

Tampering with Moment packages in the npm registry or as served from a CDN,
machine in the middle attacks during installation or delivery, a compromised or
malicious CDN copy, or local file system manipulation are not vulnerabilities in
Moment itself. Applications loading Moment from a CDN are responsible for
pinning versions and using integrity checks such as Subresource Integrity.
