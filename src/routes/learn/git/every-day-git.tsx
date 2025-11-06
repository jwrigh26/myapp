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
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/git/every-day-git')({
  component: EveryDayGit,
  head: () => ({
    getTitle: () => 'Every Day Git',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content: 'Quick reference guide for git commands I use every day',
      },
      {
        title: 'Every Day Git',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function EveryDayGit() {
  return (
    <PageLayout>
      <TitleBlock
        title="Every Day Git"
        subtitle="Quick reference for the git commands I use daily"
      />

      <IntroBlock>
        This is my personal quick reference for git commands I actually use
        every day. No fluff, just the commands that get work done. Each section
        has ready-to-copy examples.
      </IntroBlock>

      {/* PUSHING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Pushing a New Branch"
        id="pushing-branch"
        subtitle="Getting your local branch up to the remote"
      />

      <ProseBlock spacingTop>
        When you create a new branch locally and want to push it to origin for
        the first time, you need to set up tracking.
      </ProseBlock>
      <Spacer />
      <CodeBlock
        border
        language="python"
        code={`# Push and set upstream tracking in one command
git push -u origin branch-name

# Example
git push -u origin feature/add-user-auth`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -u does:</strong> The <code>-u</code> flag (short for{' '}
            <code>--set-upstream</code>) tells git to remember this branch's
            remote counterpart.
          </Typography>
          <Typography variant="body2">
            After this, you can just use <code>git push</code> and{' '}
            <code>git pull</code> without specifying the branch name.
          </Typography>
        </>
      </NoteBlock>

      {/* DELETING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Deleting Branches"
        id="deleting-branches"
        subtitle="Cleaning up after merges"
      />

      <ProseBlock spacingTop>
        After your PR is merged, you'll want to clean up both local and remote
        branches.
      </ProseBlock>

      <Spacer />
      <TopicBlock
        title="Delete local branch"
        items={[
          <>
            <strong>Safe delete</strong> <Arrow /> Only deletes if fully merged
          </>,
          <>
            <strong>Force delete</strong> <Arrow /> Deletes even with unmerged
            changes
          </>,
        ]}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Safe delete (only works if branch is fully merged)
git branch -d branch-name

# Force delete (deletes even with unmerged changes)
git branch -D branch-name

# Examples
git branch -d feature/completed-feature
git branch -D feature/abandoned-experiment`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          Use <code>-d</code> for safety - git will warn you if you're deleting
          unmerged work. Use <code>-D</code> when you're absolutely sure you
          want to throw away changes.
        </Typography>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Delete remote branch"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Delete branch from remote (GitHub, GitLab, etc.)
git push origin --delete branch-name

# Example
git push origin --delete feature/old-feature`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Use with caution!</AlertTitle>
        Make sure the branch is fully merged before deleting from remote. Other
        team members might still be referencing it.
      </Alert>

      {/* SWITCHING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Creating & Switching Branches"
        id="switching-branches"
        subtitle="The modern way with git switch"
      />

      <ProseBlock spacingTop>
        <code>git switch</code> is the newer, cleaner way to change branches.
        It's more intuitive than the old <code>git checkout</code> command.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a new branch and switch to it
git switch -c new-branch-name

# Example: create feature branch from develop
git switch develop
git switch -c feature/my-awesome-feature`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -c does:</strong> The <code>-c</code> flag means
            "create". It creates a new branch from your current position and
            switches to it.
          </Typography>
          <Typography variant="body2">
            The new branch will be based on whatever branch you're currently on.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Force create (recreate existing branch)"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Force create - replaces branch if it already exists
git switch -C branch-name

# Example: reset feature branch to current position
git switch develop
git switch -C feature/start-over`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Destructive operation!</AlertTitle>
        <code>-C</code> (capital C) will <strong>replace</strong> the existing
        branch if it exists. Any commits on the old branch that aren't reachable
        elsewhere will be lost.
      </Alert>

      {/* RENAMING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Renaming Branches"
        id="renaming-branches"
        subtitle="Fixing typos or changing branch names"
      />

      <ProseBlock spacingTop>
        Made a typo in your branch name? Or want to follow a different naming
        convention? Easy fix with <code>git branch -m</code>.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Rename the current branch
git branch -m new-branch-name

# Example workflow
git checkout develop
git branch -m feature/better-name

# Or specify which branch to rename
git branch -m old-name new-name`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -m does:</strong> The <code>-m</code> flag means
            "move/rename". If you're on the branch, just give the new name.
            Otherwise, specify both old and new names.
          </Typography>
          <Typography variant="body2">
            If you've already pushed the old branch to remote, you'll need to
            delete the old remote branch and push the new one.
          </Typography>
        </>
      </NoteBlock>

      {/* GIT LOGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Viewing Git Logs"
        id="git-logs"
        subtitle="See your commit history"
      />

      <ProseBlock spacingTop>
        Checking your commit history is essential. Here's my go-to log alias and
        useful variations.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# My custom alias (add to ~/.gitconfig)
[alias]
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

# Use it
git lg -5  # Show last 5 commits with pretty formatting

# Built-in alternatives
git log --oneline -10  # Last 10 commits, one line each
git log --graph --all  # Show all branches with graph`}
      />

      <Spacer size={4} />
      <TopicBlock
        title="Useful log variations"
        items={[
          'git log --oneline → Compact one-line format',
          'git log -n 5 → Show only last 5 commits',
          'git log --graph → Visual branch graph',
          'git log --author="Your Name" → Filter by author',
          'git log --since="2 weeks ago" → Time-based filter',
        ]}
      />

      {/* COMMIT MESSAGES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Better Commit Messages"
        id="commit-messages"
        subtitle="Moving beyond WIP commits"
      />

      <ProseBlock spacingTop>
        We've all been there - quick "WIP" commits to save work. But there's a
        better way.
      </ProseBlock>

      <Spacer />
      <Alert severity="info">
        <AlertTitle>My bad habit</AlertTitle>I used to do this constantly:{' '}
        <code>git add -A && git commit -m "WIP"</code>. It saves work but makes
        terrible commit history.
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="The better way: amend commits"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Stage your changes
git add -A

# Amend the previous commit (opens editor for message)
git commit --amend

# Or amend without changing the message
git commit --amend --no-edit

# Example workflow
git add file1.js file2.js
git commit --amend  # Opens editor to write proper message`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What --amend does:</strong> Instead of creating a new
            commit, it adds your staged changes to the previous commit and lets
            you rewrite the message.
          </Typography>
          <Typography variant="body2">
            This is great for fixing typos or adding forgotten files to your
            last commit.
          </Typography>
        </>
      </NoteBlock>

      {/* INTERACTIVE REBASE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Cleaning Up Commits"
        id="interactive-rebase"
        subtitle="Squashing WIP commits before PR"
      />

      <ProseBlock spacingTop>
        Sometimes I end up with a feature branch full of "WIP" commits. Before
        pushing for a PR, I clean them up. Here's how.
      </ProseBlock>

      <Spacer />
      <Alert severity="info">
        <AlertTitle>When it's safe to rebase</AlertTitle>
        This is safe when:
        <br />• Nobody else is working on the branch
        <br />• You haven't pushed yet, or you're the only one who pushed
        <br />
        <br />
        <strong>Never rebase commits that others have based work on!</strong>
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Interactive rebase last n commits
git rebase --interactive HEAD~n
# or shorter
git rebase -i HEAD~n

# Example: clean up last 4 commits
git rebase -i HEAD~4`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What HEAD~4 means:</strong> "4 commits before HEAD (current
            position)". Count how many commits you made since branching off
            develop.
          </Typography>
          <Typography variant="body2">
            This opens your editor (nano/vim) with a list of commits you can
            modify.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="What you'll see in the editor"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`pick 531ceee Fuzzy Search for names
pick 2dac057 Fuzzy search for names  
pick 747c4a3 Slots wip

# Rebase 60f5f3d..747c4a3 onto 60f5f3d (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="How to squash commits"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer />
      <TopicBlock
        title="The process"
        items={[
          '1. Keep the first commit as "pick" (or change to "reword" if you want to rewrite the message)',
          '2. Change all following commits from "pick" to "fixup" (or just "f")',
          '3. Save and close the editor',
          '4. If you used "reword", another editor will open for the commit message',
          '5. Write your awesome new commit message and save',
        ]}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# After editing, file looks like this:
reword 531ceee Fuzzy Search for names
fixup 2dac057 Fuzzy search for names  
fixup 747c4a3 Slots wip

# Save, then write your new commit message:
# "Add fuzzy search functionality for user names
# 
# - Implemented search algorithm
# - Added UI components  
# - Wrote tests"`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>pick vs reword vs fixup vs squash:</strong>
          </Typography>
          <Typography variant="body2" component="div">
            • <code>pick</code> <Arrow /> Keep commit as-is
            <br />• <code>reword</code> <Arrow /> Keep changes, edit message
            <br />• <code>fixup</code> <Arrow /> Merge into previous, discard
            message
            <br />• <code>squash</code> <Arrow /> Merge into previous, combine
            messages
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Push after rebasing"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# After rebasing, you need to force push
git push --force
# or shorter
git push -f

# Safer option (won't overwrite if someone else pushed)
git push --force-with-lease`}
      />

      <Spacer size={4} />
      <Alert severity="error">
        <AlertTitle>Force push warning!</AlertTitle>
        Only force push to branches where you're the only one working! Force
        pushing to shared branches (like main/develop) or branches with
        collaborators will cause major problems.
        <br />
        <br />
        Use <code>--force-with-lease</code> instead of <code>--force</code> when
        possible - it's safer and won't overwrite work if someone pushed while
        you were rebasing.
      </Alert>

      {/* MERGE CONFLICTS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Resolving Merge Conflicts"
        id="merge-conflicts"
        subtitle="Handling conflicts like a pro"
      />

      <ProseBlock spacingTop>
        I honestly just use VSCode to resolve merge conflicts these days - it
        has a great visual interface. But here's the command-line way if you
        need it.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Open merge tool (the -t specifies which tool to use)
git mergetool -t opendiff

# Other popular merge tools
git mergetool -t vimdiff
git mergetool -t meld
git mergetool -t kdiff3

# See available tools
git mergetool --tool-help`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -t does:</strong> The <code>-t</code> flag specifies
            which merge tool to use. Each tool has different interfaces and
            features.
          </Typography>
          <Typography variant="body2">
            <strong>opendiff</strong> is macOS's built-in FileMerge tool. On
            other systems, you might use vimdiff, meld, or your IDE's built-in
            merge tool.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="VSCode merge conflict interface"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer />
      <TopicBlock
        title="Why I use VSCode for conflicts"
        items={[
          'Visual side-by-side diff',
          'One-click "Accept Current" or "Accept Incoming" buttons',
          'Can manually edit the result right there',
          'Shows clear markers for conflict boundaries',
          'No need to remember merge tool commands',
        ]}
      />

      {/* CLEANING UP LOCAL BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Cleaning Up Local Branches"
        id="cleanup-branches"
        subtitle="Dealing with branch clutter"
      />

      <ProseBlock spacingTop>
        If you're like me and work on a bunch of features, your local git gets
        cluttered with branches you no longer need. Here's how I mass-delete old
        branches.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Delete all local branches starting with "wip/"
git branch | grep wip/ | xargs git branch -D

# Delete all "bug/" branches
git branch | grep bug/ | xargs git branch -D

# Delete all "feature/" branches  
git branch | grep feature/ | xargs git branch -D

# Custom pattern - anything with "test"
git branch | grep test | xargs git branch -D`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>How this works:</strong>
          </Typography>
          <Typography variant="body2" component="div">
            1. <code>git branch</code> <Arrow /> List all local branches
            <br />
            2. <code>grep pattern</code> <Arrow /> Filter branches matching the
            pattern
            <br />
            3. <code>xargs git branch -D</code> <Arrow /> Pass each filtered
            branch name to force delete
          </Typography>
          <Typography variant="body2" sx={{ pt: 1 }}>
            This uses Unix pipes to chain commands together. Super powerful for
            batch operations!
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <Alert severity="warning">
        <AlertTitle>Be careful with mass delete!</AlertTitle>
        Double-check your grep pattern before running. Use{' '}
        <code>git branch | grep pattern</code> first to see what will be
        deleted, then add the <code>| xargs git branch -D</code> if it looks
        right.
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Safe cleanup: only merged branches"
        options={{ subtitleVariant: 'h6' }}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# List branches that are fully merged into current branch
git branch --merged

# Delete all fully merged branches (except current)
git branch --merged | grep -v "\\*" | xargs git branch -d

# Delete merged branches except main/develop
git branch --merged | grep -v "\\*" | grep -v "main" | grep -v "develop" | xargs git branch -d`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>This is safer:</strong> Using <code>--merged</code> only
            deletes branches that have been fully merged. No risk of losing
            work!
          </Typography>
          <Typography variant="body2">
            The <code>grep -v</code> excludes branches (the asterisk is your
            current branch, main/develop are protected).
          </Typography>
        </>
      </NoteBlock>

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer />
      <TopicBlock
        title="Branching"
        items={[
          'git switch -c name → Create and switch to new branch',
          'git branch -m new-name → Rename current branch',
          'git branch -d name → Safe delete (only if merged)',
          'git branch -D name → Force delete',
          'git push origin --delete name → Delete remote branch',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Commits"
        items={[
          'git commit --amend → Fix last commit',
          'git rebase -i HEAD~n → Clean up last n commits',
          'git push -f → Force push (use with caution!)',
          'git push --force-with-lease → Safer force push',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Cleanup"
        items={[
          'git branch --merged → List fully merged branches',
          'git branch | grep pattern | xargs git branch -D → Mass delete by pattern',
          'git remote prune origin → Clean up stale remote branches',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
