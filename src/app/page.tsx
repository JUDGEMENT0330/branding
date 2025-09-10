'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BrandManual from '../components/BrandManual';

const API_KEY = 'AIzaSyCOw3mjar1_5hzMwaC5iHvV1K-BUn0oNpI';

const pageData = {
  "website": {
    "name": "Sitio Web de Marca Dinámica",
    "brandName": "Aura Studio",
    "description": "Un sitio web interactivo donde la paleta de colores es seleccionable por el usuario, afectando el tema visual general y el contenido del carrusel de imágenes de marca.",
    "defaultPaletteId": "green-mist",
    "colorPalettes": [
      {
        "id": "green-mist",
        "name": "Niebla Verde",
        "colors": {
          "primary": "#9ABEA1",
          "secondary": "#3A484A",
          "accent": "#A8C7AA",
          "background": "#F1F4F2",
          "textPrimary": "#3A484A",
          "textSecondary": "#6F7F81"
        }
      },
      {
        "id": "ocean-depth",
        "name": "Profundidad del Océano",
        "colors": {
          "primary": "#0077B6",
          "secondary": "#023E8A",
          "accent": "#48CAE4",
          "background": "#CAF0F8",
          "textPrimary": "#023E8A",
          "textSecondary": "#0096C7"
        }
      },
      {
        "id": "sunset-warmth",
        "name": "Calidez del Atardecer",
        "colors": {
          "primary": "#F77F00",
          "secondary": "#D62828",
          "accent": "#FCBF49",
          "background": "#EAE2B7",
          "textPrimary": "#D62828",
          "textSecondary": "#5E2807"
        }
      }
    ],
    "layout": {
      "header": {
        "logoUrl": "https://placehold.co/150x50/3A484A/FFFFFF?text=Aura+Studio",
        "navLinks": [
          { "text": "Inicio", "href": "#home" },
          { "text": "Branding", "href": "#branding" },
          { "text": "Paletas", "href": "#palettes" },
          { "text": "Contacto", "href": "#contact" }
        ]
      },
      "heroSection": {
        "title": "Explora Nuestra Identidad Visual",
        "subtitle": "Nuestra marca se adapta. Selecciona una paleta de colores para ver nuestra identidad en acción y descubrir la versatilidad de nuestro diseño.",
        "ctaButton": {
          "text": "Ver Galería",
          "href": "#branding"
        }
      },
      "paletteSelectorSection": {
        "title": "Selecciona una Paleta de Colores",
        "description": "Cada paleta representa un estado de ánimo y una personalidad diferente para nuestra marca."
      },
      "brandingCarouselSection": {
        "title": "Galería de Marca",
        "description": "Aquí puedes ver ejemplos de nuestro material de marca, como logotipos, banners y maquetas, aplicando la paleta de colores que has seleccionado."
      },
      "footer": {
        "copyright": "© 2025 Aura Studio. Todos los derechos reservados.",
        "socialLinks": [
          { "name": "Instagram", "url": "#" },
          { "name": "Behance", "url": "#" },
          { "name": "LinkedIn", "url": "#" }
        ]
      }
    }
  }
};

async function generateImageFromGemini(prompt: string): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "contents": [
        {
          "parts": [
            { "text": prompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  const data = await response.json();
  console.log('Gemini API Response:', JSON.stringify(data, null, 2));
  const imageBase64 = data.candidates[0].content.parts[0].inlineData.data;
  return `data:image/png;base64,${imageBase64}`;
}

export default function Home() {
  const [palette, setPalette] = useState(pageData.website.defaultPaletteId);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [brandingImages, setBrandingImages] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  useEffect(() => {
    const generateCarouselImages = async () => {
      const carouselPrompts = [
        'a logo for a coffee shop called Astro Coffee, minimalist style, with a rocket and a coffee bean',
        'a mascot for a tech company, a friendly robot named Chip',
        'a wallpaper for a phone, with a neon landscape and cyberpunk style'
      ];
      
      try {
        const images = await Promise.all(carouselPrompts.map(p => generateImageFromGemini(p)));
        setBrandingImages(images);
      } catch (error) {
        console.error("Error generating carousel images:", error);
      }
    };
    generateCarouselImages();
  }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setResult('');
    try {
      const imageUrl = await generateImageFromGemini(prompt);
      setResult(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      setResult('Error al generar la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentPalette = pageData.website.colorPalettes.find(p => p.id === palette);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header id="home" className="container text-center p-5 my-5">
        <h1 className="display-4 fw-bold">{pageData.website.layout.heroSection.title}</h1>
        <p className="lead col-md-8 mx-auto">{pageData.website.layout.heroSection.subtitle}</p>
        <a href={pageData.website.layout.heroSection.ctaButton.href} className="btn btn-primary btn-lg">{pageData.website.layout.heroSection.ctaButton.text}</a>
      </header>

      {/* Generator Section */}
      <section id="generator" className="container text-center p-5">
        <h2 className="mb-4">Generador de Diseños</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="glass-effect">
              <div className="mb-3">
                <label htmlFor="prompt-input" className="form-label">Describe tu idea:</label>
                <textarea 
                  id="prompt-input" 
                  className="form-control" 
                  rows={3} 
                  placeholder="Ej: Un logo para una cafetería..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-primary" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generando...' : 'Generar Logo'}
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <div className="col-md-8 text-center">
                <h3 className="mb-4">Resultado</h3>
                <div className="p-4 border rounded" style={{minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {isLoading && (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {result && <img src={result} alt="Generated Design" className="img-fluid rounded" />}
                    {!isLoading && !result && <p className="text-muted">El diseño generado aparecerá aquí.</p>}
                </div>
            </div>
        </div>
      </section>

      <BrandManual />

      {/* Palette Selector */}
      <section id="palettes" className="container text-center p-5">
        <h2 className="mb-4">{pageData.website.layout.paletteSelectorSection.title}</h2>
        <p className="text-secondary mb-5">{pageData.website.layout.paletteSelectorSection.description}</p>
        <div className="row justify-content-center">
          {pageData.website.colorPalettes.map(p => (
            <div key={p.id} className="col-md-3">
              <div className="card mb-4 shadow-sm" onClick={() => setPalette(p.id)} style={{cursor: 'pointer'}}>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <div className="d-flex justify-content-center">
                    {Object.values(p.colors).map((color, index) => (
                      <div key={index} style={{ backgroundColor: color, width: '20px', height: '20px', borderRadius: '50%', margin: '2px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Branding Carousel */}
      <section id="branding" className="container-fluid bg-secondary text-white p-5">
        <div className="container">
          <h2 className="text-center mb-4">{pageData.website.layout.brandingCarouselSection.title}</h2>
          <p className="text-center col-md-8 mx-auto mb-5">{pageData.website.layout.brandingCarouselSection.description}</p>
          <div className="carousel-container">
            {brandingImages.map((image, index) => (
              <div key={index} className={`col-md-4 ${index !== 1 ? 'carousel-card-inactive' : ''}`}>
                <div className="card carousel-card">
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Branding image ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container text-center p-5 my-5">
        <h2>Contacto</h2>
        <p>Ponte en contacto con nosotros para colaborar.</p>
        <a href="mailto:" className="btn btn-primary">Enviar un correo</a>
      </section>


      {/* Footer */}
      <footer className="bg-secondary text-white text-center p-4">
        <div className="container">
          <p>{pageData.website.layout.footer.copyright}</p>
          <div>
            {pageData.website.layout.footer.socialLinks.map(link => (
              <a key={link.name} href={link.url} className="text-white me-3">{link.name}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
