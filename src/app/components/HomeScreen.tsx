import { Package, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { RequestCard } from './RequestCard';
import { useEffect, useState } from 'react';
import { supabase, Request } from '../../lib/supabase';

interface HomeScreenProps {
  username: string;
  onCreateSenderRequest: () => void;
  onCreateCarrierRequest: () => void;
  onShowContacts: (username: string) => void;
  onViewMatches: () => void;
}

export function HomeScreen({
  username,
  onCreateSenderRequest,
  onCreateCarrierRequest,
  onShowContacts,
  onViewMatches,
}: HomeScreenProps) {
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [matches, setMatches] = useState<Request[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const { data } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      const myReqs = data.filter(r => r.username === username);
      setMyRequests(myReqs);
      
      // Находим совпадения: противоположный тип + тот же маршрут + близкая дата
      const matchedReqs = data.filter(r => {
        if (r.username === username) return false;
        
        return myReqs.some(myReq => {
          const sameRoute = myReq.from_city === r.from_city && myReq.to_city === r.to_city;
          const oppositeType = myReq.type !== r.type;
          const myDate = new Date(myReq.date);
          const rDate = new Date(r.date);
          const daysDiff = Math.abs((myDate.getTime() - rDate.getTime()) / (1000 * 60 * 60 * 24));
          const closeDate = daysDiff <= 3; // ±3 дня
          
          return sameRoute && oppositeType && closeDate;
        });
      });
      
      setMatches(matchedReqs);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Шапка */}
      <div className="bg-white px-6 pt-12 pb-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Привет, {username}
            </h1>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {username.charAt(1).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="grid grid-cols-1 gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCreateSenderRequest}
            className="bg-blue-500 text-white p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors hover:bg-blue-600"
          >
            <Package className="w-6 h-6" strokeWidth={1.5} />
            <span className="font-medium text-lg">Отправить посылку</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCreateCarrierRequest}
            className="bg-gray-100 text-gray-900 p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors hover:bg-gray-200"
          >
            <Plane className="w-6 h-6" strokeWidth={1.5} />
            <span className="font-medium text-lg">Я лечу и могу взять груз</span>
          </motion.button>
        </div>
      </div>

      {/* Мои заявки */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Мои заявки</h2>
        {myRequests.length > 0 ? (
          myRequests.map((request) => (
            <RequestCard
              key={request.id}
              username={request.username}
              date={new Date(request.date).toLocaleDateString('ru')}
              weight={request.weight ? `${request.weight} кг` : undefined}
              price={request.price ? `${request.price} ₽` : undefined}
              from={request.from_city}
              to={request.to_city}
              type={request.type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Нет заявок</p>
        )}
      </div>

      {/* Совпадения */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Совпадения</h2>
          <button
            onClick={onViewMatches}
            className="text-blue-500 text-sm font-medium"
          >
            Все
          </button>
        </div>
        {matches.length > 0 ? (
          matches.slice(0, 3).map((match) => (
            <RequestCard
              key={match.id}
              username={match.username}
              date={new Date(match.date).toLocaleDateString('ru')}
              weight={match.weight ? `${match.weight} кг` : undefined}
              price={match.price ? `${match.price} ₽` : undefined}
              from={match.from_city}
              to={match.to_city}
              type={match.type}
              onShowContacts={onShowContacts}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Нет совпадений</p>
        )}
      </div>
    </motion.div>
  );
}
