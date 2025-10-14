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

export const Route = createFileRoute('/learn/git/branching')({
  component: Branching,
  head: () => ({
    getTitle: () => 'Git Branching',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content:
          'Understanding the evolution from git checkout to git switch for modern branching workflows',
      },
      {
        title: 'Git Branching: Old vs New',
      },
    ],
  }),
});

const sectionSpaceSize = 16;
const blockSpaceSize = 8;

function Branching() {
  return (
    <PageLayout>
      <TitleBlock
        title="Git Branching: Old vs New"
        subtitle="From git checkout to git switch"
      />

      <IntroBlock>
        Git branching has gotten simpler! In 2019, Git introduced{' '}
        <code>git switch</code> and <code>git restore</code> to split the
        overloaded <code>git checkout</code> command into clearer, more intuitive
        commands. Let's explore both approaches.
      </IntroBlock>

      {/* WHY THE CHANGE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Why Git Switch Exists"
        id="why-switch"
        subtitle="The problem with git checkout"
      />

      <ProseBlock spacingTop>
        <code>git checkout</code> did too many things: switch branches, create
        branches, restore files, and more. This confused people, especially
        beginners.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="What git checkout did (too much!)"
        items={[
          'Switch to a different branch',
          'Create and switch to a new branch',
          'Restore files from a commit',
          'Checkout specific commits (detached HEAD)',
          'Update working directory files',
        ]}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          The Git team split these responsibilities into two focused commands:{' '}
          <code>git switch</code> for branches and <code>git restore</code> for
          files. This guide focuses on branching with <code>git switch</code>.
        </Typography>
      </NoteBlock>

      {/* SWITCHING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Switching to an Existing Branch"
        id="switching-existing"
        subtitle="The most common operation"
      />

      <ProseBlock spacingTop>
        Let's start with the most basic operation: switching to a branch that
        already exists.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The old way: git checkout" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Switch to an existing branch
git checkout develop
git checkout main
git checkout feature/user-auth`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The new way: git switch" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Switch to an existing branch
git switch develop
git switch main
git switch feature/user-auth`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          For simple branch switching, the commands look almost identical! The
          difference is that <code>git switch</code> is safer - it won't
          accidentally restore files or do unexpected things.
        </Typography>
      </NoteBlock>

      {/* CREATE AND SWITCH */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Create and Switch to a New Branch"
        id="create-and-switch"
        subtitle="Starting a new feature or bugfix"
      />

      <ProseBlock spacingTop>
        This is where you'll really appreciate the clearer syntax of{' '}
        <code>git switch</code>.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The old way: git checkout -b" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a new branch and switch to it
git checkout -b feature/new-feature

# From a specific branch (must checkout first)
git checkout develop
git checkout -b feature/from-develop`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -b does:</strong> The <code>-b</code> flag tells
            checkout to "create a branch" and switch to it.
          </Typography>
          <Typography variant="body2">
            This syntax works but isn't immediately obvious to newcomers.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The new way: git switch -c" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a new branch and switch to it
git switch -c feature/new-feature

# From a specific branch (more explicit)
git switch develop
git switch -c feature/from-develop`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -c does:</strong> The <code>-c</code> flag means
            "create". Much more intuitive than <code>-b</code>!
          </Typography>
          <Typography variant="body2">
            The new branch will be created from wherever you currently are.
          </Typography>
        </>
      </NoteBlock>

      {/* FORCE CREATE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Force Create a Branch"
        id="force-create"
        subtitle="Recreating or resetting branches"
      />

      <ProseBlock spacingTop>
        Sometimes you want to reset a branch to start fresh. Both approaches
        support this, but the syntax differs.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The old way: git checkout -B" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Force create - replaces branch if it exists
git checkout -B feature/restart

# Common use case: reset feature branch to develop
git checkout develop
git checkout -B feature/my-feature`}
      />

      <Spacer size={4} />
      <Alert severity="info">
        <AlertTitle>Capital B for force</AlertTitle>
        <code>-B</code> (capital B) will replace the branch if it already exists.{' '}
        <code>-b</code> (lowercase) will error if the branch exists.
      </Alert>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="The new way: git switch -C" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Force create - replaces branch if it exists
git switch -C feature/restart

# Common use case: reset feature branch to develop
git switch develop
git switch -C feature/my-feature`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Destructive operation!</AlertTitle>
        Both <code>-B</code> and <code>-C</code> will replace an existing branch.
        Any commits on the old branch that aren't saved elsewhere will be lost!
      </Alert>

      {/* RENAMING BRANCHES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Renaming Branches"
        id="renaming"
        subtitle="This hasn't changed"
      />

      <ProseBlock spacingTop>
        Good news: renaming branches works the same regardless of whether you use{' '}
        <code>git checkout</code> or <code>git switch</code>. It's always been a
        separate command.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Rename the current branch
git branch -m new-name

# Rename a specific branch
git branch -m old-name new-name

# Example: fix a typo
git branch -m feature/usre-auth feature/user-auth`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -m does:</strong> The <code>-m</code> flag means "move"
            (or rename).
          </Typography>
          <Typography variant="body2">
            This command works exactly the same in both old and new workflows.
          </Typography>
        </>
      </NoteBlock>

      {/* SIDE BY SIDE COMPARISON */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Side-by-Side Comparison"
        id="comparison"
      />

      <Spacer size={4} />
      <TopicBlock
        title="Old: git checkout"
        items={[
          'git checkout branch → Switch to branch',
          'git checkout -b name → Create and switch',
          'git checkout -B name → Force create and switch',
          'git checkout file → Restore a file (confusing!)',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="New: git switch"
        items={[
          'git switch branch → Switch to branch',
          'git switch -c name → Create and switch',
          'git switch -C name → Force create and switch',
          'git restore file → Restore a file (separate command!)',
        ]}
      />

      {/* MIGRATION TIPS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Making the Switch"
        id="migration-tips"
        subtitle="Tips for transitioning"
      />

      <ProseBlock spacingTop>
        If you've been using <code>git checkout</code> for years, here's how to
        transition smoothly.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="Mental model changes"
        items={[
          <>
            <code>-b</code> <Arrow /> <code>-c</code> for "create"
          </>,
          <>
            <code>-B</code> <Arrow /> <code>-C</code> for "create or reset"
          </>,
          <>
            Restoring files <Arrow /> Use <code>git restore</code> instead
          </>,
          <>
            Both commands work <Arrow /> Use whichever you prefer!
          </>,
        ]}
      />

      <Spacer size={4} />
      <Alert severity="info">
        <AlertTitle>Both work fine!</AlertTitle>
        <code>git checkout</code> isn't deprecated. You can use it or{' '}
        <code>git switch</code> - they both work. But <code>git switch</code> is
        clearer and less error-prone.
      </Alert>

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer size={4} />
      <TopicBlock
        title="Git Switch (Recommended)"
        items={[
          'git switch branch → Switch to existing branch',
          'git switch -c name → Create and switch to new branch',
          'git switch -C name → Force create/reset and switch',
          'git switch - → Switch to previous branch',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Git Checkout (Still works)"
        items={[
          'git checkout branch → Switch to existing branch',
          'git checkout -b name → Create and switch to new branch',
          'git checkout -B name → Force create/reset and switch',
          'git checkout - → Switch to previous branch',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Branch Management (Works with both)"
        items={[
          'git branch -m new-name → Rename current branch',
          'git branch -m old new → Rename any branch',
          'git branch -d name → Safe delete (only if merged)',
          'git branch -D name → Force delete',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
