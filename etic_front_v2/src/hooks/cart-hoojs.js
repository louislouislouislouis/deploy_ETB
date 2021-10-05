import { useState, useCallback, useEffect } from "react";
let logoutTimer;

export const useCart = () => {
  const [cart, setCart] = useState({ products: {} });

  const addProduct = useCallback((item_vendor, product, number) => {
    setCart((old) => {
      let cust_id = product.id + item_vendor.item.nom_site;
      return {
        ...old,
        products: {
          ...old.products,
          [cust_id]: {
            product: product,
            item_vendor: item_vendor,
            quantity: old.products[cust_id]
              ? old.products[cust_id].quantity + number
              : number,
          },
        },
      };
    });
  }, []);

  useEffect(() => {
    if (Object.keys(cart.products).length !== 0) {
      localStorage.setItem("cartData", JSON.stringify(cart));
    }
  }, [cart]);

  const removeProducts = useCallback(() => {
    setCart({ products: {} });
    localStorage.removeItem("cartData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cartData"));
    if (storedData && storedData.products) {
      setCart(storedData);
    } else {
      localStorage.setItem("cartData", JSON.stringify(cart));
    }
  }, []);
  return { cart, addProduct, removeProducts };
};
