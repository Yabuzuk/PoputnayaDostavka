import { Calendar, Weight, MapPin, Package, Plane } from 'lucide-react';
import { motion } from 'motion/react';

interface RequestCardProps {
  username: string;
  date: string;
  weight?: string;
  price?: string;
  from: string;
  to: string;
  type?: 'sender' | 'carrier';
  onShowContacts?: (username: string) => void;
}

export function RequestCard({
  username,
  date,
  weight,
  price,
  from,
  to,
  type = 'sender',
  onShowContacts,
}: RequestCardProps) {
  const isSender = type === 'sender';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 rounded-2xl p-4 mb-3 ${
        isSender 
          ? 'bg-blue-50 border-blue-200' 
          : 'bg-green-50 border-green-200'
      }`}
    >
      {/* Пользователь */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            isSender ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            <span className="text-white font-medium">
              {username.charAt(1).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-900">{username}</span>
        </div>
        <div className={`p-2 rounded-lg ${
          isSender ? 'bg-blue-100' : 'bg-green-100'
        }`}>
          {isSender ? (
            <Package className={`w-5 h-5 ${isSender ? 'text-blue-600' : 'text-green-600'}`} strokeWidth={1.5} />
          ) : (
            <Plane className={`w-5 h-5 text-green-600`} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* Маршрут */}
      <div className="flex items-center gap-2 mb-2 text-sm">
        <MapPin className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
        <span className="text-gray-600">
          {from} → {to}
        </span>
      </div>

      {/* Детали */}
      <div className="flex items-center gap-4 text-sm mb-3">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          <span>{date}</span>
        </div>
        {weight && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <Weight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            <span>{weight}</span>
          </div>
        )}
      </div>

      {/* Цена */}
      {price && (
        <div className="mb-3">
          <span className="text-lg font-semibold text-gray-900">{price}</span>
        </div>
      )}

      {/* Кнопка */}
      {onShowContacts && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onShowContacts(username)}
          className={`w-full text-white py-2.5 rounded-xl font-medium transition-colors ${
            isSender 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Показать контакты
        </motion.button>
      )}
    </motion.div>
  );
}
