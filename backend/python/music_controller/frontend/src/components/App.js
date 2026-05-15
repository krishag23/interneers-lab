import React from "react";
import { createRoot } from "react-dom/client";

import HomePage from "./HomePage";

function App() {
    return (
        <div>
            <HomePage />
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);