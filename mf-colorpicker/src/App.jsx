import { createRoot } from "react-dom/client";
import ColorPicker from "./components/ColorPicker";

import "./index.css";

const App = () => (
  <div className="container">
    <ColorPicker/>
  </div>
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
