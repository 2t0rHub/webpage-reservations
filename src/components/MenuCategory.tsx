import React from 'react';
import { MenuItem } from './MenuItem';

interface MenuCategoryProps {
  name: string;
  items: {
    name: string;
    description: string;
    price: string;
  }[];
}

export function MenuCategory({ name, items }: MenuCategoryProps) {
  return (
    <div className="group bg-white/10 backdrop-blur-md p-10 rounded-2xl hover:bg-white/15 
                    transition-all duration-500 relative overflow-hidden border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 
                    -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <h3 className="text-3xl font-semibold mb-10 text-center text-white relative">
        <span className="relative z-10">{name}</span>
        <span className="absolute inset-x-0 bottom-0 h-3 bg-primary-500/20 -rotate-1 
                      group-hover:rotate-0 transition-transform duration-300"></span>
      </h3>
      <div className="space-y-8">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}