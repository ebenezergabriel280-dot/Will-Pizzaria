import React, { useState } from 'react';
import { X, Copy, Check, RotateCcw, ExternalLink, Image as ImageIcon, Code2, Sparkles, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppImages } from '../types';

interface ImageFieldMeta {
  key: keyof AppImages;
  label: string;
  section: string;
  description: string;
}

const IMAGE_FIELDS: ImageFieldMeta[] = [
  {
    key: 'logo',
    label: 'Logótipo Oficial',
    section: 'Identidade Visual & Cabeçalho',
    description: 'Ícone circular do forno com fatia de pizza, fahita enrolada e fogo.',
  },
  {
    key: 'heroBg',
    label: 'Fundo do Hero (Forno & Pizzaiolo)',
    section: 'Seção de Abertura (Hero)',
    description: 'Fotografia rústica do forno com labaredas, tijolos e pizza na pá.',
  },
  {
    key: 'pizzasCover',
    label: 'Capa das Pizzas Tradicionais',
    section: 'Cardápio - Categoria Pizzas',
    description: 'Pizza artesanal saindo do forno com queijo derretido e manjericão.',
  },
  {
    key: 'fahitasCover',
    label: 'Capa das Fahitas Especiais',
    section: 'Cardápio - Categoria Fahitas',
    description: 'Frigideira de ferro com carnes e pimentos fumegantes.',
  },
  {
    key: 'drinksCover',
    label: 'Capa das Bebidas & Sumos',
    section: 'Cardápio - Categoria Bebidas',
    description: 'Copos e jarras de sumos naturais de frutos tropicais frescos.',
  },
  {
    key: 'mapPreview',
    label: 'Referência do Mapa (Namibe)',
    section: 'Localização & GPS',
    description: 'Imagem referencial de mapa da orla e avenidas do Namibe.',
  },
  {
    key: 'gallery1',
    label: 'Galeria 1 (#FornoALenha)',
    section: 'Redes Sociais / Instagram',
    description: 'Forno a lenha com chamas vivas e borda borbulhante.',
  },
  {
    key: 'gallery2',
    label: 'Galeria 2 (#FahitasNamibe)',
    section: 'Redes Sociais / Instagram',
    description: 'Prato de fahitas com legumes coloridos e tortilhas.',
  },
  {
    key: 'gallery3',
    label: 'Galeria 3 (#TakeAway)',
    section: 'Redes Sociais / Instagram',
    description: 'Caixa de pizza para entrega e take-away no balcão.',
  },
  {
    key: 'gallery4',
    label: 'Galeria 4 (#IngredientesFrescos)',
    section: 'Redes Sociais / Instagram',
    description: 'Tomates San Marzano frescos, muçarela e ervas.',
  },
];

