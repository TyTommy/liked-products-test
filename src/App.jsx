import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleLike = (product) => {
    setLikedProducts([...likedProducts, product]);
  };

  const handleUnlike = (product) => {
    setLikedProducts(likedProducts.filter((p) => p.id !== product.id));
  };

  return (
    <div className="App">
      <div className="products">
      <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {likedProducts.find((p) => p.id === product.id) ? (
              <button onClick={() => handleUnlike(product)}>Unlike</button>
            ) : (
              <button onClick={() => handleLike(product)}>Like</button>
            )}
          </div>
        ))}
      </div>
      <div className="liked-products">
        <h2>Liked Products</h2>
        {likedProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleUnlike(product)}>Unlike</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;