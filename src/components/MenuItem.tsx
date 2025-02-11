import React from 'react';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
}

export function MenuItem({ name, description, price }: MenuItemProps) {
  return (
    <div className="group flex flex-col md:flex-row justify-between items-start md:items-center 
                    border-b border-white/10 pb-6 last:border-0 last:pb-0 hover:bg-white/5 -mx-4 px-4 
                    transition-colors duration-300 rounded-lg">
      <div className="mb-2 md:mb-0 flex-1">
        <h4 className="text-xl font-medium text-white group-hover:text-primary-400 
                     transition-colors duration-300 relative">
          {name}
          <span className="absolute -inset-x-2 inset-y-0 bg-primary-500/0 
                        group-hover:bg-primary-500/10 rounded-lg -z-10 
                        transition-colors duration-300"></span>
        </h4>
        <p className="text-stone-400 text-lg group-hover:text-stone-300 
                    transition-colors duration-300">{description}</p>
      </div>
      <span className="text-primary-400 font-semibold text-2xl md:ml-8 
                     group-hover:scale-110 group-hover:text-primary-300 
                     transition-all duration-300">${price}</span>
    </div>
  );
}