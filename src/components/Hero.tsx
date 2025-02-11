import React from 'react';

export function Hero() {
  return (
    <div className="relative pt-16">
      <div 
        className="h-[70vh] bg-cover bg-center relative overflow-hidden" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50">
          <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay"></div>
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white px-4 transform translate-y-[-10%] relative">
              <div className="absolute -inset-x-20 inset-y-0 bg-primary-500/5 blur-3xl -z-10 animate-pulse"></div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
                La Casa Bonita
                <div className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 blur-lg"></div>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-stone-200 animate-slide-up">
                Authentic Spanish Cuisine in the Heart of the City
              </p>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <a 
                  href="#reserve" 
                  className="group relative inline-flex items-center justify-center bg-primary-500 text-white px-10 py-4 
                           rounded-full font-semibold transition-all duration-300 
                           hover:bg-primary-600 hover:scale-[1.02] hover:-translate-y-1 
                           hover:shadow-lg hover:shadow-primary-500/20 active:scale-[0.98]"
                >
                  <span className="relative z-10">Reserve a Table</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600/0 via-primary-600/50 to-primary-600/0 
                               opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}