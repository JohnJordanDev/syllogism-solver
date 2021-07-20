/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import Form from "./Form.js";

const { React, ReactDOM } = window;

// const Form = () => {
//   const myName = "John";
//   return (<form>My name is {myName}</form>);
// };

const App = () => {
  const foo = "bar";
  return (
    <h1>
      Hello, world{foo}!
      <Form />
    </h1>

  );
};
ReactDOM.render(<App />, document.getElementById("react_app"));
