
import { Link } from "react-router-dom";
function ProductCard({ product }) {
    <Link to={`/product/${product.id}`}>
  <ProductCard product={product} />
</Link>
  return (
    <div style={{ border: "1px solid gray", padding: "10px", width: "200px" }}>
      <img src={product.image} alt={product.name} width="100%" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}

export default ProductCard;
