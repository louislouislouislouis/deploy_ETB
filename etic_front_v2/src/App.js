//Styles
import "./App.css";

//React necessities
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Custom function
import { useAuth } from "./hooks/auth-hooks";
import { useCart } from "./hooks/cart-hoojs";
import { AuthContext } from "./context/auth-context";
import { CartContext } from "./context/cart-context";

// Visual Components
import MainNav from "./components/shared/nav/nav";
import Home from "./components/pages/home/home";
import Footer from "./components/shared/footer/footer";
import Products from "./components/pages/products/products";
import Product from "./components/pages/product/product";
import CartPage from "./components/pages/cartPage/cartPage";

function App() {
  // uncomment to handle authentification
  const { token, login, logout, UserId } = useAuth();
  const { cart, addProduct, removeProducts } = useCart();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: UserId,
      }}
    >
      <CartContext.Provider value={{ cart, addProduct, removeProducts }}>
        <Router>
          <MainNav />
          <Switch>
            <Route path="/" exact={true}>
              <Home></Home>
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/product/:id" exact={true}>
              <Product />
            </Route>
            <Route path="/cart" exact={true}>
              <CartPage></CartPage>
            </Route>
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
