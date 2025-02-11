import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <UtensilsCrossed className="h-8 w-8 text-yellow-500" />
              <h3 className="text-xl font-semibold">La Casa Bonita</h3>
            </div>
            <p className="text-stone-400">Authentic Spanish cuisine in a warm and welcoming atmosphere.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <p className="text-stone-400">123 Main Street<br />Your City, ST 12345<br />(555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Hours</h3>
            <p className="text-stone-400">Tuesday - Sunday: 5:00 PM - 10:00 PM<br />Monday: Closed</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-stone-500">
          <p>&copy; {new Date().getFullYear()} La Casa Bonita. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}