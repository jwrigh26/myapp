import { ArticleLayout } from '@/components/blog';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/soft-skills/learn-names')({
  component: LearnNamesPost,
  head: () => ({
    getTitle: () => 'Learn Names',
    meta: [
      {
        name: 'description',
        content: 'Why remembering names is important',
      },
      {
        title: 'Learn Names',
      },
    ],
  }),
});

function LearnNamesPost() {
  return (
    <ArticleLayout
      title="Learn Names: The Foundation of Human Connection at Work"
      date="2025-07-21"
      readTime="5 min read"
    >
      <p className="lead">
        In a world of Slack handles, GitHub usernames, and video call avatars,
        learning and using people's actual names has become a superpower. It's
        the simplest yet most overlooked soft skill that can transform your
        relationships at work.
      </p>

      <h2>Why Names Matter More Than You Think</h2>

      <p>
        Dale Carnegie said it best: "A person's name is to that person the
        sweetest and most important sound in any language." In software
        engineering, where we often hide behind screen names and focus on code
        more than people, using someone's real name creates an instant human
        connection.
      </p>

      <p>
        When you address a colleague by name in a code review, meeting, or Slack
        message, you're doing something profound: you're acknowledging them as a
        person, not just another developer. This simple act:
      </p>

      <ul>
        <li>Makes people feel valued and seen</li>
        <li>Increases trust and rapport</li>
        <li>Improves team collaboration</li>
        <li>Makes you more memorable and likeable</li>
        <li>Sets you apart as someone who cares about people</li>
      </ul>

      <h2>The Challenge for Engineers</h2>

      <p>
        Let's be honest: many of us got into software engineering because we
        love logic, systems, and solving problems. People skills might not come
        as naturally. But here's the thing—remembering names is actually a
        system you can optimize.
      </p>

      <blockquote>
        <p>
          "I used to think I was 'bad with names' until I realized I was just
          bad at prioritizing them. Once I treated name learning like debugging
          a problem, everything changed."
        </p>
      </blockquote>

      <h2>Practical Strategies That Actually Work</h2>

      <h3>1. The Repeat and Connect Method</h3>
      <p>
        When someone introduces themselves, immediately repeat their name back:
        "Nice to meet you, Sarah." Then create a mental connection—maybe Sarah
        works on the authentication service, or she mentioned she's from
        Seattle.
      </p>

      <h3>2. Use It or Lose It</h3>
      <p>
        Research shows you need to use a name within the first few minutes of
        learning it, then again within 24 hours. In your next interaction,
        purposefully use their name: "Sarah, what's your take on the API
        design?"
      </p>

      <h3>3. The LinkedIn Lookup</h3>
      <p>
        After meeting someone new, look them up on LinkedIn or your company
        directory. Seeing their photo and reading their background helps cement
        the name-face connection.
      </p>

      <h3>4. Note-Taking System</h3>
      <p>
        Keep a simple note in your phone or notebook with new names and context.
        For remote teams, add notes to their Slack profile or create a personal
        contact card.
      </p>

      <h2>Remote Work Makes It Harder (But More Important)</h2>

      <p>
        In remote and hybrid environments, name usage becomes even more
        critical. You don't have the luxury of casual hallway conversations to
        build relationships. When you start a video call with "Good morning,
        Alex and Maria" instead of just "Hey everyone," you immediately create a
        warmer, more personal atmosphere.
      </p>

      <h2>Beyond Just Remembering</h2>

      <p>
        Learning names is just the beginning. Pay attention to pronunciation—
        ask if you're unsure and make the effort to get it right. Notice if
        someone prefers a nickname or formal name. These details show you care
        about how people want to be addressed.
      </p>

      <h2>The Compound Effect</h2>

      <p>
        Like compound interest, the benefits of learning names grow over time.
        That junior developer whose name you learned on day one might become
        your project partner next year. The QA engineer you greet by name might
        be more thorough when testing your features. The product manager who
        feels valued might give you more context on requirements.
      </p>

      <h2>Start Today</h2>

      <p>
        Pick one person you interact with regularly but whose name you're not
        confident about. Make it your goal this week to learn it and use it
        naturally in conversation. Notice how the dynamic changes.
      </p>

      <p>
        In an industry obsessed with technical skills, mastering this
        fundamental human skill will set you apart. Your code might be
        brilliant, but people will remember how you made them feel. And it all
        starts with something as simple as saying their name.
      </p>

      <hr />

      <p className="text-sm text-gray-600 dark:text-gray-400">
        <em>
          What's your strategy for remembering names? Have you noticed how using
          names changes workplace interactions? Share your thoughts and
          experiences.
        </em>
      </p>
    </ArticleLayout>
  );
}
