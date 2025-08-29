import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box } from "@mui/material";
import { useFontSizeStore } from "../../store";

export default function MarkdownRender({ children }) {
  const fontSize = useFontSizeStore((state) => state.fontSize);
  return (
    <Box sx={{ fontSize: `${fontSize}rem` }}>
      <Markdown
        children={children}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dark}
                customStyle={{
                  fontSize: "1em",
                }}
              />
            ) : (
              <code {...rest} className={className} style={{ fontSize: "1em" }}>
                {children}
              </code>
            );
          },
        }}
      />
    </Box>
  );
}
