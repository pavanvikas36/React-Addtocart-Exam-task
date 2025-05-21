import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState("");
  const [addtocartProduct, setAddtocart] = useState([])

  useEffect(() => {
    let url = "https://fakestoreapi.com/products/";

    if (cat !== "") {
      url = `https://fakestoreapi.com/products/category/${cat}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [cat]);

  const handleProduct = (product) => {
    setAddtocart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <div id="mainContainer">
        <div id="rightContainer">
          <Button variant="primary" onClick={() => {setCat("electronics");}}>Electronics</Button>
          <Button variant="primary" onClick={() => {setCat("men's clothing"); }}>Fashion</Button>
        </div>
        {data.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div id="leftContainer">
            {data.map((p, index) => {
              return (
                <div>
                  <Card className="m-3 shadow-sm rounded" style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={p.image} style={{height: "250px",objectFit: "contain",padding: "10px",}}/>
                    <Card.Body>
                      <Card.Title className="fs-6" style={{ minHeight: "3rem" }}>{p.title}</Card.Title>
                      <Button variant="primary" className="w-100" onClick={() => handleProduct(p)}>Add to cart</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-5 p-3">
        <h4>🛒 Cart Items ({addtocartProduct.length})</h4>
        <div className="d-flex flex-wrap">
          {addtocartProduct.map((item, idx) => (
            <Card key={idx} className="m-2 shadow-sm" style={{ width: "12rem" }}>
              <Card.Img variant="top" src={item.image} style={{ height: "150px", objectFit: "contain", padding: "10px" }} />
              <Card.Body>
                <Card.Title className="fs-6" style={{ minHeight: "2.5rem" }}>{item.title.slice(0, 30)}...</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
