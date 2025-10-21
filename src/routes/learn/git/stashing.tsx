import { createFileRoute } from '@tanstack/react-router';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { Spacer, SectionSpacer } from '@/components/Spacer';
import PageLayout from '@/layout/PageLayout';
import IntroBlock from '@/components/IntroBlock';
import { TopicBlock } from '@/components/blog';
import Typography from '@mui/material/Typography';
import NoteBlock from '@/components/NoteBlock';
import CodeBlock from '@/components/CodeBlock';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Arrow from '@/components/Arrow';

export const Route = createFileRoute('/learn/git/stashing')({
  component: StashingComponent,
  head: () => ({
    getTitle: () => 'Stashing',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content:
          'Learn how to stash uncommitted changes safely and apply them later',
      },
      {
        title: 'Stashing',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function StashingComponent() {
  return (
    <PageLayout>
      <TitleBlock
        title="Stashing"
        subtitle="Temporarily save uncommitted work"
      />

      <IntroBlock>
        Stash is like putting your current work in a drawer. It saves your
        uncommitted changes so you can switch branches or work on something else,
        then restore them later. A stash is basically a couple of commits
        (worktree + index) stored in <code>refs/stash</code>.
      </IntroBlock>

      {/* CORE COMMANDS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Core Stash Commands"
        id="core-commands"
        subtitle="The commands you'll actually use"
      />

      <ProseBlock spacingTop>
        Here are the essential stash commands for everyday use.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Save current changes with a helpful message
git stash push -m "WIP: fix things"

# List all stashes
git stash list

# Preview what's in a stash (full diff)
git stash show -p stash@{2}

# Preview summary (without -p)
git stash show stash@{2}`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Always use descriptive messages!</strong> Future you will
            thank you. <code>-m</code> flag adds a message to help identify the
            stash later.
          </Typography>
          <Typography variant="body2">
            <code>-p</code> shows the full patch (diff), without it you get just
            a summary of changed files.
          </Typography>
        </>
      </NoteBlock>

      {/* STASH OPTIONS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Stash Options"
        id="stash-options"
        subtitle="Including untracked and ignored files"
      />

      <ProseBlock spacingTop>
        By default, stash only saves tracked files. You can include new files,
        ignored files, or even keep staged changes separate.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Include untracked files (new files not yet added)
git stash push -u -m "WIP: with new files"
# or: git stash push --include-untracked -m "WIP"

# Include ignored files too (useful for .env files)
git stash push -a -m "WIP: including .env"
# or: git stash push --all -m "WIP"

# Keep staged changes in index, stash only unstaged
git stash push -k -m "WIP: unstaged only"
# or: git stash push --keep-index -m "WIP"`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Combining options:</strong> Yes, you can combine flags!{' '}
            <code>git stash push -u -m "WIP"</code> includes untracked files and
            adds a message.
          </Typography>
          <Typography variant="body2">
            The <code>-a</code> flag is useful when you need to stash environment
            files like <code>.env</code> that are normally ignored.
          </Typography>
        </>
      </NoteBlock>

      {/* APPLY VS POP */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Apply vs Pop"
        id="apply-vs-pop"
        subtitle="Keep or remove the stash"
      />

      <ProseBlock spacingTop>
        The key difference: <code>apply</code> keeps the stash in the list,{' '}
        <code>pop</code> removes it if successful.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Apply (keeps stash)" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Apply latest stash, keep it in the list
git stash apply

# Apply a specific stash
git stash apply stash@{2}

# Useful when you need the same stash on multiple branches`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Pop (removes on success)" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Apply latest stash, remove it if successful
git stash pop

# Pop a specific stash
git stash pop stash@{2}

# Use when you're done with the stash`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Apply = replay changes + keep stash</strong>
            <br />
            <strong>Pop = replay changes + remove stash (if success)</strong>
          </Typography>
          <Typography variant="body2">
            If pop fails due to conflicts, the stash remains in the list so you
            can retry or fix issues.
          </Typography>
        </>
      </NoteBlock>

      {/* STASH BRANCH */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Creating a Branch from Stash"
        id="stash-branch"
        subtitle="Two approaches: manual and automatic"
      />

      <ProseBlock spacingTop>
        Sometimes you want to apply a stash on a new branch, especially if the
        stash is old and might conflict with current work.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="A) Manual, explicit approach" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create new branch and switch to it
git switch -c apply-stash-5

# Apply the stash
git stash apply stash@{5}

# Resolve any conflicts, commit, etc.
git add .
git commit -m "Applied stash changes"`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          <strong>Why manual?</strong> You keep the stash after applying. Useful
          if you want to apply the same stash to multiple branches or keep it as
          a backup.
        </Typography>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="B) One-step helper" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create branch at original stash base, apply, and drop on success
git stash branch apply-stash-5 stash@{5}

# This automatically:
# 1. Creates new branch at the commit where stash was made
# 2. Checks out that branch
# 3. Applies the stash
# 4. Drops the stash if successful`}
      />

      <Spacer size={4} />
      <Alert severity="info">
        <AlertTitle>Why stash branch is groovy</AlertTitle>
        <code>git stash branch</code> reduces conflicts because it starts from
        the exact commit the stash was made on. The original context is restored,
        making conflicts much less likely!
      </Alert>

      {/* WORKFLOWS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Real-World Workflows"
        id="workflows"
      />

      <ProseBlock spacingTop>
        Here's how to use stash in common scenarios.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Apply stash, keep it for later"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Switch to feature branch (or create it)
git switch feature/new-ui
# or: git switch -c feature/new-ui

# Apply stash but keep it (useful for config files)
git stash apply stash@{i}

# Do your work, then selectively commit changes
# (maybe exclude the stashed config changes via VS Code)
git add <specific-files>
git commit -m "Apply fixes after testing with local config changes"`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Test stash on temporary branch"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create temp branch
git switch -c apply-stash-5

# Apply stash
git stash apply stash@{5}

# Test, commit, push or cherry-pick elsewhere if needed
git commit -m "Test stash changes"

# When done, switch back and clean up
git switch main
git branch -D apply-stash-5`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>-d vs -D for deletion:</strong> <code>-d</code> is a "safe"
            delete that only works if the branch is fully merged.{' '}
            <code>-D</code> force deletes even with unmerged changes.
          </Typography>
          <Typography variant="body2">
            Use <code>-D</code> for temporary test branches you want to discard.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Safest: recreate exact context"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# This ONE command does multiple things:
git stash branch apply-stash-5 stash@{5}

# What it does automatically:
# 1. Creates new branch 'apply-stash-5' at the commit where stash was made
# 2. Checks out that branch
# 3. Applies the stash
# 4. Drops the stash if successful (like pop!)

# Now you're on apply-stash-5 with the stash applied
# Test your changes, commit them
git add .
git commit -m "Applied stash changes"

# If everything looks good, merge back to main
git switch main
git merge apply-stash-5

# Clean up the temporary branch
git branch -d apply-stash-5`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Important:</strong> <code>git stash branch</code> behaves like{' '}
            <code>pop</code> - it removes the stash if successful! The stash is
            gone after this command.
          </Typography>
          <Typography variant="body2">
            The merge steps afterward are separate - you're merging your new
            branch (with the applied stash changes) back into main. That's not
            part of the <code>git stash branch</code> command itself.
          </Typography>
        </>
      </NoteBlock>

      {/* GIT ADD */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Git Add: -A vs . (dot)"
        id="git-add"
        subtitle="What's the difference?"
      />

      <ProseBlock spacingTop>
        You asked about <code>git add -A</code> vs <code>git add .</code> - here's
        the breakdown:
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="The differences"
        items={[
          <>
            <code>git add -A</code> <Arrow /> Adds all changes from entire repo
            (new, modified, deleted)
          </>,
          <>
            <code>git add .</code> <Arrow /> Adds all changes in current directory
            and subdirectories
          </>,
          <>
            <code>git add -u</code> <Arrow /> Updates tracked files only (no new
            files)
          </>,
        ]}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Add everything from anywhere in repo
git add -A

# Add everything in current directory down
git add .

# Update tracked files only (skip new files)
git add -u

# Best practice: be selective
git add src/component.tsx
git add src/utils.ts`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          <strong>VS Code selective staging is great!</strong> Don't feel bad
          about using the UI to selectively stage changes. It's often clearer
          than command-line staging, especially when excluding config changes.
        </Typography>
      </NoteBlock>

      {/* CONFLICTS AND RECOVERY */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Conflicts and Recovery"
        id="conflicts-recovery"
        subtitle="When things go wrong"
      />

      <ProseBlock spacingTop>
        Here's how to handle stash conflicts and recover accidentally lost
        stashes.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Resolving apply/pop conflicts" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Try to apply
git stash pop

# If conflicts occur, resolve files manually
# Then stage and commit:
git add <resolved-files>
git commit -m "Resolve stash conflicts"

# If pop had conflicts, the stash remains in the list
# Drop it manually when done:
git stash drop stash@{0}`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Recover accidentally lost stash"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Find lost stash in reflog
git reflog | grep stash

# You'll see something like:
# abc1234 WIP on main: stash message

# Create a branch from the lost stash commit
git switch -c recovery-branch abc1234

# Or cherry-pick the specific commit
git cherry-pick abc1234`}
      />

      <Spacer size={4} />
      <Alert severity="info">
        <AlertTitle>Reflog to the rescue!</AlertTitle>
        The reflog keeps track of all references for at least 30 days. Dropped
        stashes are usually recoverable!
      </Alert>

      {/* CLEANING UP */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Cleaning Up Stashes"
        id="cleanup"
        subtitle="Managing old stashes"
      />

      <ProseBlock spacingTop>
        Stashes accumulate over time. Here's how to clean them up safely.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Remove a specific stash
git stash drop stash@{3}

# Clear ALL stashes (careful!)
git stash clear`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Be careful with clear!</AlertTitle>
        <code>git stash clear</code> permanently removes all stashes. Make sure
        you don't need any of them before running this command!
        <br />
        <br />
        <code>git stash drop</code> removes one specific stash, which is safer.
      </Alert>

      {/* SAFETY NOTES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Safety Notes & Best Practices"
        id="safety-notes"
      />

      <Spacer size={4} />
      <TopicBlock
        title="Good habits"
        items={[
          'Always use descriptive messages with -m flag',
          'Preview stashes with git stash show -p before applying',
          'Use git stash branch for old stashes to reduce conflicts',
          "Don't rely on stash for long-term storage (use branches instead)",
          'Prefer git switch over git checkout for modern workflow',
          'VS Code selective staging is perfectly fine for excluding files',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <Alert severity="info">
        <AlertTitle>Stash vs Reset --hard</AlertTitle>
        Before using <code>git reset --hard</code> to discard changes, consider
        stashing them first. You might need them later! Stash is like an undo
        button.
      </Alert>

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer size={4} />
      <TopicBlock
        title="Creating stashes"
        items={[
          'git stash push -m "message" → Save with description',
          'git stash push -u -m "message" → Include untracked files',
          'git stash push -a -m "message" → Include ignored files',
          'git stash push -k -m "message" → Keep staged, stash unstaged',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Viewing stashes"
        items={[
          'git stash list → Show all stashes',
          'git stash show stash@{2} → Summary of changes',
          'git stash show -p stash@{2} → Full diff',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Applying stashes"
        items={[
          'git stash apply → Apply latest, keep it',
          'git stash apply stash@{2} → Apply specific, keep it',
          'git stash pop → Apply latest, remove if success',
          'git stash pop stash@{2} → Pop specific stash',
          'git stash branch name stash@{0} → Create branch and apply',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Managing stashes"
        items={[
          'git stash drop stash@{3} → Remove specific stash',
          'git stash clear → Remove all stashes (careful!)',
          'git reflog | grep stash → Find lost stashes',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Git add options"
        items={[
          'git add -A → All changes from entire repo',
          'git add . → All changes in current directory down',
          'git add -u → Update tracked files only',
          'git add <file> → Specific file (most selective)',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
