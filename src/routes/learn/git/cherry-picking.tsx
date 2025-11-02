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

export const Route = createFileRoute('/learn/git/cherry-picking')({
  component: CherryPickingComponent,
  head: () => ({
    getTitle: () => 'Cherry-Picking',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content:
          'Learn how to cherry-pick specific commits from one branch to another without merging everything',
      },
      {
        title: 'Cherry-Picking',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function CherryPickingComponent() {
  return (
    <PageLayout>
      <TitleBlock
        title="Cherry-Picking"
        subtitle="Selective Commits: Apply specific commits from one branch to another"
      />

      <IntroBlock>
        Cherry-picking lets you copy specific commits from one branch to another
        without merging the entire branch. It's like saying "I want that
        specific change, but not everything else." Perfect for pulling bug fixes
        to release branches or grabbing features selectively.
      </IntroBlock>

      {/* WHAT IS CHERRY-PICKING */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="What Is Cherry-Picking?"
        id="what-is-cherry-picking"
        subtitle="The concept"
      />

      <ProseBlock spacingTop>
        Cherry-picking creates a new commit on your current branch with the same
        changes as an existing commit from another branch. The commit gets a new
        hash, but the code changes are identical.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="When to use cherry-picking"
        items={[
          'Apply a bug fix to a release branch without merging new features',
          'Pull a specific feature from a feature branch to another',
          'Recover commits from a deleted branch',
          'Apply hotfixes to multiple release branches',
          'Undo a commit by cherry-picking the revert',
        ]}
      />

      <Spacer size={4} />
      <Alert severity="info">
        <AlertTitle>Cherry-picking vs Merging</AlertTitle>
        <strong>Merge:</strong> Brings all commits from one branch to another
        <br />
        <strong>Cherry-pick:</strong> Brings only specific commits you choose
      </Alert>

      {/* BASIC CHERRY-PICKING */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Basic Cherry-Picking"
        id="basic-cherry-pick"
        subtitle="The simple case"
      />

      <ProseBlock spacingTop>
        The basic workflow: find the commit hash you want, switch to your target
        branch, and cherry-pick it.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# 1. Find the commit hash you want (from logs or GitHub)
git log --oneline

# 2. Switch to the target branch
git switch main

# 3. Cherry-pick the commit
git cherry-pick abc1234

# Example: apply bug fix to release branch
git switch release/v1.0
git cherry-pick 7f8e9a2`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What happens:</strong> Git creates a new commit on your
            current branch with the same changes as <code>abc1234</code>. The
            new commit gets a different hash but identical code changes.
          </Typography>
          <Typography variant="body2">
            The original commit on the source branch is unchanged.
          </Typography>
        </>
      </NoteBlock>

      {/* CHERRY-PICKING MULTIPLE COMMITS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Cherry-Picking Multiple Commits"
        id="multiple-commits"
        subtitle="Building a custom branch"
      />

      <ProseBlock spacingTop>
        You can cherry-pick multiple commits one by one, or use a range of
        commits. This is useful for building a custom release branch from
        specific features.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="One by one" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Cherry-pick multiple commits individually
git cherry-pick abc1234
git cherry-pick def5678
git cherry-pick 9a0b1c2

# Each creates a new commit on your current branch`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Range of commits"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Cherry-pick a range of commits (oldest..newest)
git cherry-pick abc1234..def5678

# Include the first commit in the range
git cherry-pick abc1234^..def5678`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Range syntax:</strong> <code>abc1234..def5678</code> picks
            all commits between those two, but <strong>excludes</strong> the
            first one.
          </Typography>
          <Typography variant="body2">
            Use <code>abc1234^..def5678</code> (with caret) to include the first
            commit in the range.
          </Typography>
        </>
      </NoteBlock>

      {/* CREATING A TEMP BRANCH */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Working with Temp Branches"
        id="temp-branches"
        subtitle="Test before applying to main branch"
      />

      <ProseBlock spacingTop>
        It's often safer to cherry-pick to a temporary branch first, test
        everything, then merge or fast-forward to your target branch.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a temp branch from your target branch
git switch main
git switch -c temp-branch

# Cherry-pick commits as needed
git cherry-pick abc1234  # from branch A
git cherry-pick def5678  # from branch B
git cherry-pick 9a0b1c2  # from branch C

# Test everything works

# If good, merge back to main
git switch main
git merge temp-branch

# Clean up
git branch -d temp-branch`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Why use a temp branch?</strong> It gives you a safe place to
            cherry-pick and test without affecting your main branch. If
            something goes wrong, just delete the temp branch.
          </Typography>
          <Typography variant="body2">
            <code>git switch -C temp-branch</code> (capital C) will reset the
            temp branch to your current HEAD if it already exists.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <Alert severity="info">
        <AlertTitle>Comparing -c vs -C</AlertTitle>
        <code>git switch -c temp-branch</code> <Arrow /> Creates new branch,
        fails if it exists
        <br />
        <code>git switch -C temp-branch</code> <Arrow /> Creates or resets
        branch to current HEAD
      </Alert>

      {/* HANDLING CONFLICTS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Handling Cherry-Pick Conflicts"
        id="conflicts"
        subtitle="When changes don't apply cleanly"
      />

      <ProseBlock spacingTop>
        Sometimes a cherry-picked commit conflicts with your current branch. Git
        will pause and let you resolve it, similar to merge conflicts.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Try to cherry-pick
git cherry-pick abc1234

# If conflicts occur, you'll see:
# error: could not apply abc1234...
# hint: after resolving the conflicts, mark the corrected paths
# hint: with 'git add <paths>' or 'git rm <paths>'
# hint: and commit the result with 'git cherry-pick --continue'

# 1. Resolve conflicts in your editor (or use git mergetool)
# 2. Stage the resolved files
git add .

# 3. Continue the cherry-pick
git cherry-pick --continue`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          During conflicts, you can also use{' '}
          <code>git cherry-pick --abort</code> to cancel the cherry-pick and
          return to the previous state.
        </Typography>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Cherry-pick options"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <TopicBlock
        title="Useful flags"
        items={[
          <>
            <code>--continue</code> <Arrow /> Continue after resolving conflicts
          </>,
          <>
            <code>--abort</code> <Arrow /> Cancel the cherry-pick
          </>,
          <>
            <code>--skip</code> <Arrow /> Skip this commit and continue with
            next
          </>,
          <>
            <code>-n</code> or <code>--no-commit</code> <Arrow /> Apply changes
            without committing
          </>,
          <>
            <code>-x</code> <Arrow /> Add "cherry picked from" note to commit
            message
          </>,
        ]}
      />

      {/* COMMON WORKFLOWS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Common Cherry-Pick Workflows" id="workflows" />

      <ProseBlock spacingTop>
        Here are real-world scenarios where cherry-picking shines.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Hotfix to multiple release branches"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Fix bug on main
git switch main
git commit -m "Fix critical security bug"
# Note the commit hash: abc1234

# Apply to release v1.0
git switch release/v1.0
git cherry-pick abc1234

# Apply to release v2.0
git switch release/v2.0
git cherry-pick abc1234

# Each release branch now has the fix`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Build custom release from features"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create release branch
git switch main
git switch -c release/v2.0

# Pick specific features (not entire branches)
git cherry-pick feature-a-commit-hash  # Want this feature
git cherry-pick feature-b-commit-hash  # Want this too
# Skip feature-c entirely

# Test and deploy
git push origin release/v2.0`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Recover from deleted branch"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Find the commit hash (use git reflog or GitHub)
git reflog

# Cherry-pick the commit to a new branch
git switch -c recovery-branch
git cherry-pick lost-commit-hash

# Commits are recovered!`}
      />

      {/* BEST PRACTICES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Best Practices & Warnings"
        id="best-practices"
      />

      <ProseBlock spacingTop>
        Cherry-picking is powerful but can cause issues if misused.
      </ProseBlock>

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Avoid duplicate commits</AlertTitle>
        Cherry-picking creates a <strong>new commit</strong> with a different
        hash. If you later merge the original branch, you might end up with
        duplicate changes (same code, different commits).
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="When NOT to cherry-pick"
        items={[
          'When you need all commits from a branch (use merge instead)',
          'On commits that others have based work on (confusing history)',
          'Repeatedly for the same changes across branches (consider rebasing)',
          'When a proper merge would be clearer for the team',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Cherry-picking tips"
        items={[
          'Use -x flag to add "cherry picked from" note to commit message',
          'Test cherry-picked commits thoroughly (context might be different)',
          'Document why you cherry-picked instead of merging',
          'Consider merging if you need most commits from a branch',
          'Use temp branches to test before applying to main branches',
        ]}
      />

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer size={4} />
      <TopicBlock
        title="Basic commands"
        items={[
          'git cherry-pick abc1234 → Apply one commit',
          'git cherry-pick abc1234 def5678 → Apply multiple commits',
          'git cherry-pick abc1234..def5678 → Apply range (excludes first)',
          'git cherry-pick abc1234^..def5678 → Apply range (includes first)',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Handling conflicts"
        items={[
          'git cherry-pick --continue → Continue after resolving',
          'git cherry-pick --abort → Cancel cherry-pick',
          'git cherry-pick --skip → Skip current commit',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Useful options"
        items={[
          'git cherry-pick -n abc1234 → Apply without committing',
          'git cherry-pick -x abc1234 → Add "cherry picked from" note',
          'git cherry-pick --no-commit abc1234 → Same as -n',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
