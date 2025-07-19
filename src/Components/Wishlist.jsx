
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";

function Wishlist() {
  const { wishlist,fetchWishlist, removeFromWishlist } = useWishlist();
  const { user } =useUser();
  const { fetchCart } = useCart()

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
    } else {
      fetchWishlist(); 
    }
  }, [user]);

  

  const moveToCart = async (item) => {
    try {
      const res = await axios.get(`http://localhost:3001/carts?userId=${user.id}&productId=${item.productId || item.id}`);

      if (res.data.length === 0) {
        await axios.post("http://localhost:3001/carts", {
          userId: user.id,
          productId: item.productId || item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: 1
        });
        fetchCart();
        toast.success(`${item.name} added to cart!`);
        removeFromWishlist(item.id); 
      } else {
        toast.error("This item is already in your cart");
      }
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f5] to-[#f8ede4] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#5a3f2d] mb-4">
            Your Wishlist <span className="text-[#f3a847]"></span>
          </h2>
          <p className="text-lg text-[#6f4e37] max-w-2xl mx-auto">
            {wishlist.length === 0
              ? "Your wishlist is waiting to be filled with chocolatey delights!"
              : "All your favorite chocolates in one place"}
          </p>
        </div>

        
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
           
            <p className="text-xl text-[#6f4e37] mb-8">
              No items in your wishlist yet
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#5a3f2d] text-white px-8 py-3 rounded-full hover:bg-[#3e2c23] transition flex items-center gap-2 mx-auto"
            >
              see Products <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
              
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition"
                    title="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#5a3f2d] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#6f4e37] font-bold text-lg mb-4">
                    ₹{item.price}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => moveToCart(item)}
                      className="flex-1 bg-[#5a3f2d] text-white py-2 px-4 rounded-lg hover:bg-[#3e2c23] transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
