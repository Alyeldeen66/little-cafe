import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import littleLogo from "../src/Assets/Screenshot 2023-02-05 210245.png";
import cartLogo from "./Assets/shopping-cart.png";
import closeCart from "./Assets/close.png";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  addProduct,
  decrement,
  decrementCart,
  deleteProduct,
  increment,
  incrementCart,
} from "./Redux/productsReducer";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const products = useSelector((state) => state.products.products);
  const cartProducts = useSelector((state) => state.products.cartProducts);
  const title = cartProducts.map((product) => product.title);
  console.log(title);
  const totalPrice = useSelector((state) => state.products.totalPrice);
  let totalQuantity = 0;
  cartProducts.map((product) => (totalQuantity += product.quantity));
  console.log(totalQuantity);
  const dispatch = useDispatch();
  console.log(cartProducts);
  const handleClick = () => {
    setShowCart(true);
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const buyProducts = (id) => {
    dispatch(addProduct(id));
  };
  const handleOperation = () => {
    axios
      .post("https://cafe-endpoint.onrender.com/addProduct", {
        title: title,
        price: totalPrice,
        quantity: totalQuantity,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="title-container">
        <img src={littleLogo} />
        {/* <h1>Welcome to the little cafe</h1> */}
      </div>
      <div className="shopping-cart">
        <img onClick={handleClick} src={cartLogo} />
      </div>
      {showCart && (
        <div className="shopping-list">
          <div className="shopping-list-close">
            <img onClick={toggleCart} src={closeCart} />
          </div>
          <div className="shopping-list-items-container">
            <div className="shopping-list-items">
              {cartProducts ? (
                cartProducts.map((product) => (
                  <div key={product.id} className="shopping-list-item">
                    <Card style={{ width: "14rem" }}>
                      <Card.Img
                        variant="top"
                        src={product.img}
                        style={{ height: "7rem" }}
                      />
                      <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                          {product.title}
                        </Card.Title>
                        <div className="product-count">
                          <Button
                            style={{
                              backgroundColor: "#a49c8e",
                              border: "0px",
                            }}
                            onClick={() => dispatch(decrementCart(product.id))}
                          >
                            -
                          </Button>
                          <p> {product.quantity}</p>
                          <Button
                            style={{
                              backgroundColor: "#a49c8e",
                              border: "0px",
                            }}
                            onClick={() => dispatch(incrementCart(product.id))}
                          >
                            +
                          </Button>
                        </div>
                        <div className="product-delete">
                          <Button
                            style={{
                              backgroundColor: "#a49c8e",
                              border: "0px",
                            }}
                            onClick={() => dispatch(deleteProduct(product.id))}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <h2>Empty Cart</h2>
              )}
              {cartProducts ? (
                <div style={{ textAlign: "center" }}>
                  <h4>Total Price = {totalPrice}</h4>
                  <Button
                    style={{
                      backgroundColor: "#a49c8e",
                      border: "0px",
                    }}
                    onClick={handleOperation}
                  >
                    Buy now
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div></div>
          </div>
        </div>
      )}
      <div className="cards-holder">
        <div className="cards-container">
          {products.map((product) => (
            <div key={product.id} className="item">
              <Card style={{ width: "18rem", border: "0px" }}>
                <Card.Img
                  variant="top"
                  src={product.img}
                  style={{ height: "14rem" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <div className="product-count">
                    <Button
                      style={{
                        backgroundColor: "#a49c8e",
                        border: "0px",
                      }}
                      onClick={() => dispatch(decrement(product.id))}
                    >
                      -
                    </Button>
                    <p> {product.quantity}</p>
                    <Button
                      style={{
                        backgroundColor: "#a49c8e",
                        border: "0px",
                      }}
                      onClick={() => dispatch(increment(product.id))}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    style={{
                      width: "40%",
                      backgroundColor: "#a49c8e",
                      border: "0px",
                    }}
                    variant="primary"
                    onClick={() => buyProducts(product.id)}
                  >
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
