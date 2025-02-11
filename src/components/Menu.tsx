import React, { useState } from 'react';
import { Download, ChevronUp, ChevronDown } from 'lucide-react';
import { MenuCategory } from './MenuCategory';
import { generatePDF } from '../utils/pdfGenerator';

const menuCategories = [
  {
    name: 'Tapas',
    items: [
      { name: 'Patatas Bravas', description: 'Crispy potatoes with spicy tomato sauce', price: '8' },
      { name: 'Gambas al Ajillo', description: 'Garlic shrimp with olive oil', price: '12' },
      { name: 'Jamón Ibérico', description: 'Premium Iberian ham', price: '16' }
    ]
  },
  {
    name: 'Main Courses',
    items: [
      { name: 'Paella Valenciana', description: 'Traditional Spanish rice with seafood', price: '24' },
      { name: 'Cochinillo Asado', description: 'Roasted suckling pig with crispy skin', price: '28' },
      { name: 'Lubina a la Sal', description: 'Salt-baked sea bass', price: '26' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Crema Catalana', description: 'Spanish custard with caramelized sugar', price: '8' },
      { name: 'Churros con Chocolate', description: 'Traditional churros with hot chocolate', price: '7' }
    ]
  }
];

export function Menu() {
  const [isMenuSectionOpen, setIsMenuSectionOpen] = useState(true);

  return (
    <section id="menu" className="relative py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1619976336288-38db38e4c503?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/95 via-stone-950/90 to-stone-950/95"></div>
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 relative inline-block">
            Our Menu
            <div className="absolute -inset-x-8 -inset-y-4 bg-primary-500/20 blur-2xl -z-10"></div>
          </h2>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Experience the authentic flavors of Spain with our carefully curated menu, 
            featuring traditional recipes and the finest ingredients.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <button 
            onClick={() => setIsMenuSectionOpen(!isMenuSectionOpen)}
            className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold 
                     backdrop-blur-md hover:bg-white/20 transition-all duration-300 
                     hover:shadow-lg hover:shadow-white/5"
          >
            {isMenuSectionOpen ? (
              <>Hide Menu <ChevronUp className="w-5 h-5" /></>
            ) : (
              <>Show Menu <ChevronDown className="w-5 h-5" /></>
            )}
          </button>
          <button 
            onClick={generatePDF}
            className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold 
                     hover:bg-primary-600 transition-all duration-300 hover:shadow-lg 
                     hover:shadow-primary-500/20 group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Download PDF
          </button>
        </div>
        
        {isMenuSectionOpen && (
          <div className="space-y-8">
            {menuCategories.map((category, index) => (
              <MenuCategory key={index} {...category} />
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-2xl text-white mb-8">Ready to experience our delicious Spanish cuisine?</p>
          <a 
            href="#reserve" 
            className="inline-flex items-center bg-primary-500 text-white px-12 py-5 rounded-xl text-[1.25rem] 
                     font-semibold hover:bg-primary-600 transition-all duration-300 hover:shadow-lg 
                     hover:shadow-primary-500/20 transform scale-100 hover:scale-[1.05] active:scale-[1] 
                     transition-transform duration-200 ease-out will-change-transform transform-origin-center"
            style={{ backfaceVisibility: "hidden", perspective: "1000px" }}
          >
            Reserve Your Table Now
          </a>
        </div>
      </div>
    </section>
  );
}