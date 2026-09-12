import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ExternalLink, ThumbsUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/defaultData';

export const ReviewsSection: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Direct user to Google Maps review page
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          'Will Pizzaria e Fahitas Namibe'
        )}`,
        '_blank'
      );
      setShowReviewModal(false);
      setSubmitted(false);
      setComment('');
      setName('');
    }, 1500);
  };

  return (
    <section id="avaliacoes" className="w-full py-20 bg-[#f6f3ee] border-b border-[#e5e2dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
              Métricas Públicas
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1c1c19] tracking-tight">
              Avaliações Confirmadas
            </h2>
          </div>
          <p className="text-sm text-[#58413c] max-w-md leading-relaxed">
            Apresentamos exclusivamente métricas reais e confirmadas por clientes no perfil do Google. Não geramos depoimentos fictícios.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Score */}
          <div className="p-8 rounded-2xl bg-white shadow-sm border border-[#e5e2dd] flex flex-col justify-center items-center text-center gap-3">
            <span className="font-serif-display text-5xl font-bold text-[#c84b31] leading-none">
              4,2
            </span>
            <div className="flex items-center text-[#fdb56e]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <Star className="w-5 h-5 fill-current opacity-60" />
            </div>
            <span className="text-base font-bold text-[#1c1c19]">
              Pontuação Média Geral
            </span>
            <span className="text-xs text-[#885213] font-medium bg-[#f6f3ee] px-3 py-1 rounded-full border border-[#e5e2dd]">
              Escala de 1 a 5 no Google Maps
            </span>
          </div>

          {/* Card 2: Verified Volume */}
          <div className="p-8 rounded-2xl bg-white shadow-sm border border-[#e5e2dd] flex flex-col justify-center items-center text-center gap-3">
            <span className="font-serif-display text-5xl font-bold text-[#885213] leading-none">
              10
            </span>
            <span className="text-base font-bold text-[#1c1c19]">
              Avaliações Verificadas
            </span>
            <p className="text-xs sm:text-sm text-[#58413c] max-w-xs leading-relaxed">
              Volume de opiniões registadas publicamente na plataforma Google Maps no Namibe, Angola.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
              <CheckCircle className="w-4 h-4" />
              <span>100% Autêntico e Verificado</span>
            </div>
          </div>

          {/* Card 3: Call to Action */}
          <div className="p-8 rounded-2xl bg-white shadow-sm border border-[#e5e2dd] flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#c84b31] uppercase tracking-wider">
                A sua Experiência
              </span>
              <h3 className="font-serif-display text-xl font-bold text-[#1c1c19]">
                Partilhe a Sua Avaliação
              </h3>
              <p className="text-xs sm:text-sm text-[#58413c] leading-relaxed">
                Já visitou a Will Pizzaria e Fahitas ou encomendou para sua casa? A sua opinião direta ajuda a aprimorar o serviço no Namibe.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowReviewModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#f0ede9] hover:bg-[#ffdad3]/50 text-[#1c1c19] text-xs font-bold px-4 py-3 rounded-xl border border-[#e5e2dd] transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#c84b31]" />
                Registrar Feedback Rápido
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'Will Pizzaria e Fahitas Namibe'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-[#885213] hover:underline font-semibold"
              >
                <span>Escrever Avaliação no Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Review Feedback Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-xl font-bold text-[#1c1c19]">
                Partilhar Avaliação
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#58413c] hover:text-[#1c1c19] text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-[#1c1c19]">
                  Obrigado pelo seu feedback!
                </h4>
                <p className="text-xs text-[#58413c]">
                  A redirecionar para o perfil oficial no Google Maps...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                    Sua Classificação (1 a 5 estrelas)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'text-[#fdb56e] fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gabriel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                    Comentário ou Experiência
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte como foi a pizza, fahita ou atendimento..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold py-3 rounded-xl transition-all shadow"
                >
                  Enviar e Abrir no Google Maps
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
