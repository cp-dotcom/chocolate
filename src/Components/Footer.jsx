import { Facebook, Instagram, LucideTwitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <footer className="bg-[#6f4e37] text-white py-12 inset-shadow-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 h-35">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#f3a847]">ChocoLuxe</h3>
                <p className="mb-4">Crafting exceptional chocolate experiences since 2025</p>
               <div className="flex gap-4">
                  {[
                    { name: 'Instagram', icon: <Instagram/> },
                    { name: 'Facebook', icon: <Facebook/> },
                    { name: 'Twitter', icon: <LucideTwitter/> },
                  ].map(({ name, icon }) => (
                    <a
                      key={name}
                      href="#"
                      className="w-8 h-8 bg-[#5a3f2d] text-white rounded-full flex items-center justify-center hover:bg-[#f3a847] transition" 
                      >
                      <span className="sr-only">{name}</span>
                      {icon}
                    </a>
                  ))}
                </div>
    
              </div>
              <div>
                <h4 className="font-bold mb-4">Shop</h4>
                <ul className="space-y-2">
                  {['All Chocolates', 'Collections', 'Gift Boxes', 'Seasonal Specials'].map((item) => (
                    <li key={item}><Link to="/Products" className="hover:text-[#f3a847] transition">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2">
                  {['Our Story', 'Sustainability', 'Chocolate Making', 'Locations'].map((item) => (
                    <li key={item}><Link to="/About" className="hover:text-[#f3a847] transition">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <address className="not-italic">
                  <p className="mb-2">ChocoLux</p>
                  <p className="mb-2">malappuram</p>
                  <p className="mb-2">Phone: 9895456367</p>
                  <p>Email: vishnu@gmail.com</p>
                </address>
              </div>
            </div>
            <div className="border-t border-black mt-8 pt-4 text-center text-sm   ">
              <p>&copy; {new Date().getFullYear()} ChocoLux. All rights reserved.</p>
            </div>
          </footer>
    </>
  )
}

export default Footer
