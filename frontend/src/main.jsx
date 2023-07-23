import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ModeProvider } from "./context/mode-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ModeProvider>
      <App />
    </ModeProvider>
  </BrowserRouter>
);
