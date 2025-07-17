import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useUser } from '../Context/UserContext'; // ✅ Import context

const ProductCard = ({ product, openProductDetails, addToCart }) => {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist
  } = useUser(); // ✅ Use context directly

  // ✅ Check if this product is already in the wishlist
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">

      {/* Image Section */}
      <div
        className="relative w-full h-60 cursor-pointer"
        onClick={() => openProductDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition"
        >
          {isWishlisted ? (
            <AiFillHeart className="text-red-500 text-xl hover:scale-110 transition-transform" />
          ) : (
            <AiOutlineHeart className="text-gray-600 text-xl hover:text-red-500 hover:scale-110 transition-transform" />
          )}
        </button>

        {/* New Tag */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#6f4e37] text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <span className="bg-[#f3e8e3] text-[#6f4e37] text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>

        {/* Price + Rating + Button */}
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#6f4e37]">₹{product.price}</span>

            {/* Rating */}
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
