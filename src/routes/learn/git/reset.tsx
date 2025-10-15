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

export const Route = createFileRoute('/learn/git/reset')({
  component: ResetComponent,
  head: () => ({
    getTitle: () => 'Reset',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content:
          'Understanding git reset modes and git stash for safely managing uncommitted changes',
      },
      {
        title: 'Reset',
      },
    ],
  }),
});

const sectionSpaceSize = 122;
const blockSpaceSize = 8;

function ResetComponent() {
  return (
    <PageLayout>
      <TitleBlock
        title="Reset & Stash"
        subtitle="Managing uncommitted changes safely"
      />

      <IntroBlock>
        Git reset and git stash are powerful tools for managing uncommitted work.
        Reset moves your branch pointer and optionally changes your working
        directory. Stash temporarily saves uncommitted changes so you can work on
        something else and restore them later.
      </IntroBlock>

      {/* GIT RESET MODES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Understanding Git Reset"
        id="git-reset"
        subtitle="Three modes: soft, mixed, and hard"
      />

      <ProseBlock spacingTop>
        Git reset has three modes that control what happens to your staged changes
        and working directory. Understanding the difference is crucial to avoid
        losing work.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="The three modes"
        items={[
          <>
            <strong>--soft</strong> <Arrow /> Moves HEAD, keeps staged changes and
            working directory
          </>,
          <>
            <strong>--mixed</strong> (default) <Arrow /> Moves HEAD, unstages
            changes, keeps working directory
          </>,
          <>
            <strong>--hard</strong> <Arrow /> Moves HEAD, discards staged changes
            AND working directory
          </>,
        ]}
      />

      <Spacer size={4} />
      <Alert severity="error">
        <AlertTitle>⚠️ --hard is destructive!</AlertTitle>
        <code>git reset --hard</code> permanently discards uncommitted changes.
        Only use it when you truly intend to throw away your work!
      </Alert>

      {/* RESET SOFT */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Reset --soft"
        id="reset-soft"
        subtitle="Undo commits, keep all changes staged"
      />

      <ProseBlock spacingTop>
        Soft reset moves your branch pointer back but keeps all your changes
        staged. Perfect for combining recent commits or changing commit messages.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last 3 commits, keep all changes staged
git reset --soft HEAD~3

# Reset to specific commit, keep changes staged
git reset --soft abc1234`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What happens:</strong> Your branch pointer moves back, but
            your staging area and working directory are untouched. All changes
            from the undone commits remain staged and ready to commit.
          </Typography>
          <Typography variant="body2">
            Useful for squashing commits or fixing a bad commit message.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Common use case" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Oops, made 3 commits that should be one
git reset --soft HEAD~3

# All changes are now staged
git commit -m "Combined commit with better message"`}
      />

      {/* RESET MIXED */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Reset --mixed (default)"
        id="reset-mixed"
        subtitle="Undo commits and unstage changes"
      />

      <ProseBlock spacingTop>
        Mixed reset (the default) moves your branch pointer and unstages changes,
        but keeps them in your working directory. This is what happens when you
        use <code>git reset</code> without a flag.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Undo last commit, unstage changes (default behavior)
git reset HEAD~1
# Same as: git reset --mixed HEAD~1

# Unstage all files but keep changes
git reset HEAD

# Reset to specific commit, unstage everything
git reset abc1234`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What happens:</strong> Your branch pointer moves back and your
            staging area is cleared, but your working directory keeps all the
            changes as unstaged modifications.
          </Typography>
          <Typography variant="body2">
            Perfect when you want to reorganize commits or unstage files without
            losing work.
          </Typography>
        </>
      </NoteBlock>

      {/* RESET HARD */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Reset --hard"
        id="reset-hard"
        subtitle="Complete reset - use with extreme caution!"
      />

      <ProseBlock spacingTop>
        Hard reset is the nuclear option: it moves your branch pointer, clears
        staging, and discards all uncommitted changes in your working directory.
        There's no undo.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Discard all uncommitted changes and reset to HEAD
git reset --hard HEAD

# Discard everything and go back one commit
git reset --hard HEAD~1

# Completely reset to a specific commit
git reset --hard abc1234

# Reset branch to match remote exactly
git reset --hard origin/main`}
      />

      <Spacer size={4} />
      <Alert severity="error">
        <AlertTitle>⚠️ No undo!</AlertTitle>
        <code>git reset --hard</code> permanently deletes uncommitted changes.
        They cannot be recovered. Only use when you're absolutely certain you want
        to throw away your work!
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="When to use --hard" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <TopicBlock
        title="Safe scenarios"
        items={[
          'Discarding experimental changes you no longer need',
          'Resetting to match remote after pulling',
          'Starting completely fresh from a clean state',
          'Abandoning merge/rebase attempts',
        ]}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          Before using <code>--hard</code>, consider using{' '}
          <code>git stash</code> instead! It saves your changes temporarily so you
          can restore them later if needed.
        </Typography>
      </NoteBlock>

      {/* GIT STASH BASICS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Git Stash Basics"
        id="git-stash"
        subtitle="Temporarily save uncommitted work"
      />

      <ProseBlock spacingTop>
        Stash is like putting your current work in a drawer. It saves your
        uncommitted changes (both staged and unstaged) so you can switch branches
        or work on something else, then restore them later.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Stash current changes
git stash

# Stash with a descriptive message
git stash push -m "WIP: working on user authentication"

# Stash including untracked files
git stash -u

# List all stashes
git stash list`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What happens:</strong> Git saves your uncommitted changes and
            reverts your working directory to a clean state (matching HEAD). Your
            changes are stored in a stash stack.
          </Typography>
          <Typography variant="body2">
            You can have multiple stashes, each identified by <code>stash@{'{'}0{'}'}</code>,{' '}
            <code>stash@{'{'}1{'}'}</code>, etc.
          </Typography>
        </>
      </NoteBlock>

      {/* APPLYING STASHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Applying and Popping Stashes"
        id="applying-stashes"
        subtitle="Restoring saved work"
      />

      <ProseBlock spacingTop>
        You can restore stashed changes with <code>apply</code> (keeps the stash)
        or <code>pop</code> (applies and removes the stash).
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Apply vs Pop" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Apply most recent stash (keeps it in stash list)
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Pop most recent stash (applies and removes it)
git stash pop

# Pop specific stash
git stash pop stash@{1}`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>apply vs pop:</strong> <code>apply</code> restores the changes
            but keeps the stash in the list. <code>pop</code> restores and removes
            it.
          </Typography>
          <Typography variant="body2">
            Use <code>apply</code> if you want to test the stash on multiple
            branches. Use <code>pop</code> when you're done with the stash.
          </Typography>
        </>
      </NoteBlock>

      {/* STASH CONFLICTS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Handling Stash Conflicts"
        id="stash-conflicts"
        subtitle="When stashed changes don't apply cleanly"
      />

      <ProseBlock spacingTop>
        If you apply a stash far from where it was created, you might get
        conflicts. Here's how to handle them safely.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Preview stash before applying
git stash show -p stash@{0}

# Try to apply
git stash pop

# If conflicts occur, resolve them
# Edit conflicting files, then:
git add <resolved-files>
git commit -m "Resolve stash conflicts"

# The stash remains if pop had conflicts
# Drop it manually when done:
git stash drop stash@{0}`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Best practice:</strong> Use <code>git stash show -p</code> to
            preview what changes will be applied before actually applying the
            stash.
          </Typography>
          <Typography variant="body2">
            If pop conflicts, the stash stays in the list so you can retry or drop
            it manually.
          </Typography>
        </>
      </NoteBlock>

      {/* STASH BRANCH */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Stash Branch"
        id="stash-branch"
        subtitle="Apply stash on a new branch"
      />

      <ProseBlock spacingTop>
        When applying a stash might conflict, creating a branch from the original
        commit reduces conflicts and gives you a clean workspace to test.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a new branch from the commit where stash was created
# and apply the stash to it
git stash branch new-branch-name stash@{0}

# Example workflow
git stash branch feature-recovery stash@{2}`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What happens:</strong> Git creates a new branch at the commit
            where the stash was made, checks it out, applies the stash, and drops
            the stash if successful.
          </Typography>
          <Typography variant="body2">
            This is the safest way to apply old stashes that might conflict with
            current work.
          </Typography>
        </>
      </NoteBlock>

      {/* RECOVERING LOST STASHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Recovering Lost Stashes"
        id="recovering-stashes"
        subtitle="Oops, I dropped the wrong one!"
      />

      <ProseBlock spacingTop>
        Accidentally popped or dropped a stash? You can often recover it using the
        reflog!
      </ProseBlock>

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

# Or cherry-pick the commit
git cherry-pick abc1234`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          The reflog keeps track of all references, including dropped stashes.
          They're usually recoverable for at least 30 days (Git's default
          expiration).
        </Typography>
      </NoteBlock>

      {/* MANAGING STASHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Managing Stashes"
        id="managing-stashes"
        subtitle="Cleaning up old stashes"
      />

      <ProseBlock spacingTop>
        Over time, stashes can accumulate. Here's how to manage them.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# List all stashes with details
git stash list

# Show what's in a specific stash
git stash show stash@{2}
git stash show -p stash@{2}  # Show full diff

# Drop a specific stash
git stash drop stash@{3}

# Clear ALL stashes (careful!)
git stash clear`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Be careful with clear!</AlertTitle>
        <code>git stash clear</code> removes all stashes permanently. Make sure
        you don't need any of them before running this command.
      </Alert>

      {/* BEST PRACTICES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Best Practices"
        id="best-practices"
      />

      <Spacer size={4} />
      <TopicBlock
        title="Reset safely"
        items={[
          'Use --soft or --mixed when possible, avoid --hard',
          'Before --hard, consider git stash instead',
          "Double-check which branch you're on before reset",
          'Know that reflog can help recover from mistakes',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Stash effectively"
        items={[
          'Use descriptive messages: git stash push -m "message"',
          'Preview stashes before applying: git stash show -p',
          'Use git stash branch for old stashes to reduce conflicts',
          'Clean up old stashes regularly with git stash drop',
          "Don't rely on stash for long-term storage (use branches)",
        ]}
      />

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer size={4} />
      <TopicBlock
        title="Git Reset"
        items={[
          'git reset --soft HEAD~1 → Undo commit, keep changes staged',
          'git reset HEAD~1 → Undo commit, unstage changes (default)',
          'git reset --hard HEAD → Discard all uncommitted changes',
          'git reset --hard origin/main → Match remote exactly',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Git Stash"
        items={[
          'git stash → Save current changes',
          'git stash push -m "message" → Save with description',
          'git stash -u → Include untracked files',
          'git stash list → Show all stashes',
          'git stash pop → Apply and remove most recent stash',
          'git stash apply stash@{2} → Apply specific stash',
          'git stash show -p stash@{0} → Preview stash contents',
          'git stash branch name stash@{0} → Apply to new branch',
          'git stash drop stash@{3} → Delete specific stash',
          'git stash clear → Delete all stashes (careful!)',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
