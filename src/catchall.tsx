import { mdiAbTesting } from "@mdi/js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Icon from "components/Icon";
import IndexLayout from "layouts/IndexLayout";
import PageLayout from "layouts/PageLayout";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./catchall.css";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <IndexLayout>
      <PageLayout>
        <Box>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <Typography variant="h1">Vite + React</Typography>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p>Icon</p>
          <Icon color="primary" path={mdiAbTesting} fontSize="large" />
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          <Stack gap={2}>
            <Button variant="text">Text</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="contained">Contained</Button>
          </Stack>

          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Integer nec odio.
              Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
              libero. Sed cursus ante dapibus diam.
            </p>
          ))}
        </Box>
      </PageLayout>
    </IndexLayout>
  );
}

export default function Component() {
  return <App />;
}
