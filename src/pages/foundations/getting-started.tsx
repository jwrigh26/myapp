import CallToAction from "components/CallToAction";
import CodeBlock from "components/CodeBlock";
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
      <CodeBlock code={codeBlock} language="javascript" />
    </PageLayout>
  );
}

// Math is just the math I need to know to understand algorithms and data structures
