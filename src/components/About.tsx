import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const infoItems = [
  { icon: MapPin, title: 'Location', content: ['123 Main Street', 'Your City, ST 12345'] },
  { icon: Clock, title: 'Hours', content: ['Tue-Sun: 5:00 PM - 10:00 PM', 'Monday: Closed'] },
  { icon: Phone, title: 'Contact', content: ['(555) 123-4567', 'info@lacasabonita.com'] }
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(232,93,69,0.1),transparent_70%)]"></div>
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-12 text-stone-800">
          <span className="relative">
            Our Story
            <span className="absolute -inset-x-6 -inset-y-4 bg-primary-500/10 blur-2xl -z-10"></span>
          </span>
        </h2>
        <p className="text-xl text-stone-600 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
          Welcome to La Casa Bonita, where traditional Spanish flavors meet modern culinary artistry. 
          For over two decades, we've been serving authentic Spanish dishes made with locally sourced 
          ingredients and time-honored recipes passed down through generations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {infoItems.map(({ icon: Icon, title, content }, index) => (
            <div key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-12 h-12 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-4 text-stone-800">{title}</h3>
              {content.map((line, i) => (
                <p key={i} className="text-stone-600">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}