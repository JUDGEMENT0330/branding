
'use client';

import React from 'react';
import Image from 'next/image';

const navLinks = [
  { "text": "Inicio", "href": "#home" },
  { "text": "Branding", "href": "#branding" },
  { "text": "Paletas", "href": "#palettes" },
  { "text": "Contacto", "href": "#contact" }
];

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg glass-effect sticky-top p-3">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          <Image src="https://placehold.co/150x50/3A484A/FFFFFF?text=Aura+Studio" alt="Aura Studio Logo" width={150} height={50} className="d-inline-block align-text-top me-2" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <a className="nav-link" href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
