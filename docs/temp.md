<problem>
We're currently making steps for our loop for the binary search using transition point.
Step 0 and Step 1 I'm pretty happy with how things are woreded and displayed.
But JSX components are becoming hard to manage. I want consistency and to be able to quickly follow patterns for each loop step.

Again step 0 and step 1 have the right layout and flow, but JSX is just becoming hard to manage.
</problem>

<task>
Examine each JSX component being used in step 0 and 1.
Find ways to build components to simplify layout and organization wihtout breaking styles or removing content.
Do not add additional content without asking. 

Please examine how we use the InvariantGrid especially and see how to make things more DRY ( dont' repeat yourself ).
</tasxk>

<acceptance-criteria>
Step 0 and Step 1 should display exaxctly how they are.
Each step should follow similiar layout and pattern using resuable components that aren't to ridgid in naming or structure.
The idea is we can use them in other DSA learning pages that have loops.
</accpetance-criteria>

<bonus>
It would be nice to have each invariant row have an optional sub row that allows for a caption or text to provide a note or clarification with what is happeiing in the invariant expression.
</bonus>
