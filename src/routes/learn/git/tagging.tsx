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

export const Route = createFileRoute('/learn/git/tagging')({
  component: Tagging,
  head: () => ({
    getTitle: () => 'Git Tagging',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content:
          'Learn how to use Git tags to mark releases, versions, and important points in your repository history',
      },
      {
        title: 'Git Tagging: Releases & Versions',
      },
    ],
  }),
});

const sectionSpaceSize = 16;
const blockSpaceSize = 8;

function Tagging() {
  return (
    <PageLayout>
      <TitleBlock
        title="Git Tagging: Releases & Versions"
        subtitle="Marking important milestones in your code"
      />

      <IntroBlock>
        Git tags are like bookmarks for specific points in your repository's
        history. They're typically used to mark release versions (v1.0, v2.0) or
        important milestones. Unlike branches, tags don't move - they permanently
        point to a specific commit.
      </IntroBlock>

      {/* WHAT ARE TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="What Are Tags?"
        id="what-are-tags"
        subtitle="Understanding the basics"
      />

      <ProseBlock spacingTop>
        Tags are references to specific commits in your Git history. Think of them
        as permanent labels that never change, unlike branch names which move as
        you make new commits.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="Common uses for tags"
        items={[
          'Marking release versions (v1.0.0, v2.1.3)',
          'Documenting important milestones',
          'Creating stable reference points',
          'Triggering CI/CD deployments',
          'Making it easy to checkout specific versions',
        ]}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          There are two types of tags: <strong>lightweight</strong> (just a name
          pointing to a commit) and <strong>annotated</strong> (includes metadata
          like author, date, and message). For releases, annotated tags are
          recommended.
        </Typography>
      </NoteBlock>

      {/* CREATING LIGHTWEIGHT TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Creating Lightweight Tags"
        id="lightweight-tags"
        subtitle="Simple version markers"
      />

      <ProseBlock spacingTop>
        Lightweight tags are the simplest form - just a name pointing to a commit.
        They're quick to create and perfect for temporary or personal markers.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create a tag at the current commit
git tag 0.0.9

# Create a tag at a specific commit
git tag 0.0.9 abc1234

# Example with full commit hash
git tag v1.0.0 3d8f5a2b1c9e7f4a6b8d1e2f3a4b5c6d7e8f9a0b`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>How Git knows it's a tag:</strong> When you push, Git
            distinguishes tags from branches based on internal references. Tags
            are stored separately from branch names.
          </Typography>
          <Typography variant="body2">
            If you don't specify a commit hash, the tag is created at your current
            HEAD position.
          </Typography>
        </>
      </NoteBlock>

      {/* CREATING ANNOTATED TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Creating Annotated Tags"
        id="annotated-tags"
        subtitle="Recommended for releases"
      />

      <ProseBlock spacingTop>
        Annotated tags include extra information: who created the tag, when it was
        created, and a message describing the release. This is the recommended
        approach for production releases.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Create an annotated tag with a message
git tag -a v1.0.0 -m "Release version 1.0.0"

# Create an annotated tag and open editor for message
git tag -a v2.0.0

# Tag a specific commit with annotation
git tag -a v1.5.0 abc1234 -m "Patch release for bug fixes"`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What -a and -m do:</strong> The <code>-a</code> flag creates
            an "annotated" tag. The <code>-m</code> flag adds a message (like
            commit messages).
          </Typography>
          <Typography variant="body2">
            Without <code>-m</code>, Git will open your default editor to write a
            tag message.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <Alert severity="info">
        <AlertTitle>Best practice for releases</AlertTitle>
        Always use annotated tags (<code>-a</code>) for official releases. They
        include metadata that's valuable for tracking who released what and when.
        Lightweight tags are fine for temporary or personal use.
      </Alert>

      {/* LISTING TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Listing and Viewing Tags"
        id="listing-tags"
        subtitle="See what tags exist"
      />

      <ProseBlock spacingTop>
        There are several ways to see what tags exist in your repository.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# List all tags
git tag

# List all tags with pattern matching
git tag -l "v1.*"

# Show all tags with their commit references
git show-ref --tags

# View tag details (for annotated tags)
git show v1.0.0`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>What show-ref --tags does:</strong> It verifies and lists all
            tags with their full commit hashes. The name "show-ref" means "show
            references" - tags are a type of Git reference.
          </Typography>
          <Typography variant="body2">
            For annotated tags, <code>git show</code> displays the tag metadata
            and the commit information.
          </Typography>
        </>
      </NoteBlock>

      {/* PUSHING TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Pushing Tags to Remote"
        id="pushing-tags"
        subtitle="Sharing your releases"
      />

      <ProseBlock spacingTop>
        By default, <code>git push</code> doesn't push tags. You need to
        explicitly push them to share with your team or trigger deployments.
      </ProseBlock>

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Push a specific tag
git push origin v1.0.0

# Push all tags at once
git push origin --tags

# Push all tags (alternative syntax)
git push --tags`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>How Git knows it's a tag:</strong> When you run{' '}
            <code>git push origin v1.0.0</code>, Git checks if "v1.0.0" is a
            branch or a tag and pushes accordingly.
          </Typography>
          <Typography variant="body2">
            Use <code>--tags</code> to push all local tags that don't exist on the
            remote yet.
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <Alert severity="info">
        <AlertTitle>CI/CD tip</AlertTitle>
        Many CI/CD systems (GitHub Actions, GitLab CI, etc.) watch for tag pushes
        to trigger release deployments. Pushing <code>v1.0.0</code> might
        automatically deploy to production!
      </Alert>

      {/* DELETING TAGS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Deleting Tags"
        id="deleting-tags"
        subtitle="Fixing mistakes"
      />

      <ProseBlock spacingTop>
        Made a mistake? Tagged the wrong commit? You can delete tags both locally
        and remotely.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Delete local tag" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Delete a tag locally
git tag -d v1.0.0

# Example: remove incorrect version tag
git tag -d v0.0.9`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          <strong>What -d does:</strong> The <code>-d</code> flag means "delete".
          This only removes the tag from your local repository.
        </Typography>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Delete remote tag" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Delete a tag from remote (careful!)
git push --delete origin v1.0.0

# Alternative syntax (older Git versions)
git push origin :refs/tags/v1.0.0`}
      />

      <Spacer size={4} />
      <Alert severity="warning">
        <AlertTitle>Be very careful!</AlertTitle>
        Deleting remote tags can break deployments and confuse team members.
        Only delete remote tags if:
        <br />• The tag was just created and no one has pulled it yet
        <br />• You're fixing a critical mistake
        <br />• You've communicated with your team
      </Alert>

      {/* COMMON WORKFLOWS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Common Tagging Workflows"
        id="workflows"
      />

      <ProseBlock spacingTop>
        Here are typical workflows for using tags in real projects.
      </ProseBlock>

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Release workflow" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# 1. Make sure you're on main/master
git switch main

# 2. Pull latest changes
git pull

# 3. Create annotated tag for release
git tag -a v1.2.0 -m "Release v1.2.0: New features and bug fixes"

# 4. Push the tag to remote
git push origin v1.2.0

# 5. (Optional) Create GitHub/GitLab release from the tag`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Fix incorrect tag" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# 1. Delete the incorrect local tag
git tag -d v1.0.0

# 2. Delete the incorrect remote tag
git push --delete origin v1.0.0

# 3. Create the correct tag
git tag -a v1.0.0 correct-hash -m "Release v1.0.0"

# 4. Push the corrected tag
git push origin v1.0.0`}
      />

      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock subtitle="Checkout a specific version" options={{ subtitleVariant: 'h6' }} />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Checkout code at a specific tag (detached HEAD)
git checkout v1.0.0

# Create a branch from a tag
git switch -c hotfix-v1.0 v1.0.0`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          Checking out a tag puts you in "detached HEAD" state - you're viewing
          history, not on a branch. Create a new branch if you want to make
          changes from that point.
        </Typography>
      </NoteBlock>

      {/* SEMANTIC VERSIONING */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Semantic Versioning"
        id="semver"
        subtitle="Naming your tags"
      />

      <ProseBlock spacingTop>
        Most projects use Semantic Versioning (SemVer) for tag names. The format
        is <code>MAJOR.MINOR.PATCH</code>.
      </ProseBlock>

      <Spacer size={4} />
      <TopicBlock
        title="Version number meanings"
        items={[
          <>
            <strong>MAJOR</strong> <Arrow /> Breaking changes (v1.0.0 {'->'}{' '}
            v2.0.0)
          </>,
          <>
            <strong>MINOR</strong> <Arrow /> New features, backwards compatible
            (v1.0.0 {'->'}
            v1.1.0)
          </>,
          <>
            <strong>PATCH</strong> <Arrow /> Bug fixes, backwards compatible
            (v1.0.0 {'->'}
            v1.0.1)
          </>,
        ]}
      />

      <Spacer size={4} />
      <CodeBlock
        border
        language="python"
        code={`# Examples of semantic versioning
git tag -a v1.0.0 -m "Initial release"
git tag -a v1.1.0 -m "Added new authentication feature"
git tag -a v1.1.1 -m "Fixed authentication bug"
git tag -a v2.0.0 -m "Breaking: New API structure"`}
      />

      <Spacer size={4} />
      <NoteBlock>
        <Typography variant="body2">
          The "v" prefix is common but optional. Some projects use{' '}
          <code>v1.0.0</code>, others just <code>1.0.0</code>. Be consistent
          within your project!
        </Typography>
      </NoteBlock>

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock anchor title="Quick Reference" id="quick-reference" />

      <Spacer size={4} />
      <TopicBlock
        title="Creating tags"
        items={[
          'git tag v1.0.0 → Create lightweight tag',
          'git tag -a v1.0.0 -m "message" → Create annotated tag (recommended)',
          'git tag v1.0.0 abc1234 → Tag specific commit',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Viewing tags"
        items={[
          'git tag → List all tags',
          'git show-ref --tags → List tags with commit hashes',
          'git show v1.0.0 → View tag details',
          'git tag -l "v1.*" → List tags matching pattern',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Sharing tags"
        items={[
          'git push origin v1.0.0 → Push specific tag',
          'git push --tags → Push all tags',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Deleting tags"
        items={[
          'git tag -d v1.0.0 → Delete local tag',
          'git push --delete origin v1.0.0 → Delete remote tag (careful!)',
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
