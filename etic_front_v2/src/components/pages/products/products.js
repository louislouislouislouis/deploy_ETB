// React Necessities
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory, NavLink } from "react-router-dom";

// Custom Hooks / Components
import Dropdown from "../../shared/dropdown_button/dropdown";
import { useHttpClient } from "../../../hooks/http-hooks";

// Assets
import categories_json from "../../../assets/categories/categories.json";

// Styles
import "./products.css";
import ProductOverview from "../../shared/product_overview/productOverview";

const Products = () => {
  // Get url data
  const history = useHistory();
  let query = useQuery();

  // State var
  const [search, setsearch] = useState(JSON.parse(query.get("q")));
  const [products, setproduct] = useState({ valid: false });

  // Filter and Sort
  const [filter, setfilter] = useState({
    classes: { label: "Catégories", type: "list", mode: "show", options: {} },
    sous_categories: { type: "list", mode: "hidden", options: {} },
    type_de_produit: { type: "list", mode: "hidden", options: {} },
    company: { label: "Marque", type: "list", mode: "hidden", options: {} },
    fournisseur: { type: "list", mode: "hidden", options: {} },
    prix: {
      label: "Prix",
      type: "int",
      mode: "hidden",
      min: 0,
      globalmin: 0,
      max: 2000,
      globalmax: 2000,
    },
    commentaires: {
      label: "Commentaires",
      type: "star",
      mode: "hidden",
      min: 0,
    },
  });
  const [sort, setsort] = useState({
    label: "Trier par",
    type: "list",
    mode: "hidden",
    options: {
      Pertinence: true,
      "Prix: par ordre croissant": false,
      "Prix: par ordre décroissant": false,
      "Mieux noté": false,
      "Meilleure qualité/prix": false,
    },
  });

  // Http Manager
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Get the categorie and souscategorie
  // Only callled once as long as the Back API is not ready
  // a changer par des getters du back quand api pret
  useEffect(() => {
    let default_sous_categories = {};
    categories_json.souscategories.forEach((element) => {
      default_sous_categories[element] = false;
    });

    let default_typedeproduit = {};
    categories_json.typedeproduit.forEach((element) => {
      default_typedeproduit[element] = false;
    });

    let default_fournisseur = {};
    categories_json.fournisseur.forEach((element) => {
      default_fournisseur[element] = false;
    });

    setfilter((prev) => {
      return {
        ...prev,
        sous_categories: {
          label: "Sous-Catégories",
          type: "list",
          mode: "hidden",
          options: default_sous_categories,
        },
        type_de_produit: {
          label: "Type de Produit",
          type: "list",
          mode: "hidden",
          options: default_typedeproduit,
        },
        fournisseur: {
          label: "Fournisseur",
          type: "list",
          mode: "hidden",
          options: default_fournisseur,
        },
      };
    });
  }, []);

  //Function called everytime URL change (Shearch-Bar can change URL)
  useEffect(() => {
    console.log("Changing Shearsh");
    const params = new URLSearchParams(history.location.search);
    setsearch(JSON.parse(params.get("q")));
  }, [history.location.search]);

  // Get data from back
  // Function waitings to be called when filter or sort change
  const updateproductonFilterChange = useCallback(() => {
    console.log("Fonction d'actualisation appelé");
    let recherche = {};
    recherche.request = search;
    Object.keys(filter).forEach((key) => {
      if (filter[key].type === "list") {
        Object.keys(filter[key].options).forEach((fil) => {
          if (filter[key].options[fil]) {
            if (recherche[key]) {
              recherche[key].push(fil);
            } else {
              recherche[key] = [];
              recherche[key].push(fil);
            }
          }
        });
      } else if (filter[key].type === "int") {
        recherche.higherPrice = filter[key].max;
        recherche.lowerPrice = filter[key].min;
      } else if (filter[key].type === "star") {
        recherche[key] = [];
      }
    });
    //CLASSE MARCHES PAS
    delete recherche.classes;

    const sendReq = async () => {
      try {
        const convsresponse = await sendRequest(
          `${process.env.REACT_APP_BACKENDURL}/search`,
          "POST",
          JSON.stringify(recherche),
          { "Content-Type": "application/json" }
        );
        if (convsresponse) {
          setproduct({ valid: true, products: convsresponse.items });
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendReq();
    setallowrender(false);
  }, [filter, sort, sendRequest, search]);

  // Get data from back
  // Function called every time search value change
  useEffect(() => {
    console.log("GET DATA FROM API");
    const sendReq = async () => {
      try {
        const convsresponse = await sendRequest(
          `${process.env.REACT_APP_BACKENDURL}/search`,
          "POST",
          JSON.stringify({ request: search }),
          { "Content-Type": "application/json" }
        );
        if (convsresponse) {
          setproduct({ valid: true, products: convsresponse.items });
          let newobjclasses = {};
          let newobjcompany = {};
          convsresponse.meta.classes.forEach((el) => {
            newobjclasses[el] = false;
          });
          convsresponse.meta.company.forEach((el) => {
            newobjcompany[el] = false;
          });
          setfilter((old) => {
            return {
              ...old,
              classes: {
                ...old.classes,
                options: newobjclasses,
              },
              company: {
                ...old.company,
                options: newobjcompany,
              },
              prix: {
                ...old.prix,
                min: Math.trunc(convsresponse.meta.lowerPrice),
                max: Math.trunc(convsresponse.meta.higherPrice) + 1,
                globalmin: Math.trunc(convsresponse.meta.lowerPrice),
                globalmax: Math.trunc(convsresponse.meta.higherPrice) + 1,
              },
            };
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendReq();
  }, [search, sendRequest]);

  const [allowrender, setallowrender] = useState(false);

  useEffect(() => {
    if (allowrender) {
      updateproductonFilterChange();
    }
  }, [allowrender, updateproductonFilterChange]);

  // Filter mode show/hide
  const changemodehandler = (el) => {
    setfilter((old) => {
      return {
        ...old,
        [el]: {
          ...old[el],
          mode: old[el].mode === "hidden" ? "show" : "hidden",
        },
      };
    });
  };

  // Sort mode show/hide
  const changesortmodehandler = (el) => {
    el.stopPropagation();
    setsort((old) => {
      return {
        ...old,
        mode: old.mode === "hidden" ? "show" : "hidden",
      };
    });
  };

  // Function waiting to be called everytime sort change
  const selectsorthandler = (el, option, e) => {
    e.stopPropagation();
    setsort((old) => {
      return {
        ...old,
        options: {
          Pertinence: false,
          "Prix: par ordre croissant": false,
          "Prix: par ordre décroissant": false,
          "Mieux noté": false,
          "Meilleure qualité/prix": false,
          [option]: e.target.checked,
        },
      };
    });
  };

  // Function waiting to be called everytime filter change
  const selecthandler = (el, option, e) => {
    setfilter((old) => {
      if (old[el].type === "list") {
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
    setallowrender(true);
  };

  // Special function to hide the absolute positionnal sort options
  const hideSort = (e) => {
    setsort((old) => {
      return {
        ...old,
        mode: "hidden",
      };
    });
  };

  return (
    <React.Fragment>
      <div className="body_product" onClick={hideSort}>
        <div className="body_product_left">
          <h4>Filtrer par :</h4>
          <div className="list_filter">
            {Object.keys(filter).map((el, index) => {
              return (
                <React.Fragment key={el + index}>
                  <Dropdown
                    type={filter[el].type}
                    idfilter={el}
                    name={filter[el].label}
                    options={filter[el].options}
                    develop={filter[el].mode}
                    ondevelop={() => changemodehandler(el)}
                    onselect={selecthandler}
                    max={filter[el].type === "int" ? filter[el].max : null}
                    min={filter[el].type === "int" ? filter[el].min : null}
                    globalmax={
                      filter[el].type === "int" ? filter[el].globalmax : null
                    }
                    globalmin={
                      filter[el].type === "int" ? filter[el].globalmin : null
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="body_product_right">
          <div className="body_product_r_top">
            <div className="result">
              {products.products && products.products.length !== 0 ? (
                <p>
                  {`1-${products.products.length} résultats pour "`}{" "}
                  <b style={{ color: "#3964af" }}>{search}</b>"
                </p>
              ) : (
                <div className="ed">
                  {`Aucun résultat trouvé pour "`}
                  <b style={{ color: "#3964af" }}>{search}</b>"
                </div>
              )}
            </div>
            {products.products && products.products.length !== 0 && (
              <div className="sort">
                <div className="title">Trier par :</div>
                <div className="dropdowncontainer rel">
                  <div className="dropdowncontainer abs">
                    <Dropdown
                      showOnTop
                      type={sort.type}
                      button_type="radio"
                      idfilter="sort"
                      name={sort.label}
                      options={sort.options}
                      develop={sort.mode}
                      ondevelop={changesortmodehandler}
                      onselect={selectsorthandler}
                      bg
                      hideclick
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="body_product_r_bottom">
            {products.valid &&
              products.products.map((product, index) => (
                <React.Fragment key={product.id + index}>
                  <NavLink to={`/product/${product.id}`}>
                    <ProductOverview product={product} key={product.id} />
                  </NavLink>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default Products;
