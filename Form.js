/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */

const { React } = window;
const Form = () => {
  const myName = "John";
  //return (<form>My name is {myName}</form>);
  return React.createElement("form", null, "My name is ", myName);
};

export default Form;
