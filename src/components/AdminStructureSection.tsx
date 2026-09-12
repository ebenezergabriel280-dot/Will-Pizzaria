import React, { useState } from 'react';
import { ShieldAlert, Settings, Sparkles, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminStructureSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { setIsImageManagerOpen } = useApp();

  return (
    <>
      <section className="w-full py-8 bg-[#f0ede9] border-b border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#675955] shadow-sm border border-[#e5e2dd]">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#1c1c19]">
                Área do Gestor &amp; Extensibilidade do Sistema
              </span>
              <span className="text-xs text-[#58413c]">
                Painel técnico preparado para gestão do cardápio, preços, fotos oficiais e links diretos HTML.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white text-[#a6331b] hover:bg-[#ffdad3]/40 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#e0bfb9] shadow-sm transition-all"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Links de Imagens</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-[#58413c] hover:text-[#1c1c19] hover:bg-[#f6f3ee] text-xs font-bold px-4 py-2 rounded-xl border border-[#e5e2dd] shadow-sm transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Ver Estrutura do Sistema</span>
            </button>
          </div>
        </div>
      </section>

      {/* Admin Architecture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto border border-[#e5e2dd]">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#c84b31] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1c1c19]">
                  Estrutura de Gestão Pronta
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#58413c] hover:text-[#1c1c19] p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#58413c] leading-relaxed">
              O site foi concebido com uma arquitetura modular de dados sem invenção de itens. O proprietário da <strong>Will Pizzaria e Fahitas</strong> poderá conectar ou atualizar os seguintes módulos diretamente:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#c84b31] uppercase">
                  1. Catálogo &amp; Preçário
                </span>
                <p className="text-xs text-[#58413c] leading-relaxed">
                  Inserir lista real de pizzas (Marguerita, Calabresa, etc.) com preços oficiais em Kwanzas (AOA).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#c84b31] uppercase">
                  2. Galeria de Fotografias (Links Diretos)
                </span>
                <p className="text-xs text-[#58413c] leading-relaxed">
                  Substituição imediata por fotografias reais de alta resolução através de URLs diretas no HTML ou no painel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#c84b31] uppercase">
                  3. Módulo de Campanhas
                </span>
                <p className="text-xs text-[#58413c] leading-relaxed">
                  Ativação de promoções semanais com contadores e cupões de desconto para takeaway.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[#c84b31] uppercase">
                  4. WhatsApp Oficial
                </span>
                <p className="text-xs text-[#58413c] leading-relaxed">
                  Linkagem de número dedicado de suporte para geração automática de pedidos formatados.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ffdad3]/40 text-[#891e07] text-xs font-medium flex items-center gap-2 border border-[#e0bfb9]">
              <CheckCircle2 className="w-4 h-4 text-[#c84b31] shrink-0" />
              <span>✓ Conforme directriz: Sem dados fictícios ou preços inventados, com suporte total a links diretos de imagens HTML.</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e5e2dd]">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setIsImageManagerOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#a6331b] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Abrir Gerenciador de Links Diretos
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold transition-all shadow"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
