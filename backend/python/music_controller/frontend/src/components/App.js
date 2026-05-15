import React, { Component } from "react";
import { createRoot } from "react-dom/client";

export default class App extends Component {
    render() {
        return <h1>Test Code</h1>;
    }
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);