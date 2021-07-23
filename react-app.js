/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */

const { React, ReactDOM, PropTypes } = window;

const EulerPath = (props) => {
  const { partType } = props;
  const paths = {
    I: `M 149 52.150000000000006
    A22.349999999999998,22.349999999999998 0 0,1 149, 96.85
   M 149 74.5z`,
    O: `M 149 52.150000000000006
    A22.349999999999998,22.349999999999998 0 0,0 149, 96.85
   M 149 74.5z`
  };
  return (
    <path
      data-identifier="shape-middleTerm"
      className="shape shape_border-dashed"
      fill="none"
      stroke="black"
      strokeWidth="1"
      d={paths[partType]}
    />
  );
};

EulerPath.propTypes = {
  partType: PropTypes.string.isRequired
};

const EulerCircle = (props) => {
  const { term, specificAttrs = {} } = props;
  const defaultAttrs = { xPos: "50%", yPos: "50%", radius: "10%", fill: "none", cssClass: "" };
  const svgAttrs = { ...defaultAttrs, ...specificAttrs };
  return (
    <>
      <circle
        data-term={term}
        cx={svgAttrs.xPos}
        cy={svgAttrs.yPos}
        r={svgAttrs.radius}
        fill={svgAttrs.fill}
        stroke="black"
        className={`shape ${svgAttrs.cssClass}`}
      />
    </>
  );
};

EulerCircle.propTypes = {
  term: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  specificAttrs: PropTypes.object
};

EulerCircle.defaultProps = {
  specificAttrs: {}
};

const EulerCircleController = (props) => {
  const { part, partType } = props;

  const major = {
    subject: {
      A: { cssClass: "shape_border-dashed" },
      E: { cssClass: "shape_border-dashed" },
      I: { cssClass: "shape_border-dashed" },
      O: { cssClass: "shape_border-dashed" }
    },
    predicate: {
      A: { xPos: "57%", radius: "20%" },
      E: { xPos: "80%", radius: "20%" },
      I: { xPos: "63%", radius: "20%" },
      O: { xPos: "65%", radius: "20%" }
    }
  };
  const minor = {
    subject: { },
    predicate: { }
  };
  const conclusion = {
    subject: { },
    predicate: { }
  };

  const svgAttrs = { major, minor, conclusion };
  const shapeForSubject = (partType === "I" || partType === "O")
  ? <EulerPath partType={partType} />
  : <EulerCircle term="subject" specificAttrs={svgAttrs[part].subject[partType]} />;

  return (
    <>
      {shapeForSubject}
      <EulerCircle term="predicate" specificAttrs={svgAttrs[part].predicate[partType]} />
    </>
  );
};

EulerCircleController.propTypes = {
  part: PropTypes.string.isRequired,
  partType: PropTypes.string.isRequired
};

const DiagramMessage = () => (
  <foreignObject x="50" y="50" height="100" width="200" textAnchor="middle">
    <div xmlns="http://www.w3.org/1999/xhtml" className="svg_textMsg">
      Euler diagram for the major premise will appear here, once details entered.
    </div>
  </foreignObject>
  );

const DiagramController = (props) => {
  const { part, partType, children } = props;
  return (
    <svg id="svg_majorPremise" data-part={part} data-parttype={partType} width="300" height="150" viewBox="0 0 300 150">
      {children}
    </svg>
  );
};

DiagramController.propTypes = {
  part: PropTypes.string.isRequired,
  partType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

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
  const inputElements = children.filter((child) => {
    const { name } = child.type;
    return name === "Quantity" || name === "Quality";
  });
  const eulerDiagram = children.filter((child) => {
    const { name } = child.type;
    return name === "DiagramController";
  });
  return (
    <fieldset className={`part-${identity}`}>
      <legend>{`${identity.toUpperCase().split("P")[0]}`}: <small>{type}</small></legend>
      <fieldset>
        <legend>Choose options:</legend>
        {inputElements}
      </fieldset>
      <figure>
        {eulerDiagram}
        <figcaption>Euler Diagram: {identity}, of type &ldquo;{type}&rdquo;</figcaption>
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
          <DiagramController part="major" partType={typeMajor}>
            {(typeMajor === "none") ? <DiagramMessage /> : <EulerCircleController part="major" partType={typeMajor} />}
          </DiagramController>
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
  const qualitySelectValues = { qAff, qNeg };

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
