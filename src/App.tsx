import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { ReservationForm } from './components/ReservationForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <ReservationForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;