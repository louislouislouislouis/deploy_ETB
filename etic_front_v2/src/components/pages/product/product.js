// React Necessities
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import ReactStars from "react-stars";
import Lottie from "react-lottie";

// Custom Hooks / Components
import { useHttpClient } from "../../../hooks/http-hooks";
import Dropdown from "../../shared/dropdown_button/dropdown";
import { CartContext } from "../../../context/cart-context";

//Assets
import DUMMY_LOGO_1 from "../../../assets/icon/DUMMY_LOGO/vendor.png";
import DUMMY_LOGO_2 from "../../../assets/icon/DUMMY_LOGO/vendor1.png";
import DUMMY_LOGO_3 from "../../../assets/icon/DUMMY_LOGO/vendor2.png";
import panier from "../../../assets/icon/panier.png";
import animationData from "../../../assets/animation/anim1_cart.json";

//Styles
import "./product.css";

const Product = () => {
  const params = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dummy_option = [];
  const [product, setproduct] = useState({});
  const [actual_product, setactual_product] = useState(null);
  const [detailmode, setdetailmode] = useState("detail");

  const [lottiestate, setlottiestate] = useState({
    isStopped: true,
    isPaused: true,
    isDone: true,
  });
  const animDone = () => {
    setlottiestate((old) => {
      return { isStopped: true, isPaused: true, isDone: true };
    });
  };
  const defaultOptions = {
    animationData: animationData,
    autoplay: false,
    loop: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const sendReq = async () => {
      try {
        const convsresponse = await sendRequest(
          `${process.env.REACT_APP_BACKENDURL}/item`,
          "POST",
          JSON.stringify({ id: params.id }),
          { "Content-Type": "application/json" }
        );
        if (convsresponse) {
          convsresponse.item.images.push(
            "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk="
          );
          convsresponse.item.images.push(
            "https://media.istockphoto.com/photos/colored-powder-explosion-abstract-closeup-dust-on-backdrop-colorful-picture-id1072093690?k=20&m=1072093690&s=612x612&w=0&h=Ns3WeEm1VrIHhZOmhiGY_fYKvIlbJrVADLqfxyPQVPM="
          );
          setproduct({ valid: true, item: convsresponse.item });
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendReq();
  }, []);

  useEffect(() => {
    if (product.item) {
      let actual_val = product.item.prix[0];
      product.item.prix.forEach((el) => {
        if (el.prix < actual_val.prix) {
          actual_val = el;
        }
      });
      setactual_product({ item: actual_val, quantity: 1 });
    }
  }, [product]);

  const [fakeoptions, setfakeoptions] = useState({
    choix1: {
      label: "Dimension / Taille",
      type: "list",
      mode: "hidden",
      options: {
        "0.3 x16mm": true,
        "0.4 x17mm": false,
        "0.5 x18mm": false,
        "0.5 x20mm": false,
      },
    },
    choix2: {
      label: "Type d’anesthésie",
      type: "list",
      mode: "hidden",
      options: {
        Intraligamentaire: true,
        Fractale: false,
        Orale: false,
        Nasale: false,
      },
    },
    choix3: {
      label: "Type d’emballage",
      type: "list",
      mode: "hidden",
      options: {
        Simple: true,
        "Triple couches d'absoption": false,
      },
    },
  });

  // Function waiting to be called everytime filter change
  const selecthandler = (el, option, e) => {
    e.stopPropagation();
    setfakeoptions((old) => {
      if (old[el].type === "list") {
        Object.keys(old[el].options).forEach((element) => {
          old[el].options[element] = false;
        });
        return {
          ...old,
          [el]: {
            ...old[el],
            options: {
              ...old[el].options,
              [option]: e.target.checked,
            },
          },
        };
      } else if (old[el].type === "int") {
        return {
          ...old,
          [el]: {
            ...old[el],
            min: e[0],
            max: e[1],
          },
        };
      }
    });
  };

  // Special function to hide the absolute positionnal sort options
  const hideSort = (e) => {
    setfakeoptions((old) => {
      Object.keys(old).forEach((element) => {
        old[element].mode = "hidden";
      });
      return {
        ...old,
      };
    });
  };

  // Filter mode show/hide
  const changemodehandler = (el) => {
    setfakeoptions((old) => {
      let val = "";
      Object.keys(old).forEach((element) => {
        if (element === el) {
          val = old[element].mode;
        }
        old[element].mode = "hidden";
      });
      return {
        ...old,
        [el]: {
          ...old[el],
          mode: val === "hidden" ? "show" : "hidden",
        },
      };
    });
  };
  const changeitemnumberhandler = (e) => {
    setactual_product((old) => {
      return {
        ...old,
        quantity: e.target.value,
      };
    });
  };

  const [current_img, setcurrentimg] = useState(0);
  const cart = useContext(CartContext);
  console.log(actual_product, product);
  const add_to_cart_handle = () => {
    if (lottiestate.isStopped) {
      setTimeout(() => {
        cart.addProduct(
          actual_product,
          product.item,
          parseInt(actual_product.quantity)
        );
      }, 1500);
    }
    setlottiestate((old) => {
      return { isStopped: false, isPaused: false, isDone: false };
    });
  };
  return (
    <div className="main_product_page" onClick={hideSort}>
      {product.item && actual_product && (
        <React.Fragment>
          <div className="left_pr">
            <div className="product_main">
              <div className="img_part">
                <div className="main_img">
                  <img
                    src={product.item.images[current_img]}
                    alt={product.item.id}
                  />
                </div>
                {product.item.images.length !== 1 && (
                  <div className="others_img">
                    {product.item.images.map((image, index) => {
                      return (
                        <div className="lil_img" key={index}>
                          <img
                            src={image}
                            alt={index}
                            onClick={() => setcurrentimg(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="infopart">
                <div className="pr_title">{product.item.nom}</div>
                <div className="pr_global_infos">
                  <div className="pr_lil_infos">
                    <div className="top">
                      <div className="left_sub_pr">{product.item.marque}</div>
                      <div className="right_sub_pr">
                        Vendu-par:
                        <img
                          src={DUMMY_LOGO_1}
                          alt={actual_product.item.nom_site}
                        />
                      </div>
                    </div>
                    <span className="separator"></span>
                    <div className="ref">
                      {`Référence vendeur: ${product.item.reference_etb}`}
                    </div>
                  </div>
                  <div className="pr_lil_desc">{product.item.description}</div>
                  <div className="pr_other_infos">
                    <div className="note">
                      <ReactStars
                        count={5}
                        size={32}
                        edit={false}
                        value={product.item.qualite}
                      />
                      <div className="note_val">
                        {`${product.item.qualite} / 5`}
                      </div>
                      <div className="comments">Voir les avis</div>
                    </div>
                    <div className="price">
                      <div className="text">À partir de</div>
                      <div className="val">{`${(
                        Math.round(actual_product.item.prix * 100) / 100
                      ).toFixed(2)}€`}</div>
                    </div>
                  </div>
                </div>
                <div className="options">
                  {Object.keys(fakeoptions).map((el, index) => {
                    return (
                      <React.Fragment key={el + index}>
                        <div className="inchoice">
                          <div className="titlechoice">
                            <div className="val">{fakeoptions[el].label}</div>
                          </div>
                          <div className="dropdowncontainer productchoice">
                            <Dropdown
                              showOnTop
                              type="list"
                              button_type="radio"
                              idfilter={el}
                              options={fakeoptions[el].options}
                              develop={fakeoptions[el].mode}
                              ondevelop={(e) => {
                                e.stopPropagation();
                                changemodehandler(el);
                              }}
                              onselect={selecthandler}
                              bg
                              hideclick
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="more_infos">
              <div className="heading">
                <div className="title">
                  <div
                    className="details"
                    onClick={() => setdetailmode("detail")}
                  >
                    Détails
                  </div>
                  <div
                    className="more-infos"
                    onClick={() => setdetailmode("more-infos")}
                  >
                    + d'informations
                  </div>
                </div>
                <div
                  className={`separator ${
                    detailmode === "detail" ? "sep_left" : "sep_right"
                  }`}
                ></div>
              </div>
              <div className="bigseparator" />
              <div className="body">
                <div
                  className={`body_content ${
                    detailmode === "detail" ? "" : "translated"
                  }`}
                >
                  <div className="desc_det">
                    <p>
                      {product.item.description}
                      <br />
                      {`\n
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sed nisi arcu. Mauris vestibulum vestibulum elit, eu
                  aliquet dolor dapibus vel. Nullam dictum orci diam, quis
                  sollicitudin nisl efficitur vel.`}
                      <br />
                      {` Morbi ac aliquet orci. In
                  aliquam iaculis lacus, ut porttitor velit. Integer sed
                  consectetur lorem. Integer facilisis tincidunt dolor tincidunt
                  convallis. Phasellus eget sagittis mi. `}
                    </p>
                  </div>
                  <div className="detail">
                    <p>
                      {`Conditionnement:${product.item.conditionnement.type}`}
                      <br />
                      {`Apparence:${product.item.aparence.teinte}`}
                      <br />
                      {`Type de prise:${product.item.spec["Type de prise"]}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right_pr">
            <div className="other_vendors">
              <div className="title">Autre vendeurs sur ETB</div>
              <div className="content">
                <div className="intro">Vendu par :</div>
                <div className="list">
                  {product.item.prix.map((el, index) => {
                    let src;
                    if (index % 3 === 0) {
                      src = DUMMY_LOGO_1;
                    } else if (index % 3 === 1) {
                      src = DUMMY_LOGO_3;
                    }
                    if (index % 3 === 2) {
                      src = DUMMY_LOGO_2;
                    }
                    return (
                      <div
                        className="line"
                        key={index}
                        onClick={() => {
                          setactual_product((old) => {
                            return { ...old, item: el };
                          });
                        }}
                      >
                        <div className="logo">
                          <img src={src} alt="" />
                        </div>
                        <div className="price">
                          <div className="descri_pr">À partir de</div>
                          <div className="val">{`${(
                            Math.round(el.prix * 100) / 100
                          ).toFixed(2)}€`}</div>
                        </div>
                        <div className="panier">
                          <img src={panier} alt="" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="add_to_cart">
              <div className="quantity">
                <div className="haut">
                  <div className="line_cart">
                    <div className="desc">Quantité:</div>
                    <div className="val">
                      <select
                        value={actual_product.quantity}
                        onChange={changeitemnumberhandler}
                      >
                        {[...Array(30)].map((x, i) => (
                          <React.Fragment key={`choice${i}`}>
                            <option value={i + 1}>{i + 1}</option>
                          </React.Fragment>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="line_cart">
                    <div className="desc">Prix unitaire:</div>
                    <div className="val bl">
                      {`${(
                        Math.round(actual_product.item.prix * 100) / 100
                      ).toFixed(2)}€`}
                    </div>
                  </div>
                  <div className="line_cart">
                    <div className="desc">Prix total:</div>
                    <div className="val">
                      {`${(
                        Math.round(
                          actual_product.item.prix *
                            actual_product.quantity *
                            100
                        ) / 100
                      ).toFixed(2)}€`}
                    </div>
                  </div>
                </div>
                <div className="bas">
                  <div className="cta" onClick={add_to_cart_handle}>
                    <div className="descr">Ajouter au panier</div>
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Product;
