import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GalleryLightboxModal: React.FC = () => {
  const { selectedGalleryImage, setSelectedGalleryImage } = useApp();

  if (!selectedGalleryImage) return null;

  return (
    <div
      onClick={() => setSelectedGalleryImage(null)}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] bg-transparent rounded-2xl overflow-hidden flex flex-col items-center cursor-default"
      >
        <button
          onClick={() => setSelectedGalleryImage(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={selectedGalleryImage}
          alt="Imagem em Alta Resolução"
          className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="mt-4 flex items-center gap-3">
          <a
            href={selectedGalleryImage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir URL Direta
          </a>
        </div>
      </div>
    </div>
  );
};
