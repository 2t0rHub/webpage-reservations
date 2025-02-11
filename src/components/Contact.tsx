import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-stone-800">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-stone-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-stone-800">Get in Touch</h3>
              <div className="space-y-6">
                <a 
                  href="https://maps.google.com/?q=123+Main+Street,Your+City,ST+12345" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-stone-600 hover:text-primary-600 transition-colors group"
                >
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0 group-hover:text-primary-500" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p>123 Main Street</p>
                    <p>Your City, ST 12345</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+15551234567" 
                  className="flex items-start gap-4 text-stone-600 hover:text-primary-600 transition-colors group"
                >
                  <Phone className="w-6 h-6 mt-1 flex-shrink-0 group-hover:text-primary-500" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p>(555) 123-4567</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@lacasabonita.com" 
                  className="flex items-start gap-4 text-stone-600 hover:text-primary-600 transition-colors group"
                >
                  <Mail className="w-6 h-6 mt-1 flex-shrink-0 group-hover:text-primary-500" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p>info@lacasabonita.com</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 text-stone-600">
                  <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p>Tuesday - Sunday: 5:00 PM - 11:30 PM</p>
                    <p>Monday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-stone-800">Quick Links</h3>
              <div className="space-y-4">
                <a href="#menu" className="block text-stone-600 hover:text-primary-600 transition-colors">View Our Menu</a>
                <a href="#reserve" className="block text-stone-600 hover:text-primary-600 transition-colors">Make a Reservation</a>
                <a href="#about" className="block text-stone-600 hover:text-primary-600 transition-colors">About Us</a>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="h-[500px] bg-stone-50 rounded-2xl shadow-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}