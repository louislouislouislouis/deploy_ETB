//React Necessities
import React, { useState, useEffect } from "react";

// Assets
import arrow_down from "../../../assets/icon/arrow_down.png";

// Styles
import "./dropdown.css";

// React star
import ReactStars from "react-stars";

// React Slider
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Dropdown = (props) => {
  const [developmode, setdevelopmode] = useState(false);
  const [val_choose, setval_choose] = useState();

  useEffect(() => {
    setdevelopmode(props.develop !== "hidden");
    props.options &&
      Object.keys(props.options).forEach((key) => {
        if (props.options[key]) {
          setval_choose(key);
        }
      });
  }, [props]);

  const [note, setnote] = useState(0.5);

  const ratingChanged = (newRating) => {
    setnote(newRating);
  };
  const hideclick = (e) => {
    console.log("hidein");
    e.stopPropagation();
  };

  return (
    <div className="mainbutton">
      <div className="dropdown_name" onClick={props.ondevelop}>
        <div className="dropdown_name_val">
          {props.showOnTop ? val_choose : props.name}
        </div>
        <div className="dropdown_name_arrow">
          <img
            className={`img_arrow ${developmode ? "reverse-arr" : "norma-arr"}`}
            src={arrow_down}
            alt="arrow down"
          />
        </div>
      </div>
      <div
        className={`dropdown_vals ${developmode ? "outdrop" : "indrop"} ${
          props.bg ? "fill" : ""
        }`}
        onClick={props.hideclick ? hideclick : null}
      >
        {props.type === "list" &&
          props.options &&
          Object.keys(props.options).map((option, index) => {
            return (
              <div className="dropdown_val" key={props.idfilter + index}>
                <div className="dropdown_val_name">{option}</div>
                <div className={`dropdown_val_checkbox`}>
                  <input
                    id={props.name + "_" + option}
                    custoptions={option}
                    name="isGoing"
                    type="checkbox"
                    checked={props.options[option]}
                    onChange={(e) => {
                      props.onselect(props.idfilter, option, e);
                    }}
                  />
                </div>
              </div>
            );
          })}
        {props.type === "int" && (
          <React.Fragment>
            <div className="slider_in">
              <Range
                marks={{
                  [props.globalmin]: `€${props.globalmin}`,
                  [props.globalmax]: `€${props.globalmax}`,
                }}
                value={[props.min, props.max]}
                min={props.globalmin}
                max={props.globalmax}
                allowCross={false}
                defaultValue={[props.globalmin, props.globalmax]}
                tipFormatter={(value) => `${value}€`}
                tipProps={{
                  placement: "top",
                  visible: true,
                }}
                onChange={(e) => {
                  props.onselect(props.idfilter, null, e);
                }}
              />
            </div>
          </React.Fragment>
        )}
        {props.type === "star" && (
          <div className="star_div">
            <ReactStars count={5} onChange={ratingChanged} size={24} />
            <div className="note_retour">
              {`${note} `}
              {note !== 5 ? "⭐ and +" : "⭐"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
