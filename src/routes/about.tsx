import CallToAction from '@/components/CallToAction';
import CodeBlock from '@/components/CodeBlock';
import DarkModeToggle from '@/components/DarkModeToggle';
import NeutralToggleButton from '@/components/NeutralToggleButton';
import ProseBlock from '@/components/ProseBlock';
import Tagline from '@/components/Tagline';
import TitleBlock from '@/components/TitleBlock';
import { PageLayout } from '@/layout';
import { mdiRocketLaunch } from '@mdi/js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
  head: () => ({
    meta: [
      {
        name: 'About',
        content: 'About Page',
      },
      {
        title: 'About',
      },
    ],
  }),
});

const codeBlock = `
def binary_search(arr, target):
  left = 0
  right = len(arr) - 1
  
  while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
      return mid
    elif arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
      
  return -1
`;

function AboutComponent() {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <PageLayout>
      <CallToAction title="Getting Started" />
      <TitleBlock subtitle="The About Page">About</TitleBlock>
      <Tagline>Tagline: Welcome to the about page!</Tagline>
      <ProseBlock
        title="Custom Title as H1"
        subtitle="Custom subtitle 1 as a paragraph"
        options={{
          titleComponent: 'h1', // Render the title as an <h1>
          titleVariant: 'h3', // Style it as an H3 for smaller text
        }}
      >
        This is the body text.
      </ProseBlock>
      <DarkModeToggle />
      <NeutralToggleButton
        icon={mdiRocketLaunch} // 🚀 MDI icon for fun
        selected={selected}
        onChange={() => setSelected((prev) => !prev)}
        value="rocket"
        sx={{ maxWidth: 40 }}
      />
      <Stack direction="row" spacing={2}>
        <CodeBlock code={codeBlock} language="python" />
        <ButtonStack />
      </Stack>
    </PageLayout>
  );
}

function ButtonStack() {
  return (
    <Stack gap={2}>
      <Button variant="contained">Primary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" sx={{ backgroundColor: 'secondary.dark' }}>
        Secondary
      </Button>
      <Button variant="outlined" color="secondary">
        Outlined Secondary
      </Button>
      <Button variant="text" color="secondary">
        Text Secondary
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="outlined" color="error">
        Outlined Error
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" size="small">
        Small
      </Button>
    </Stack>
  );
}
