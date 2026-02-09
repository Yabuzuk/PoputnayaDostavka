import { ArrowLeft, Calendar, DollarSign, MapPin, Weight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getTelegramUser } from '../../lib/telegram';
import { CityInput } from './CityInput';

interface CreateCarrierRequestProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CreateCarrierRequest({ onBack, onSubmit }: CreateCarrierRequestProps) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    weight: '',
    price: '',
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getTelegramUser();
    
    await supabase.from('requests').insert({
      user_id: user?.id,
      username: user?.username ? `@${user.username}` : '@user',
      type: 'carrier',
      from_city: formData.from,
      to_city: formData.to,
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      price: formData.price ? parseFloat(formData.price) : null,
      description: formData.comment
    });
    
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Шапка */}
      <div className="bg-white px-6 pt-12 pb-4 mb-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
          </motion.button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Заявка перевозчика
          </h1>
        </div>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="px-6 pb-6">
        {/* Откуда */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Откуда
          </label>
          <CityInput
            value={formData.from}
            onChange={(val) => setFormData({ ...formData, from: val })}
            placeholder="Введите город"
          />
        </div>

        {/* Куда */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Куда
          </label>
          <CityInput
            value={formData.to}
            onChange={(val) => setFormData({ ...formData, to: val })}
            placeholder="Введите город"
          />
        </div>

        {/* Дата */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата вылета
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              strokeWidth={1.5}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Вес */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Могу взять (кг)
          </label>
          <div className="relative">
            <Weight
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              strokeWidth={1.5}
            />
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="Введите вес"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Цена */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена за кг (₽)
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              strokeWidth={1.5}
            />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Введите цену"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Комментарий */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Комментарий
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Дополнительная информация"
            rows={4}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Кнопка создания */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-medium transition-colors hover:bg-blue-600"
        >
          Создать заявку
        </motion.button>
      </form>
    </motion.div>
  );
}