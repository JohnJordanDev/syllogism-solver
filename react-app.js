/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
// import Form from "./Form.js";

const { React, ReactDOM, PropTypes } = window;

const Quality = (props) => {
	const { value } = props;
	return (
  <>
    <label htmlFor="prop_one_quality">Quality</label>
    <select id="prop_one_quality" className="" required value={value}>
      <option value="none" disabled hidden>are/are NOT</option>
      <option value="are">are</option>
      <option value="arenot">are NOT</option>
    </select>
  </>
	);
};

Quality.propTypes = {
	value: PropTypes.string.isRequired
};

const Quantity = (props) => {
	const { value } = props;
	return (
  <>
    <label htmlFor="prop_one_quantity">Quantity</label>
    <select
      id="prop_one_quantity"
      className=""
      required
      value={value}
    >
      <option value="none" disabled hidden>all/some/no</option>
      <option value="all">all</option>
      <option value="some">some</option>
      <option value="no">no</option>
    </select>
  </>
	);
};

Quantity.propTypes = {
	value: PropTypes.string.isRequired
};

const UserInput = (props) => {
	// TODO: to pass down
	const { typeOfPremise } = props;
  return (
    <>
      <Quantity value="none" />
      <Quality value="none" />
    </>
	);
};

UserInput.propTypes = {
	typeOfPremise: PropTypes.string.isRequired
};

const Premise = (props) => {
  const { identity } = props;
  return (
    <fieldset className={`part-${identity}`}>
      <legend>{`${identity.toUpperCase().split("P")[0]}`}</legend>
      <fieldset>
        <legend>Choose options:</legend>
        <UserInput />
      </fieldset>
      <figure>
        <img alt="an empty image...for now" />
        <figcaption>This will be filled...</figcaption>
      </figure>
    </fieldset>
  );
};

Premise.propTypes = {
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
        <Premise identity="majorPremise" />
      </Form>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react_app"));
