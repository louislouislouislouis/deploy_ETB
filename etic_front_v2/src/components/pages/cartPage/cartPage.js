import React, { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import "./cartPage.css";
const CartPage = () => {
  const cartcontext = useContext(CartContext);
  console.log(cartcontext);
  return (
    <div className="cartpage">
      <div className="cart_p">
        <div className="titl">Panier</div>
        <div className="tableau">
          <div className="title_tab">
            <div className="col">Produits</div>
            <div className="col">Désignation</div>
            <div className="col">Prix unitaire TTC</div>
            <div className="col">Quantité</div>
            <div className="col">Prix total TTC</div>
            <div className="col">Lien pour commander</div>
          </div>
          <span className="card_sep"></span>
          {cartcontext.cart && (
            <React.Fragment>
              {Object.keys(cartcontext.cart.products).map((el) => {
                return (
                  <React.Fragment>
                    <div className="val_tab">
                      <div className="col">
                        <img
                          src={cartcontext.cart.products[el].product.images[0]}
                          alt={cartcontext.cart.products[el].product.images[0]}
                        />
                      </div>
                      <div className="col">
                        <div className="text">
                          {cartcontext.cart.products[el].product.nom}
                        </div>
                      </div>
                      <div className="col">
                        <div className="price_col">
                          {`${(
                            Math.round(
                              cartcontext.cart.products[el].item_vendor.item
                                .prix * 100
                            ) / 100
                          ).toFixed(2)}€`}
                        </div>
                      </div>
                      <div className="col">
                        {cartcontext.cart.products[el].quantity}
                      </div>
                      <div className="col">
                        <div className="textb">
                          {`${(
                            Math.round(
                              cartcontext.cart.products[el].quantity *
                                cartcontext.cart.products[el].item_vendor.item
                                  .prix *
                                100
                            ) / 100
                          ).toFixed(2)}€`}
                        </div>
                      </div>
                      <div className="col">
                        <div className="textb">
                          <a
                            href={
                              cartcontext.cart.products[el].item_vendor.item
                                .lien_produit
                            }
                          >
                            Lien de l'article
                          </a>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </div>
        <div className="actions">
          <div className="viderPanier" onClick={cartcontext.removeProducts}>
            <div className="inside_pan">Vider le panier</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
