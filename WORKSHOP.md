# Workshop: completions you can justify

**Audience:** first-time Copilot users. **Time:** 30 minutes, excluding setup.
**Outcome:** a few small implementations, an independently checked result, and
an explanation of why a plausible completion can still be wrong.

Use the [README](README.md) for setup. This lab deliberately leaves the starter
functions empty: the exercise is to generate and assess them, not reveal a
finished solution.

## 1. Establish the starting point - 5 minutes

Open only this repository in your editor. Record your editor version, selected
completion model if exposed, and the files you intentionally supplied as context.
Do not open personal documents or credentials to make the context "richer."

Start the loopback-only server from the repository root:

```powershell
python -m http.server 8001 --bind 127.0.0.1
```

Open <http://127.0.0.1:8001/> and
<http://127.0.0.1:8001/src/buggy.test.html>. An `undefined` temperature or a
failed leap-year row is expected while the functions are empty. A CORS error,
404, or a page stuck on `Running...` is a setup problem, not a model mistake.

| File | Role | What is not provided |
| --- | --- | --- |
| [src/utils.js](src/utils.js) | Three comment-led helper stubs | Implementations and general-purpose input validation |
| [src/buggy.js](src/buggy.js) | Gregorian leap-year contract | The predicate |
| [src/buggy.test.html](src/buggy.test.html) | Eight independent expected results | A full calendar or date-validation suite |
| [src/context.js](src/context.js) | A concrete `USERS` shape | The `topUser` implementation |
| [index.html](index.html) | Temperature display | Tests for every helper |

## 2. Specify before accepting - 8 minutes

Place the cursor inside `celsiusToFahrenheit`, ask for a completion, and inspect
the expression before pressing Tab. Check these values without asking the same
model to invent the expected answers:

| Celsius | Expected Fahrenheit | Why include it? |
| --- | --- | --- |
| 0 | 32 | Offset |
| 20 | 68 | Ordinary input |
| 100 | 212 | Scale and offset together |
| -40 | -40 | Negative input and a useful cross-check |

Then complete `average`. Its comment requires `average([]) === 0`; that is an
explicit contract, not permission to turn every invalid input into zero.
Check `[5]`, `[1, 2, 3]`, and an empty array. Also check that the input array
has not been changed.

For `titleCase`, pause before generating. The comment does not settle how to
treat repeated spaces, hyphens, apostrophes, or existing capitals. Choose and
write down a small contract rather than letting a completion decide silently.
Keep Unicode title-casing outside this warm-up unless you specifically study it.

**Checkpoint:** explain the arithmetic and one edge case in your own words.
A screenshot of generated code is not evidence that the functions work.

## 3. Make the convincing error visible - 7 minutes

Complete `isLeapYear` from its existing comment. Reload the test page.
The eight cases are already in the repository; do not change them to match
the generated implementation.

On your exercise branch, temporarily replace the body with:

```javascript
return year % 4 === 0;
```

This is an intentionally incorrect candidate, not the solution. Reload the page.
The century cases 1700, 1900, and 2100 should expose the missing exception.
Years 1600, 2000, and 2400 demonstrate why rejecting every century is also wrong.

Restore the implementation you can explain and rerun the same page. This
red-then-green exercise demonstrates that the test can detect the relevant bug.
It does not establish correct behavior for strings, fractions, or every possible
calendar: those inputs are outside the stated predicate exercise.

**Checkpoint:** keep the failed and corrected results and name the violated rule.
If a model gets it right first time, that is fine; do not manufacture a story
about it having failed.

## 4. Observe context rather than assume it - 5 minutes

Complete `topUser` with [src/context.js](src/context.js) open. The shipped data
makes **Grace, score 95**, the expected result. Check the returned object's
fields, not just a person's name printed in a sentence.

Use this follow-up prompt:

```text
Explain which fields and ordering assumptions topUser relies on. Cite the
source. Do not change code. What would need deciding if USERS were empty or
two users tied for the highest score?
```

The empty-input and tie policies are design questions, not properties supplied
by the current fixture. Add such cases only after choosing the contract.

Compare two completions with different nearby comments if time permits.
Record the actual difference; the same prompt may produce the same output.
Open tabs are context signals, not a guarantee of a particular model response.

## 5. Debrief and extension - 5 minutes

Show one accepted suggestion, one rejected suggestion, and the evidence behind
each decision. A useful completion saves typing while leaving the human able
to explain the code.

For a stretch exercise, add an iterative `fib(n)` for integer inputs from 0 to
30. Decide that `fib(0) = 0` and `fib(1) = 1`, reject inputs outside that contract,
and check 2, 3, and 10 against independently calculated values. This keeps
recursion costs and JavaScript integer precision from becoming hidden lessons.

## Troubleshooting and reset

| Symptom | Inspect | Safe response |
| --- | --- | --- |
| No ghost text | Sign-in, entitlement, language enablement, inline-suggestion settings | Trigger a suggestion manually; do not promise a fixed delay |
| Tab moves focus | Editor keymap and suggestion visibility | Use the named accept-suggestion command |
| Module/CORS error | Address starts with `file://` | Use the local HTTP URLs above |
| Old result after an edit | Saved file, correct browser tab, console | Save and reload before blaming the model |
| Tests show unexpected values | Function body and unchanged expected cases | Diagnose the predicate; do not weaken the cases |

Stop only the server you started with Ctrl+C. Preserve exercise work on your
own branch or in a fresh clone; do not use a hard reset to prepare the next
participant's machine.

## Evidence to keep

Record the version and context used, the input/output table, the century-case
failure, and the corrected eight-case result. The page tests leap years only:
checking temperature conversion and other helpers remains a separate task.

## Current sources

Guidance checked **2026-09-07**. VS Code is a rolling product; keybindings and
model choices depend on the installed version.

- [VS Code AI features and shortcuts](https://code.visualstudio.com/docs/agents/reference/ai-features-cheat-sheet)
- [VS Code instruction scope](https://code.visualstudio.com/docs/agent-customization/custom-instructions):
  chat instructions are not applied to inline suggestions.

Next: [Demo 02](https://github.com/xavierxmorris/ghcp-demo-02-python-quickfix)
turns this accept-and-check habit into a debugging loop.
