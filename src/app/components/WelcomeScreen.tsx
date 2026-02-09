import { Plane } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onLogin: () => void;
}

export function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center"
      >
        {/* Логотип */}
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6">
          <Plane className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-3 text-center">
          Попутная доставка
        </h1>

        {/* Подзаголовок */}
        <p className="text-gray-500 text-center mb-12 max-w-xs">
          Отправляйте посылки с попутчиками
        </p>

        {/* Кнопка входа */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogin}
          className="bg-blue-500 text-white px-8 py-3.5 rounded-xl font-medium w-full max-w-xs transition-colors hover:bg-blue-600"
        >
          Войти через Telegram
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
