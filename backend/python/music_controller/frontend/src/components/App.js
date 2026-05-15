import React from "react";
import { createRoot } from "react-dom/client";

import "../../static/css/index.css";

import HomePage from "./HomePage";

function App() {
    return (
        <div className="center">
            <HomePage />
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);