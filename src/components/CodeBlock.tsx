import { useTheme } from "@mui/material/styles";
import { Highlight, themes } from "prism-react-renderer";
import React from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const theme = useTheme();
  const overrideStyles: React.CSSProperties = {
    margin: 0,
    padding: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadius,
    overflowX: "auto", // Optional: Prevent horizontal overflow
  };

  return (
    <Highlight theme={themes.vsLight} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, ...overrideStyles }}>
          {tokens.map((line, index) => {
            return (
              <div key={index + 1} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => {
                  return (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  );
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
