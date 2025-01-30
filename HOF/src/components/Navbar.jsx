import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Grievance Redressal</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300 text-xl">Home</Link>
          <Link to="/contact" className="hover:text-blue-300 text-xl">Contact</Link>
          <Link to="/login" className="hover:text-blue-300 text-xl">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;