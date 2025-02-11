import React, { useState } from 'react';
import { Menu, UtensilsCrossed } from 'lucide-react';

const navItems = ['about', 'menu', 'reserve', 'contact'];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-stone-900/95 backdrop-blur-sm text-white fixed w-full z-10 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center group">
            <UtensilsCrossed className="h-8 w-8 text-primary-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="ml-2 text-xl font-semibold">La Casa Bonita</span>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:text-primary-500 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="hover:text-primary-400 transition-colors relative group"
              >
                <span className="capitalize">{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-stone-900/95 backdrop-blur-sm border-t border-stone-800">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="block px-3 py-2 hover:text-primary-400 transition-colors capitalize"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}