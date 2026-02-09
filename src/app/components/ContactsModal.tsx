import { CheckCircle2, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export function ContactsModal({ isOpen, onClose, username }: ContactsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Оверлей */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Модальное окно */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full relative"
            >
              {/* Кнопка закрытия */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </motion.button>

              {/* Иконка успеха */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2
                    className="w-10 h-10 text-green-500"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Заголовок */}
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                Контакты открыты
              </h2>

              {/* Юзернейм */}
              <p className="text-center text-gray-600 mb-6">
                Свяжитесь с пользователем
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                <span className="text-lg font-medium text-gray-900">
                  {username}
                </span>
              </div>

              {/* Кнопка */}
              <motion.a
                href={`https://t.me/${username.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors hover:bg-blue-600"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
                <span>Написать в Telegram</span>
              </motion.a>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
