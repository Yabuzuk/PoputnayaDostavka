import { ArrowLeft, Calendar, Image, MapPin, Weight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getTelegramUser } from '../../lib/telegram';
import { CityInput } from './CityInput';

interface CreateSenderRequestProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CreateSenderRequest({ onBack, onSubmit }: CreateSenderRequestProps) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    dateFrom: '',
    dateTo: '',
    weight: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getTelegramUser();
    
    await supabase.from('requests').insert({
      user_id: user?.id,
      username: user?.username ? `@${user.username}` : '@user',
      type: 'sender',
      from_city: formData.from,
      to_city: formData.to,
      date: formData.dateFrom,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      description: formData.description
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
            Создать заявку
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

        {/* Даты */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              С
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="date"
                value={formData.dateFrom}
                onChange={(e) =>
                  setFormData({ ...formData, dateFrom: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              По
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="date"
                value={formData.dateTo}
                onChange={(e) =>
                  setFormData({ ...formData, dateTo: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Вес */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вес (кг)
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

        {/* Описание */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Опишите груз"
            rows={4}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Фото */}
        <div className="mb-6">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:border-gray-400 transition-colors"
          >
            <Image className="w-5 h-5" strokeWidth={1.5} />
            <span>Добавить фото</span>
          </motion.button>
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
