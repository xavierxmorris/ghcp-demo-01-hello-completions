# Demo 01 — Hello, Copilot Completions 👋

> **Difficulty:** ⭐ (warm-up)
> **GHCP surfaces:** Copilot in IDE — ghost-text completions, comment-driven coding
> **Stack:** Vanilla JavaScript + HTML (no build, no framework)
> **Time:** ~10 minutes

This is the smallest possible "hello world" for GitHub Copilot. You'll experience
**ghost text** — Copilot's grey, inline suggestions — and learn the muscle memory
for accepting, rejecting, and cycling through them.

---

## What you'll learn
1. How to accept / reject / cycle Copilot suggestions.
2. **Comment-driven coding**: writing a comment that "asks" for code, and letting
   Copilot draft it.
3. Why context (open files, cursor position, surrounding code) shapes suggestions.
4. When *not* to trust a completion (the "looks right but is subtly wrong" trap).

## Prerequisites
- VS Code (or any JetBrains IDE / Visual Studio / Neovim with Copilot extension).
- An active GitHub Copilot subscription (or trial / Business / Enterprise seat).
- The Copilot extension installed and signed in.

## Setup
```bash
git clone https://github.com/xavierxmorris/ghcp-demo-01-hello-completions.git
cd ghcp-demo-01-hello-completions
code .
```
Open `index.html` in a browser (double-click works) to see the playground.

## Cheat sheet — keyboard shortcuts

| Action                         | macOS                | Windows / Linux       |
|--------------------------------|----------------------|-----------------------|
| Accept full suggestion         | `Tab`                | `Tab`                 |
| Reject suggestion              | `Esc`                | `Esc`                 |
| Accept next **word**           | `⌘ →`                | `Ctrl →`              |
| See next / previous suggestion | `⌥ ]` / `⌥ [`        | `Alt + ]` / `Alt + [` |
| Open Copilot panel (10 alts)   | `⌃ Return`           | `Ctrl + Enter`        |
| Trigger suggestion manually    | `⌥ \`                | `Alt + \`             |

---

## Walkthrough

### Step 1 — Accept your first suggestion
1. Open `src/utils.js`.
2. Place your cursor at the **end of line 3** (after the `// TODO:` comment for
   `celsiusToFahrenheit`).
3. Press `Enter`. Within ~1 second, grey ghost-text appears.
4. Press `Tab` to accept.

✅ **Expected:** You get a one-line implementation like
`return c * 9 / 5 + 32;`.

### Step 2 — Comment-driven coding
1. Scroll to the bottom of `src/utils.js`.
2. Type the following comment exactly and press `Enter`:
   ```js
   // Return the nth Fibonacci number iteratively. Throw if n < 0.
   function fib(n) {
   ```
3. Wait. Tab to accept.

✅ **Expected:** A loop-based Fibonacci with input validation. Copilot used your
*natural-language intent* as the prompt.

### Step 3 — Cycle through alternatives
1. Delete the function body you just accepted.
2. Re-trigger the suggestion (cursor inside the function).
3. Press `Alt + ]` repeatedly — notice Copilot rotates through different
   implementations (recursive, memoised, iterative).

### Step 4 — "Looks right but is wrong" — *the trust exercise*
1. Open `src/buggy.js`. Read the comment for `isLeapYear`.
2. Let Copilot complete it. Tab to accept.
3. Open `src/buggy.test.html` in a browser. **Do all tests pass?**

⚠️ Copilot often produces the *common* leap-year rule (`year % 4 === 0`) and
misses the century-divisible-by-400 rule. This is the lesson: **completions
are drafts, not specifications**. Always run your tests.

### Step 5 — Context matters
1. Open `src/context.js`. It already defines `USERS` with a specific shape.
2. Place your cursor at the comment `// find the user with the highest score`.
3. Accept the suggestion.

✅ Notice Copilot used the *exact* field names (`name`, `score`) from `USERS`.
That's because the surrounding file is part of its context window.

---

## Try it yourself

Stretch exercises — let Copilot draft, then verify:

1. Add `kebabCase(str)` and `snakeCase(str)` to `utils.js` via comments only.
2. Add a `debounce(fn, ms)` helper. Does Copilot get the timer reset logic right?
3. In `context.js`, write `// Group users by department and average their scores`.
4. Delete `index.html` and re-create it from a single comment at the top of an
   empty file: `<!-- A page that uses utils.js to convert 0°C, 20°C, 100°C to °F and shows them in a table -->`.

## Talking points / discussion
- Copilot is **autocomplete on steroids**, not an oracle.
- The biggest productivity wins come from *naming things well* (functions,
  variables, comments) — that's literally the prompt.
- Always pair completions with **tests**, **types**, or a quick mental review.
- Sensitive data in open files becomes part of the prompt context — be mindful.

## Next demo →
Once comfortable with completions, move to
[Demo 02 — Python Quickfix](../ghcp-demo-02-python-quickfix) to learn Copilot
**Chat** slash-commands.
