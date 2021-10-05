// React Necessities
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Custom Hooks
import { useForm } from "../../../hooks/form-hooks";

// Components
import Input from "../input/input";

// utils
import { VALIDATOR_MINLENGTH } from "../../../util/validators";

//style
import "./shearchBar.css";

//assets
import loop from "../../../assets/icon/chercher.png";

const ShearchBar = (props) => {
  const [onclear] = useState(false);
  const history = useHistory();
  const [shearch_value, inputHandler] = useForm(
    {
      shearch_value: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const submitHandler = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/products",
      search: `q=${encodeURIComponent(
        JSON.stringify(shearch_value.inputs.shearch_value.value)
      )}`,
    });
  };
  return (
    <div style={{ width: props.relative && "60vw" }}>
      {props.relative ? (
        <form className="main_form rel_s" onSubmit={submitHandler}>
          <Input
            id="shearch_value"
            element="input"
            type="text"
            validators={[VALIDATOR_MINLENGTH(-1)]}
            onInput={inputHandler}
            initialvalue=""
            onclear={onclear}
            placeholder="Commencez votre recherche"
          />
          <button type="submit">
            <img src={loop} alt="glass" />
          </button>
        </form>
      ) : (
        <form className="main_form abs_s" onSubmit={submitHandler}>
          <Input
            id="shearch_value"
            element="input"
            type="text"
            validators={[VALIDATOR_MINLENGTH(-1)]}
            onInput={inputHandler}
            initialvalue=""
            onclear={onclear}
            placeholder="Commencez votre recherche"
          />
          <button type="submit">
            <img src={loop} alt="glass" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ShearchBar;
