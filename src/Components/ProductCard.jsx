import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
      <div style={{ border: "1px solid gray", padding: "10px", width: "200px" }}>
        <img src={product.image} alt={product.name} width="100%" />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>{product.category}</p>
      </div>
    </Link>
  );
}
export default ProductCard;