export const ImageManagerModal: React.FC = () => {
  const { images, updateImage, resetImages, isImageManagerOpen, setIsImageManagerOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'editor' | 'htmlCode'>('editor');
  const [tempValues, setTempValues] = useState<AppImages>({ ...images });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [htmlCopied, setHtmlCopied] = useState(false);

  if (!isImageManagerOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleSaveIndividual = (key: keyof AppImages) => {
    updateImage(key, tempValues[key]);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 1500);
  };

  const handleSaveAll = () => {
    (Object.keys(tempValues) as (keyof AppImages)[]).forEach((key) => {
      updateImage(key, tempValues[key]);
    });
    setSavedKey('all');
    setTimeout(() => setSavedKey(null), 2000);
  };

  const generatedHtmlSnippet = `<!-- EXEMPLO DE USO COM LINKS DIRETOS NO HTML -->

<!-- 1. Logotipo Oficial -->
<img 
  src="${images.logo}" 
  alt="Will Pizzaria e Fahitas Logo" 
  referrerpolicy="no-referrer"
  class="w-12 h-12 rounded-full object-cover" 
/>

<!-- 2. Imagem de Fundo (Hero Banner) -->
<div 
  class="hero-banner" 
  style="background-image: url('${images.heroBg}'); background-size: cover; background-position: center;"
>
  <h1>Will Pizzaria e Fahitas - Namibe</h1>
</div>

<!-- 3. Prato de Pizza Tradicional -->
<img 
  src="${images.pizzasCover}" 
  alt="Pizzas no Forno a Lenha" 
  referrerpolicy="no-referrer"
  loading="lazy" 
/>

<!-- 4. Prato de Fahitas -->
<img 
  src="${images.fahitasCover}" 
  alt="Fahitas Especiais da Casa" 
  referrerpolicy="no-referrer"
  loading="lazy" 
/>

<!-- Dica: Use sempre referrerpolicy="no-referrer" para garantir que links do Google UserContent carreguem sem restrição de domínio. -->`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#e5e2dd] overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-6 py-5 bg-[#fcf9f4] border-b border-[#e5e2dd] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c84b31] text-white flex items-center justify-center shadow-md">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1c1c19]">
                Gerenciador de Links Diretos de Imagens
              </h3>
              <p className="text-xs text-[#58413c]">
                Sim! Você pode usar, testar e substituir links diretos para qualquer imagem do HTML.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsImageManagerOpen(false)}
            className="p-2 rounded-xl text-[#58413c] hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-3 pb-2 bg-[#fcf9f4] flex items-center gap-2 border-b border-[#e5e2dd]">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-[#c84b31] text-white shadow-sm'
                : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Editar Links Diretos ({IMAGE_FIELDS.length})
          </button>
          <button
            onClick={() => setActiveTab('htmlCode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'htmlCode'
                ? 'bg-[#c84b31] text-white shadow-sm'
                : 'bg-white text-[#58413c] hover:bg-[#f0ede9] border border-[#e5e2dd]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Exemplo de Código HTML
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'editor' ? (
            <>
              {/* Informative Explanation answering user's prompt */}
              <div className="p-4 rounded-2xl bg-[#ffdad3]/30 border border-[#c84b31]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#c84b31] shrink-0 mt-0.5" />
                <div className="text-xs text-[#58413c] space-y-1">
                  <span className="font-bold text-[#1c1c19] block text-sm">
                    Como funcionam os links diretos para imagens no HTML?
                  </span>
                  <p>
                    Você pode colar <strong>qualquer URL direta de imagem</strong> (de serviços como Google User Content, Cloudinary, Imgur, CDN próprio, Unsplash ou qualquer servidor web). O aplicativo atualiza a imagem em tempo real na tela e guarda no navegador!
                  </p>
                </div>
              </div>

              {/* List of Image Inputs */}
              <div className="space-y-4">
                {IMAGE_FIELDS.map((field) => {
                  const currentValue = tempValues[field.key];
                  const isModified = currentValue !== images[field.key];

                  return (
                    <div
                      key={field.key}
                      className="p-4 rounded-2xl border border-[#e5e2dd] bg-[#fcf9f4] hover:border-[#c84b31]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#e5e2dd] shrink-0 border border-[#d5c3bd] group">
                        <img
                          src={currentValue}
                          alt={field.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Visual fallback indicator
                            (e.target as HTMLImageElement).src =
                              'https://placehold.co/100x100?text=Link+Invalido';
                          }}
                        />
                        <a
                          href={currentValue}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          title="Abrir imagem original"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Content & Inputs */}
                      <div className="flex-1 w-full space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#885213] uppercase">
                            {field.section}
                          </span>
                          <span className="text-[11px] text-[#58413c] font-medium">
                            Chave: <code>{field.key}</code>
                          </span>
                        </div>
                        <h4 className="font-serif-display text-base font-bold text-[#1c1c19]">
                          {field.label}
                        </h4>
                        <p className="text-xs text-[#58413c] line-clamp-1">
                          {field.description}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="url"
                            value={currentValue}
                            onChange={(e) =>
                              setTempValues((prev) => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                            placeholder="https://..."
                            className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#e5e2dd] bg-white focus:border-[#c84b31] outline-none font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => handleCopy(field.key, currentValue)}
                            className="px-2.5 py-2 rounded-xl bg-white hover:bg-[#f0ede9] text-[#58413c] border border-[#e5e2dd] text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Copiar URL direta"
                          >
                            {copiedKey === field.key ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">Copiar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveIndividual(field.key)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                              isModified
                                ? 'bg-[#c84b31] hover:bg-[#a6331b] text-white shadow-sm'
                                : 'bg-[#f0ede9] text-[#58413c]'
                            }`}
                          >
                            {savedKey === field.key ? 'Salvo!' : 'Aplicar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#f0ede9] border border-[#e5e2dd]">
                <h4 className="font-bold text-sm text-[#1c1c19] mb-1">
                  Inserção Direta no HTML nativo:
                </h4>
                <p className="text-xs text-[#58413c]">
                  Copie este código para usar as mesmas imagens diretas em qualquer página HTML estática, landing page ou outro framework:
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-[#1c1c19] text-[#f3f0eb] font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                  {generatedHtmlSnippet}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedHtmlSnippet);
                    setHtmlCopied(true);
                    setTimeout(() => setHtmlCopied(false), 2000);
                  }}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {htmlCopied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar Snippet HTML
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#fcf9f4] border-t border-[#e5e2dd] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={resetImages}
            className="px-4 py-2.5 rounded-xl border border-[#e5e2dd] text-xs font-semibold text-[#885213] hover:bg-[#f0ede9] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Links Originais
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsImageManagerOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#58413c] hover:bg-[#f0ede9] transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              {savedKey === 'all' ? 'Todas Salvas!' : 'Salvar Todas as Imagens'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
