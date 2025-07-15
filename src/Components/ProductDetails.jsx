import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      userId: user.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    };

    const existing = await axios.get(`http://localhost:3001/carts?userId=${user.id}&productId=${product.id}`);
    if (existing.data.length > 0) {
      const existingItem = existing.data[0];
      await axios.patch(`http://localhost:3001/carts/${existingItem.id}`, {
        qty: existingItem.qty + qty
      });
    } else {
      await axios.post("http://localhost:3001/carts", cartItem);
    }

    alert("Added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.image} alt={product.name} width="200px" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <p>Category: {product.category}</p>
      <div>
        <label>Qty:</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
