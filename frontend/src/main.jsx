import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "bottom-right",
          containerStyle: {
            padding: "10px"
          }
        }
      }}
    >
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </StrictMode>
);
