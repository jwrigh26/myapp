import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/git/hello-world')({
  component: GitHelloWorld,
  head: () => ({
    getTitle: () => 'Hello Git World',
    meta: [
      {
        name: 'description',
        content:
          'Introduction to Git version control fundamentals and collaborative development',
      },
      {
        title: 'Hello Git World',
      },
    ],
  }),
});

function GitHelloWorld() {
  return (
    <>
      <TitleBlock
        title="Hello Git World"
        subtitle="Beginning our journey through version control and collaborative development"
      />

      <ProseBlock>
        Welcome to the Git & Version Control section! Git is arguably one of the
        most important tools in a developer's toolkit. It's what allows us to
        track changes, collaborate with others, experiment safely, and maintain
        a complete history of our projects.
      </ProseBlock>

      <ProseBlock>
        Created by Linus Torvalds (the same person who created Linux), Git has
        become the standard for version control in software development. Whether
        you're working on open source projects, in a startup, or at a large
        corporation, Git is everywhere.
      </ProseBlock>

      <ProseBlock>What we'll explore together:</ProseBlock>

      <ProseBlock>
        • <strong>Git Fundamentals</strong> - Repositories, commits, staging,
        and basic workflow
        <br />• <strong>Branching & Merging</strong> - Feature branches, merge
        strategies, and conflict resolution
        <br />• <strong>Remote Repositories</strong> - Working with GitHub,
        GitLab, and collaborative workflows
        <br />• <strong>Advanced Git</strong> - Rebasing, cherry-picking, stash,
        and bisect
        <br />• <strong>Branching Strategies</strong> - Git Flow, GitHub Flow,
        and team workflows
        <br />• <strong>Best Practices</strong> - Commit messages, repository
        organization, and code review
        <br />• <strong>Troubleshooting</strong> - Common problems and how to
        solve them
      </ProseBlock>

      <ProseBlock>
        Each topic includes practical examples, real-world scenarios, and
        hands-on exercises. We'll start with the basics like making your first
        commit and gradually work up to complex collaborative workflows used by
        professional development teams.
      </ProseBlock>

      <ProseBlock>
        Git might seem intimidating at first, but once you understand the core
        concepts, it becomes an incredibly powerful tool that gives you
        confidence to experiment and collaborate. We'll focus on building a
        solid mental model of how Git works, not just memorizing commands.
      </ProseBlock>

      <ProseBlock>
        Remember: every expert was once a beginner who made their first commit.
        Let's start your Git journey and unlock the power of version control!
      </ProseBlock>
    </>
  );
}
