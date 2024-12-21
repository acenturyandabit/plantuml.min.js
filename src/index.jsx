import React from "react";
import { createRoot } from "react-dom/client";
import { makePlantuml } from "./plantuml";
const App = () => {
  const [pngSrc, setPngSrc] = React.useState("");
  const [svgSrc, setSvgSrc] = React.useState("");
  const [textToRender, setTextToRender] = React.useState(
    "component helloWorld"
  );
  const rendererRef = React.useRef();
  const [rendererReadyState, setRendererReadyState] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      rendererRef.current = await makePlantuml();
      setRendererReadyState(true);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (rendererRef.current) {
        setPngSrc(await rendererRef.current.renderPng(textToRender));
        setSvgSrc(await rendererRef.current.renderSvg(textToRender));
      }
    })();
  }, [textToRender, rendererReadyState]);
  return (
    <>
      <h1>Welcome to React Vite Micro App!</h1>
      <textarea
        value={textToRender}
        onChange={(e) => setTextToRender(e.target.value)}
      ></textarea>
      <p>Hard to get more minimal than this React app.</p>
      <img src={pngSrc}></img>
      <svg dangerouslySetInnerHTML={{ __html: svgSrc }}></svg>
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);
