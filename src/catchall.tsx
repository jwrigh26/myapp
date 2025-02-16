import { mdiAbTesting } from "@mdi/js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Icon from "components/Icon";
import PageLayout from "layouts/PageLayout";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./catchall.css";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <PageLayout>
      <Box>
        <div>
          <Link href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </Link>
          <Link href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
        </div>
        <Typography variant="h1">Vite + React</Typography>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <Typography component="p" variant="body1">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Typography>
        </div>
        <Typography component="p" variant="body1">
          Icon
        </Typography>
        <Icon color="primary" path={mdiAbTesting} fontSize="large" />
        <Typography component="p" variant="body1" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Stack gap={2}>
          <Button variant="text">Text</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
          <Box sx={{ backgroundColor: "secondary.light", p: 2 }}>
            <Typography variant="subtitle1">Secondary Light</Typography>
          </Box>
          <Box sx={{ backgroundColor: "secondary.main", p: 2 }}>
            <Typography variant="subtitle1">Secondary main</Typography>
          </Box>
          <Box sx={{ backgroundColor: "secondary.dark", p: 2 }}>
            <Typography variant="subtitle1">Secondary dark</Typography>
          </Box>
          <Box sx={{ backgroundColor: "primary.light", p: 2 }}>
            <Typography variant="subtitle1">Primary Light</Typography>
          </Box>
          <Box sx={{ backgroundColor: "primary.main", p: 2 }}>
            <Typography variant="subtitle1">Primary main</Typography>
          </Box>
          <Box sx={{ backgroundColor: "primary.dark", p: 2 }}>
            <Typography variant="subtitle1">Primary dark</Typography>
          </Box>
        </Stack>

        {Array.from({ length: 10 }).map((_, i) => (
          <Typography component="p" variant="body1" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
            cursus ante dapibus diam.
          </Typography>
        ))}
      </Box>
    </PageLayout>
  );
}

export default function Component() {
  return <App />;
}
