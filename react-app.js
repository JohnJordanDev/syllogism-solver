/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
// import Form from "./Form.js";

const { React, ReactDOM, PropTypes } = window;

const Part = (props) => {
  const { identity } = props;
  return (
    <fieldset className={`part-${identity}`} />
  );
};

Part.propTypes = {
	identity: PropTypes.string.isRequired
};

const Form = (props) => {
  const { children } = props;
  return (<form>{children}</form>);
};

Form.propTypes = {
	children: PropTypes.node.isRequired
};

const App = () => {
  const foo = "bar";
  return (
    <>
      Hello, world{foo}!
      <Form>
        <Part identity="majorPremise" />
      </Form>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react_app"));
