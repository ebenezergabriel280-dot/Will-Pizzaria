import React, { useState } from 'react';
import { X, CalendarCheck, Users, Clock, Phone, User, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reservation } from '../types';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, makeReservation } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<Reservation>({
    fullName: '',
    phone: '',
    date: todayStr,
    time: '19:30',
    guests: 2,
    notes: '',
  });

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    makeReservation(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#e5e2dd] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#fcf9f4] border-b border-[#e5e2dd] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#c84b31] text-white flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1c1c19]">
                Reserva de Mesa
              </h3>
              <p className="text-xs text-[#58413c]">
                Will Pizzaria e Fahitas • Namibe, Angola
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReservationOpen(false)}
            className="p-1.5 rounded-lg text-[#58413c] hover:bg-[#f0ede9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                Telefone de Contacto
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+244 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                Data
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                Horário
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
                Pessoas
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'pessoa' : 'pessoas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider block mb-1">
              Observações (Ocasião especial, preferência de mesa, etc.)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Aniversário em família, preferência próxima ao forno ou área exterior"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-[#e5e2dd] focus:border-[#c84b31] outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#f6f3ee] text-[#58413c] text-xs flex items-center gap-2 border border-[#e5e2dd]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Reserva sem taxa antecipada. A equipa confirma de imediato via WhatsApp.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReservationOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#58413c] hover:bg-[#f0ede9]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#c84b31] hover:bg-[#a6331b] text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
