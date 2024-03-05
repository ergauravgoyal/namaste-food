import React from "react";
import ReactDOM from "react-dom/client";
/**
 * const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child", key: "child1" }, [
    React.createElement("h1", { key: "h1" }, "I am h1 tag"),
    React.createElement("h2", { key: "h2" }, "By Gaurav Goyal"),
  ]),
  React.createElement("div", { id: "child2", key: "child2" }, [
    React.createElement("h1", { key: "h1" }, "I am h1 tag"),
    React.createElement("h2", { key: "h2" }, "I am h2 tag"),
  ]),
]);

const heading = React.createElement(
  "h1",
  { id: "header" },
  "Hello World from React" 
);
console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root")); // Have created a root for our React Library
root.render(parent);
 */

// JSX => HTML Like syntax
// JSX => Babel transpiles it to React.createElement => Object => HTMLElement(render)
// React.createElement creates an object, when we render this element on DOM, it becomes HTML Element
// JSX (transpiled before it reaches to JS) - PARCEL - Babel
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀 "
);

//jsx - is not HTML in JS but it is HTML Like Syntax
const jsxHeading = <h1>Namaste React using JSX 🚀 </h1>;

const Title = () => <h1 className="head">Namaste React using JSX🚀</h1>;

//Component composition - Composite 2 components into one another
const HeadingComponent = () => (
  <div id="container">
    {/* <Title/> */}
    {Title()}
    <h1 className="heading">Namaste React using Functional Component</h1>
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
