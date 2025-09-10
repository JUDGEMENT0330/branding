'use client';

import React, { useState } from 'react';

const API_KEY = 'AIzaSyCOw3mjar1_5hzMwaC5iHvV1K-BUn0oNpI';

const BrandManual: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [manual, setManual] = useState('');

  const handleGenerateManual = async () => {
    if (!niche) return;
    setIsLoading(true);
    setManual('');

    const prompt = `Crea un manual de marca para una empresa en el nicho de "${niche}". Incluye:
    1.  **Nombre de la Marca:** Sugerencias de nombres.
    2.  **Eslogan:** Ideas de eslóganes.
    3.  **Paleta de Colores:** Sugerencias de paletas de colores con códigos hexadecimales.
    4.  **Estrategia de Marca:** Tono de voz, público objetivo y valores de la marca.
    5.  **Ejemplos de Contenido:** Ideas para publicaciones en redes sociales.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate brand manual');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setManual(generatedText);
    } catch (error) {
      console.error(error);
      setManual('Error al generar el manual de marca. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="brand-manual" className="container text-center p-5">
      <h2 className="mb-4">Manual de Marca Interactivo</h2>
      <p className="text-secondary mb-5">Genera un manual de marca completo con estrategias, paletas de colores y más.</p>
      <div className="glass-effect">
        <div className="mb-3">
          <label htmlFor="niche-input" className="form-label">Describe tu nicho de mercado:</label>
          <input 
            id="niche-input" 
            type="text" 
            className="form-control" 
            placeholder="Ej: Cafetería vegana, tienda de ropa vintage, etc."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleGenerateManual} disabled={isLoading}>
          {isLoading ? 'Generando Manual...' : 'Generar Manual de Marca'}
        </button>
        
        {manual && (
          <div className="mt-4 text-start">
            <h3 className="mb-3">Tu Manual de Marca:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 'inherit' }}>{manual}</pre>
          </div>
        )}

        <div className="mt-4">
          <a href="tel:+50378039807" className="btn btn-primary me-2">Contactanos</a>
          <a href="https://wa.me/50378039807?text=quiero%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="btn btn-success">Envia un mensaje</a>
        </div>
      </div>
    </section>
  );
};

export default BrandManual;
