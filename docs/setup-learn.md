<problem>
We need to create a new section that mirrors behavior like "blog" route. Meaning we want our new "learn" section have have a learn drawer that has sections for "DSA" and "Math" and "AI".
These sections behave just like blog's "react" and "soft-skills" etc. We will have a learn page that introduces what the learn section is about. I'm not sure how to word it, but just a section of all things I am learning and if you (the reader of my site) want to learn those things as well feel free to puruse and educate yourself too.
</probelm>

<critical-thinking>
To get this right you must analyze the context I have provided and make "learn" code resemble and follow same patterns as "blog". Please take time to fully drill-down and understand all the components in blog found in src/features, src/components, src/routes, etc. For layout we will stick to using the src/layout/PageLayout.tsx and don't need a custom layout like Blog-Layout.tsx.
Just put simple place holder text in for now for page content. Make sure routes for navigation and Navigation drawer as well as learn drawer function just like Blog drawer does.
Please be aware of how imports work. Meaning we have this in our tsconfig.json:
```
"paths": {
      "@/*": ["src/*"]
    }
```

Please follow exact patterns you see for route createFileRoute. 
</ctirital-thinking>

<key-points>
- Already have a route learn dir: src/routes/learn
- Need to update NavigationDrawer
- Need to take files in feature/learn and modify them for "learn" right now I just copied exact files from blog for context.
- Need to ensure routes work
- Need to make subsections for "Math", "DSA", and "AI".
- Need a hellow world page for each subsection. Follow page structure for now like you see in "soft-skills" or "react" from blog.
</key-points>

<task>
Setup and make the learn route with a working learn drawer for sub pages that mirrors how the blog route behaves and works.
</task>