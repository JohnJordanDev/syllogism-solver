/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */

const { React, ReactDOM, PropTypes } = window;

// TODO: const for qualPartNeg='are NOT'
// would NOT need formatting, and would work fine once centralized

const Quality = (props) => {
	const { value, partType, selectOptions, changeHandler } = props;
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
      <option value={selectOptions.qAff}>{selectOptions.qAff}</option>
      <option value={selectOptions.qNeg} disabled={!isParticular}>{selectOptions.qNeg}</option>
    </select>
  </>
	);
};

Quality.propTypes = {
	value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  partType: PropTypes.string.isRequired,
  selectOptions: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired
  ).isRequired
};

const Quantity = (props) => {
	const { value, selectOptions, changeHandler } = props;
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
      <option value={selectOptions.uniAff}>{selectOptions.uniAff}</option>
      <option value={selectOptions.uniNeg}>{selectOptions.uniNeg}</option>
      <option value={selectOptions.partAff}>{selectOptions.partAff}</option>
    </select>
  </>
	);
};

Quantity.propTypes = {
	value: PropTypes.string.isRequired,
  selectOptions: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired
  ).isRequired,
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

const FormController = (props) => {
  const [typeMajor, setTypeMajor] = React.useState("none");
  const { quantSelectValues, qualitySelectValues, maps } = props;
  const changeHandler = ({ target }) => {
    const { dataset: { aspect } } = target;
    if (aspect === "quantity") {
      setTypeMajor(maps.quantityToType[target.value]);
    } else if (aspect === "quality") {
      setTypeMajor(maps.qualityToType[target.value]);
    }
  };
  React.useEffect(() => {
	// console.log(`Use Effect: Major premise is of type: ${typeMajor}`);
  });
  return (
    <>
      <Form>
        <Premise identity="majorPremise" type={typeMajor}>
          <Quantity
            value={maps.typeToQuantity[typeMajor]}
            selectOptions={quantSelectValues}
            changeHandler={changeHandler}
          />
          <Quality
            value={maps.typeToQuality[typeMajor]}
            partType={typeMajor}
            selectOptions={qualitySelectValues}
            changeHandler={changeHandler}
          />
        </Premise>
      </Form>
    </>
  );
};

FormController.propTypes = {
  quantSelectValues: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired
  ).isRequired,
  qualitySelectValues: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired
  ).isRequired,
  maps: PropTypes.objectOf(
    PropTypes.object.isRequired,
    PropTypes.object.isRequired,
    PropTypes.object.isRequired,
    PropTypes.object.isRequired
  ).isRequired
};

const App = () => {
  const uniAff = "all";
  const uniNeg = "no";
  const partAff = "some";
  const quantSelectValues = { uniAff, uniNeg, partAff };

  const qAff = "are";
  const qNeg = "are NOT";
  const qualitySelectValues = {qAff, qNeg};

  const quantityToType = {
    [uniAff]: "A",
    [uniNeg]: "E",
    [partAff]: "I"
  };
  const typeToQuantity = {
    A: uniAff,
    E: uniNeg,
    I: partAff,
    O: partAff,
    none: "none"
  };
  /* programmatic 'change' event does not cause Quantity to be overwritten
  so okay to have limited mapping. Only way you can toggle "are"/"arenot"
  is if you are in the "particular" state
  => universal values are NOT needed here. */
  const qualityToType = {
    [qAff]: "I",
    [qNeg]: "O"
  };

  const typeToQuality = {
    A: qAff,
    E: qAff,
    I: qAff,
    O: qNeg,
    none: "none"
  };

  const maps = {
    quantityToType, typeToQuantity, qualityToType, typeToQuality
  };
  return <FormController quantSelectValues={quantSelectValues} qualitySelectValues={qualitySelectValues} maps={maps} />;
};
ReactDOM.render(<App />, document.getElementById("react_app"));
