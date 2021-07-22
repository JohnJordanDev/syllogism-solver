/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */

const { React, ReactDOM, PropTypes } = window;

const Quality = (props) => {
	const { value, partType, changeHandler } = props;
  const isParticular = !!(partType === "I" || partType === "O");
	return (
  <>
    <label htmlFor="prop_one_quality">Quality</label>
    <select
      className=""
      required
      value={value}
      disabled={value === "none"}
      onChange={changeHandler}
      data-aspect="quality"
    >
      <option value="none" disabled hidden>are/are NOT</option>
      <option value="are">are</option>
      <option value="arenot" disabled={!isParticular}>are NOT</option>
    </select>
  </>
	);
};

Quality.propTypes = {
	value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  partType: PropTypes.string.isRequired
};

const Quantity = (props) => {
	const { value, changeHandler } = props;
	return (
  <>
    <label htmlFor="prop_one_quantity">Quantity</label>
    <select
      id="prop_one_quantity"
      name="quantity-major-premise"
      className=""
      required
      value={value}
      onChange={changeHandler}
      data-aspect="quantity"
    >
      <option value="none" disabled hidden>all/some/no</option>
      <option value="all">all</option>
      <option value="some">some</option>
      <option value="no" >no</option>
    </select>
  </>
	);
};

Quantity.propTypes = {
	value: PropTypes.string.isRequired,
	changeHandler: PropTypes.func.isRequired
};

// const UserInput = (props) => {
// 	// TODO: to pass down
// 	const { typeOfPremise } = props;
//   return (
//     <>
//       <Quantity value="none" />
//       <Quality value="none" />
//     </>
// 	);
// };

// UserInput.propTypes = {
// 	typeOfPremise: PropTypes.string.isRequired
// };

const Premise = (props) => {
  const { identity, children, type } = props;
  return (
    <fieldset className={`part-${identity}`}>
      <legend>{`${identity.toUpperCase().split("P")[0]}`}: <small>{type}</small></legend>
      <fieldset>
        <legend>Choose options:</legend>
        {children}
      </fieldset>
      <figure>
        <img alt="an empty...for now" />
        <figcaption>This will be filled...</figcaption>
      </figure>
    </fieldset>
  );
};

Premise.propTypes = {
	identity: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired
};

const Form = (props) => {
  const { children } = props;
  return (<form>{children}</form>);
};

Form.propTypes = {
	children: PropTypes.node.isRequired
};

const mapQuantityToType = {
	all: "A",
	no: "E",
	some: "I"
};

const mapTypeToQuantity = {
	A: "all",
	E: "no",
	I: "some",
  O: "some",
	none: "none"
};

const mapQualityToType = {
  are: "I",
  arenot: "O"
};

const mapTypeToQuality = {
  A: "are",
  E: "are",y
  I: "are",
  O: "arenot",
  none: "none"
};

const App = () => {
  const [typeMajor, setTypeMajor] = React.useState("none");
  const changeHandler = ({ target }) => {
    const { dataset: { aspect } } = target;
    if (aspect === "quantity") {
      setTypeMajor(mapQuantityToType[target.value]);
    } else if (aspect === "quality") {
      setTypeMajor(mapQualityToType[target.value]);
    }
  };
  React.useEffect(() => {
	// console.log(`Use Effect: Major premise is of type: ${typeMajor}`);
  });
  return (
    <>
      <Form>
        <Premise identity="majorPremise" type={typeMajor}>
          <Quantity value={mapTypeToQuantity[typeMajor]} changeHandler={changeHandler} />
          <Quality value={mapTypeToQuality[typeMajor]} partType={typeMajor} changeHandler={changeHandler} />
        </Premise>
      </Form>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react_app"));
