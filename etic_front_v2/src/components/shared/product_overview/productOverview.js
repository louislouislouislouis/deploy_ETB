import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-stars";
import Lottie from "react-lottie";

import { CartContext } from "../../../context/cart-context";

import DUMMY_LOGO_1 from "../../../assets/icon/DUMMY_LOGO/vendor.png";
import DUMMY_LOGO_2 from "../../../assets/icon/DUMMY_LOGO/vendor1.png";
import DUMMY_LOGO_3 from "../../../assets/icon/DUMMY_LOGO/vendor2.png";

import animationData from "../../../assets/animation/anim1_cart.json";

//Styles
import "./productOverview.css";
const ProductOverview = (props) => {
  const [min_prix, setmin_prix] = useState(0);
  const cart = useContext(CartContext);

  useEffect(() => {
    let min_prix = props.product.prix[0].prix;
    props.product.prix.forEach((element) => {
      if (element.prix < min_prix) {
        min_prix = element.prix;
      }
    });
    setmin_prix(min_prix);
  }, [props.product.prix]);
  const [lottiestate, setlottiestate] = useState({
    isStopped: true,
    isPaused: true,
    isDone: true,
  });
  const defaultOptions = {
    animationData: animationData,
    loop: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const playAnim = (e) => {
    // Enlever if false devant client pour monter animation
    // Cahnger aussi navlink  dans product.js
    if (false) {
      if (lottiestate.isStopped) {
        cart.addProduct(props.product, 1);
      }

      setlottiestate((old) => {
        return { isStopped: false, isPaused: false, isDone: false };
      });
    }
  };
  const animDone = () => {
    setlottiestate((old) => {
      return { isStopped: true, isPaused: true, isDone: true };
    });
  };
  return (
    <div className="maincard_product">
      <div className="insider_product">
        <div className="starcontainer">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={props.product.qualite}
          />
          <div className="note">{props.product.qualite + "/5"}</div>
        </div>
        <div className="product_details">
          <div className="img_pr">
            <div className="img_container">
              <img src={props.product.images[0]} alt="" />
            </div>
          </div>
          <div className="details_pr">
            <div className="main_info">
              <div className="maintittle">{props.product.nom}</div>
              <div className="marque_pr">{props.product.marque}</div>
            </div>
            <div className="vendors">
              <div className="desc">Vendu par:</div>
              <div className="vendors_appercu">
                {props.product.prix &&
                  props.product.prix.map((el, index) => {
                    let logo;
                    if (index % 3 === 1) {
                      logo = DUMMY_LOGO_1;
                    } else if (index % 3 === 0) {
                      logo = DUMMY_LOGO_2;
                    } else if (index % 3 === 2) {
                      logo = DUMMY_LOGO_3;
                    }
                    return (
                      <div className="vendor_lg" key={index}>
                        <img src={logo} alt="" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="price">
              <div className="left_pf">
                <div className="text">À partir de </div>
                <div className="value">{`${min_prix}€`}</div>
              </div>
              <div className="right_pr" onClick={playAnim}>
                <Lottie
                  options={defaultOptions}
                  height={45}
                  width={45}
                  isPaused={lottiestate.isPaused}
                  isStopped={lottiestate.isStopped}
                  eventListeners={[
                    {
                      eventName: "complete",
                      callback: animDone,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
