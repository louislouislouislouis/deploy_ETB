import { createContext } from "react";

export const CartContext = createContext({
  cart: {},
  addProduct: () => {},
  removeProducts: () => {},
});
