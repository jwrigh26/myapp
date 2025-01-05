import Box from "@mui/material/Box";
import CallToAction from "components/CallToAction";
import CodeBlock from "components/CodeBlock";
import ProseBlock from "components/ProseBlock";
import Tagline from "components/Tagline";
import PageLayout from "layouts/PageLayout";

const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};
`;

export default function Foundations() {
  const callToAction = () => {
    console.log("Call to action");
  };
  return (
    <PageLayout>
      <CallToAction
        title="Getting Started"
        buttonText="Start"
        onClick={callToAction}
      />
      <Tagline text="Math is just the math I need to know to understand algorithms and data structures" />
      <ProseBlock
        title="Custom Title as H1"
        subtitle="Custom subtitle 1 as a paragraph"
        options={{
          titleComponent: "h1", // Render the title as an <h1>
          titleVariant: "h3", // Style it as an H3 for smaller text
        }}
      >
        This is the body text.
      </ProseBlock>
      <Box>
        <ProseBlock
          title="Custom Title as H2"
          subtitle="Custom subtitle 2 as a paragraph"
          options={{
            titleComponent: "h2", // Render the title as an <h1>
            titleVariant: "h4", // Style it as an H3 for smaller text
            subtitleVariant: "subtitle2",
          }}
        >
          This is the body for another body of another text.
        </ProseBlock>
        <ProseBlock dense>This is a random piece of text</ProseBlock>
        <ProseBlock dense>
          Math is just the math I need to know to understand algorithms and data
          structures
        </ProseBlock>
        <ProseBlock dense>This is a random piece of text</ProseBlock>
      </Box>

      <CodeBlock code={codeBlock} language="javascript" />
    </PageLayout>
  );
}

// Math is just the math I need to know to understand algorithms and data structures
