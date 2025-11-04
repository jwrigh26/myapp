# Vim Keybindings for Web Development in VSCode

A practical guide for using Vim keybindings efficiently in VSCode, specifically for React/TypeScript/JSX development.

## Prerequisites

Install the **VSCodeVim** extension and enable vim-surround in your `settings.json`:

```json
{
  "vim.surround": true,
  "vim.easymotion": true,
  "vim.useSystemClipboard": true
}
```

---

## Table of Contents

- [Wrapping Text with Tags](#wrapping-text-with-tags)
- [Navigating JSX/TSX Files](#navigating-jsxtsx-files)
- [Editing Component Props](#editing-component-props)
- [Multi-Cursor Editing](#multi-cursor-editing)
- [Code Folding](#code-folding)
- [Common Workflows](#common-workflows)
- [VSCode-Specific Vim Commands](#vscode-specific-vim-commands)

---

## Wrapping Text with Tags

### Basic Surround Operations

**Wrap word with tags:**
```vim
viw         " visually select inner word
S<span>     " surround with <span> (auto-closes)
```

**Wrap selection with tags:**
```vim
v           " enter visual mode
[motion]    " select text (e.g., w, $, %), 
S<div>      " surround with <div>
```

**Wrap entire line:**
```vim
V           " visual line mode
S<Box>      " surround with <Box> component
```

### Advanced Surround (vim-surround)

**You Surround Inner Word (ysiw):**
```vim
ysiw<span>      " wrap current word with <span>
ysiw"           " wrap word with double quotes
ysiw'           " wrap word with single quotes
ysiw{           " wrap word with { } (with spaces)
ysiw}           " wrap word with {} (no spaces)
```

**Change Surround (cs):**
```vim
cs"'            " change surrounding " to '
cs'<span>       " change surrounding ' to <span>
cs{[            " change { } to [ ]
cst<Box>        " change surrounding tag to <Box>
```

**Delete Surround (ds):**
```vim
ds"             " delete surrounding "
dst             " delete surrounding tag (e.g., <span>)
ds{             " delete surrounding { }
```

### Practical Examples

**Wrap multiple words:**
```vim
" foo bar baz
v2w         " select 'foo bar'
S<strong>   " wrap with <strong>
" Result: <strong>foo bar</strong> baz
```

**Wrap function argument:**
```vim
" onClick={handleClick}
f{          " jump to {
vi{         " select inside {}
S<code>     " wrap with <code>
" Result: onClick={<code>handleClick</code>}
```

**Convert string to template literal:**
```vim
" const msg = "Hello"
ci"         " change inside "
<Ctrl-r>"   " paste what you just deleted
<Esc>       " exit insert mode
cs"`        " change " to `
" Result: const msg = `Hello`
```

---

## Navigating JSX/TSX Files

### Jump to Matching Brackets/Tags

```vim
%               " jump between matching (), {}, [], or <tags>
```

**Example:**
```tsx
// Cursor on opening <Box>
<Box>
  <Typography>Hello</Typography>
</Box>
% " jumps to closing </Box>
```

### Navigate by Component

```vim
[[              " jump to previous { at start of line (function/component)
]]              " jump to next { at start of line
```

### Search and Jump

```vim
/pattern        " search forward for pattern
?pattern        " search backward
n               " next occurrence
N               " previous occurrence
*               " search for word under cursor (forward)
#               " search for word under cursor (backward)
```

**Find component usage:**
```vim
*               " with cursor on component name
n               " jump to next usage
```

### Text Objects for Faster Selection

```vim
vi{             " select inside { } (ignores surrounding braces)
va{             " select around { } (includes braces)
vit             " select inside tag (HTML/JSX)
vat             " select around tag (includes tags)
vi"             " select inside " "
va"             " select around " " (includes quotes)
vi(             " select inside ( )
va(             " select around ( )
```

**Practical usage:**
```vim
" <Typography variant="h6">Hello</Typography>
vit             " selects: Hello
cit             " change inside tag (delete + insert mode)
yit             " yank (copy) inside tag
dit             " delete inside tag
```

---

## Editing Component Props

### Quickly Edit Props

**Change prop value:**
```vim
" variant="h6"
f"              " jump to first "
ci"             " change inside quotes
h5<Esc>         " type new value and exit
" Result: variant="h5"
```

**Add prop to component:**
```vim
" <Box>
f>              " jump to >
i               " insert mode before >
 className="container"
<Esc>           " exit insert mode
" Result: <Box className="container">
```

**Delete prop:**
```vim
" <Box sx={{ mt: 2 }} className="test">
f{              " jump to first {
da{             " delete around { } (deletes sx={{ mt: 2 }})
```

### Working with Prop Objects

```vim
" sx={{ marginTop: 2, padding: 4 }}
f{              " jump to {
%               " jump to closing }
vi{             " select inside outer {}
```

---

## Multi-Cursor Editing

VSCodeVim supports multi-cursor with `gb` (add next match):

```vim
*               " highlight word under cursor
gb              " add cursor at next match
gb              " add another cursor
c               " change all instances
new-text<Esc>   " type and exit - changes all
```

**Alternative with visual block mode:**
```vim
<Ctrl-v>        " visual block mode
[motion]        " select column
I               " insert at start of each line
text<Esc>       " type and exit - adds to all lines
```

**Practical example - add props to multiple components:**
```tsx
// Original:
<Box>
<Box>
<Box>

// Actions:
<Ctrl-v>        " visual block mode
2j              " select 3 lines
A               " append at end of each line
 className="test"<Esc>

// Result:
<Box className="test">
<Box className="test">
<Box className="test">
```

---

## Code Folding

```vim
zc              " close fold
zo              " open fold
za              " toggle fold
zM              " close all folds
zR              " open all folds
zj              " move to next fold
zk              " move to previous fold
```

**Fold component:**
```vim
" Position cursor on component function
zc              " fold component body
zo              " unfold
```

---

## Common Workflows

### Refactor Component Name

```vim
" Change <OldComponent> to <NewComponent>
*               " search for OldComponent under cursor
cgn             " change next occurrence (enter insert mode)
NewComponent<Esc>
.               " repeat for next occurrence
.               " repeat again
```

### Duplicate Line/Block

```vim
yy              " yank (copy) line
p               " paste below
P               " paste above
```

**Duplicate JSX block:**
```vim
va{             " select around { } block
y               " yank
p               " paste
```

### Comment Toggle

```vim
gcc             " toggle comment on current line
gc              " toggle comment on selection (visual mode)
gcap            " toggle comment on paragraph
```

**Example:**
```tsx
// Visual mode: select 3 lines of JSX
Vjj             " select 3 lines
gc              " toggle comment
```

### Indent/Outdent

```vim
>>              " indent line
<<              " outdent line
>%              " indent block (cursor on opening brace)
=%              " auto-format block
gg=G            " auto-format entire file
```

### Quick Component Formatting

```vim
vi{             " select inside component { }
=               " auto-format selection
```

---

## VSCode-Specific Vim Commands

### Combine Vim with VSCode Commands

```vim
:Format         " VSCode format command
:Rename         " VSCode rename symbol
:OrganizeImports " VSCode organize imports
```

**In normal mode:**
```vim
gd              " go to definition (VSCode)
gh              " show hover (VSCode)
gr              " find references (VSCode)
gf              " go to file under cursor
```

### VSCode Specific Keybindings

Add to `keybindings.json` for enhanced Vim + VSCode integration:

```json
[
  {
    "key": "cmd+shift+f",
    "command": "workbench.action.findInFiles",
    "when": "vim.mode == 'Normal'"
  },
  {
    "key": "space",
    "command": "vscode-neovim.send",
    "when": "vim.mode == 'Normal'",
    "args": "<leader>"
  }
]
```

---

## Advanced Tips

### Macros for Repetitive Tasks

**Record a macro:**
```vim
qa              " start recording macro in register 'a'
[actions]       " perform actions
q               " stop recording

@a              " execute macro
@@              " repeat last macro
5@a             " execute macro 5 times
```

**Example - Wrap all words in a line with `<code>` tags:**
```vim
qa              " start recording
viw             " select word
S<code>         " surround with <code>
w               " move to next word
q               " stop recording

5@a             " repeat for 5 words
```

### Visual Block for Aligned Edits

```tsx
// Add 'readonly' to multiple props:
const props = {
  name: string;
  age: number;
  email: string;
};

// Actions:
<Ctrl-v>        " visual block mode
2j              " select 3 lines (column)
I               " insert at start
readonly <Esc>  " type and exit

// Result:
const props = {
  readonly name: string;
  readonly age: number;
  readonly email: string;
};
```

### Search and Replace in File

```vim
:%s/old/new/g       " replace all 'old' with 'new' in file
:%s/old/new/gc      " replace with confirmation
:s/old/new/g        " replace in current line
:'<,'>s/old/new/g   " replace in visual selection
```

**Example - Update import path:**
```vim
:%s/@\/components/@\/ui/g
" Changes: import Button from '@/components/Button'
" To:      import Button from '@/ui/Button'
```

---

## Quick Reference Card

### Essential Surround Commands
| Command | Action |
|---------|--------|
| `ysiw<tag>` | Wrap word with tag |
| `S<tag>` | Surround selection (visual mode) |
| `cs"'` | Change " to ' |
| `cst<Box>` | Change tag to `<Box>` |
| `ds"` | Delete surrounding " |
| `dst` | Delete surrounding tag |

### Essential Text Objects
| Command | Action |
|---------|--------|
| `vi{` | Inside { } |
| `vit` | Inside tag |
| `vi"` | Inside " " |
| `viw` | Inner word |
| `vip` | Inner paragraph |

### Essential Navigation
| Command | Action |
|---------|--------|
| `%` | Jump to matching bracket/tag |
| `*` | Search word under cursor |
| `gd` | Go to definition |
| `f<char>` | Jump to next `<char>` |
| `t<char>` | Jump to before `<char>` |

### Essential Editing
| Command | Action |
|---------|--------|
| `ci"` | Change inside " " |
| `da{` | Delete around { } |
| `yy` | Yank (copy) line |
| `dd` | Delete line |
| `gcc` | Toggle comment |

---

## Troubleshooting

### Auto-Close Tags Conflict

If VSCode auto-close conflicts with Vim surround:

```json
{
  "editor.autoClosingTags": false,
  "typescript.autoClosingTags": false,
  "javascript.autoClosingTags": false
}
```

### Clipboard Not Working

Enable system clipboard:

```json
{
  "vim.useSystemClipboard": true
}
```

### Key Repeat Not Working (macOS)

Enable key repeat in terminal:

```bash
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

---

## Resources

- [VSCodeVim Extension](https://github.com/VSCodeVim/Vim)
- [vim-surround Documentation](https://github.com/tpope/vim-surround)
- [Vim Adventures Game](https://vim-adventures.com/)
- [Interactive Vim Tutorial](https://www.openvim.com/)

---

## Practice Exercises

Try these exercises to build muscle memory:

1. **Wrap all function names in a file with backticks**
   - Use `*` to search, `cgn` to change next, `.` to repeat

2. **Change all double quotes to single quotes in imports**
   - Visual select import block, `:'<,'>s/"/'/g`

3. **Add `className` prop to 5 components**
   - Use visual block mode `<Ctrl-v>`

4. **Refactor `<div>` to `<Box>` in a component**
   - `cst<Box>` on each tag, or use search/replace

5. **Wrap all string literals with `t()` for i18n**
   - Record macro: `qa vi" S( i t <Esc> q`, then `@a` to repeat

---

Happy Vimming! 🎯
