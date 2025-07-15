import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUserCircle } from 'react-icons/fa';



function Home() {
  const navigate=useNavigate()
  

  return (
    
    <div className="font-serif bg-[#fef6f3]">
      
      
     


     
      <section className="bg-cover bg-center text-center text-white h-[100vh] flex flex-col justify-center items-center" style={{ backgroundImage: "url(delicious-chocolate-arrangement-copy-space.jpg)" }}>
        <h1 className="text-5xl font-bold">Delight in Every Bite</h1>
        <p className="text-xl mt-4">Premium handcrafted chocolates made with love</p>
        <div className="mt-6 space-x-4">
          <button className="bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-2 px-6 rounded" onClick={()=>navigate("/Products")} >Shop Now</button>
          <button className="border border-white py-2 px-6 rounded hover:bg-white hover:text-[#6f4e37] transition" onClick={()=>navigate("/About")}>Our Story</button>
        </div>
      </section>


      <section className="flex flex-wrap justify-around text-center bg-white py-12 px-4 gap-8">
        <div className="max-w-xs">
          <h2 className="text-xl font-semibold text-[#6f4e37]">🍫 All Natural</h2>
          <p className="text-gray-600 mt-2">No additives, just pure chocolate goodness.</p>
        </div>
        <div className="max-w-xs">
          <h2 className="text-xl font-semibold text-[#6f4e37]">🌱 Ethically Sourced</h2>
          <p className="text-gray-600 mt-2">We partner with sustainable cocoa farms.</p>
        </div>
        <div className="max-w-xs">
          <h2 className="text-xl font-semibold text-[#6f4e37]">🎁 Perfect Gifts</h2>
          <p className="text-gray-600 mt-2">Wrapped with elegance and ready to impress.</p>
        </div>
      </section>
   
      <section className="bg-[#f3e8e3] py-12 px-4">
  <h2 className="text-center text-3xl font-bold text-[#6f4e37] mb-8">Featured Chocolates</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
  {/* Card 1 */}
  <div className="bg-white rounded-lg shadow text-center overflow-hidden">
    <img src="candy1.jpeg" alt="Dark Chocolate" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">Dark Indulgence</h3>
      <p className="text-[#6f4e37] font-medium my-2">₹14.99</p>
      <button
        className="bg-[#6f4e37] text-white py-2 px-4 rounded hover:bg-[#5a3f2d]"
        onClick={() =>
          addToCart({ id: 101, name: "Dark Indulgence", image: "candy1.jpeg", price: 14.99 })
        }
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-white rounded-lg shadow text-center overflow-hidden">
    <img src="candy2.jpeg" alt="Milk Chocolate" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">Milk Bliss</h3>
      <p className="text-[#6f4e37] font-medium my-2">₹12.49</p>
      <button
        className="bg-[#6f4e37] text-white py-2 px-4 rounded hover:bg-[#5a3f2d]"
        onClick={() =>
          addToCart({ id: 102, name: "Milk Bliss", image: "candy2.jpeg", price: 12.49 })
        }
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-white rounded-lg shadow text-center overflow-hidden">
    <img src="candy3.jpeg" alt="White Chocolate" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">White Charm</h3>
      <p className="text-[#6f4e37] font-medium my-2">₹13.99</p>
      <button
        className="bg-[#6f4e37] text-white py-2 px-4 rounded hover:bg-[#5a3f2d]"
        onClick={() =>
          addToCart({ id: 103, name: "White Charm", image: "candy3.jpeg", price: 13.99 })
        }
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Card 4 */}
  <div className="bg-white rounded-lg shadow text-center overflow-hidden">
    <img src="candy4.jpeg" alt="Hazelnut Chocolate" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">Nutty Crunch</h3>
      <p className="text-[#6f4e37] font-medium my-2">₹15.99</p>
      <button
        className="bg-[#6f4e37] text-white py-2 px-4 rounded hover:bg-[#5a3f2d]"
        onClick={() =>
          addToCart({ id: 104, name: "Nutty Crunch", image: "candy4.jpeg", price: 15.99 })
        }
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

</section>


      

     
      <section className="flex flex-wrap justify-center items-center bg-white py-12 px-4">
        <img src="image.png" alt="Our mission" className="w-full max-w-md rounded-lg mb-3 md:mb-0 mr-50" />
        <div className="md:ml- max-w-md">
          <h2 className="text-2xl font-bold text-[#6f4e37]">Our Sweet Mission</h2>
          <p className="text-gray-600 mt-4">We create chocolate that not only tastes heavenly, but also supports ethical farming and eco-friendly packaging.</p>
          <button className="mt-4 bg-[#6f4e37] text-white py-2 px-4 rounded hover:bg-[#5a3f2d]">Learn More</button>
        </div>
      </section>

      
      <section className="bg-[#f3e8e3] py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-[#6f4e37] mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow">
            <p>“Absolutely divine chocolates – rich, smooth, and beautifully packaged!”</p>
            <p className="text-gray-600 text-sm mt-2">– Emily R.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>“I gifted these to my team – and everyone was obsessed!”</p>
            <p className="text-gray-600 text-sm mt-2">– Arjun P.</p>
          </div>
        </div>
      </section>

    
      <section className="bg-[#6f4e37] text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Get the Sweetest News</h2>
        <p className="mt-2">Sign up to receive new flavors, deals & chocolate stories.</p>
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <input type="email" placeholder="you@example.com" className="px-4 py-2 rounded w-64 text-black" />
          <button className="bg-[#3e2c23] py-2 px-4 rounded hover:bg-[#2f201a]">Subscribe</button>
        </div>
      </section>

    
      <footer className="bg-[#3e2c23] text-white text-center py-6">
        <p>&copy; 2025 ChocoLuxe. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="underline">About</a>
          <a href="#" className="underline">Shop</a>
          <a href="#" className="underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
