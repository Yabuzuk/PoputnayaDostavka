import { ArrowLeft, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { RequestCard } from './RequestCard';
import { useState, useEffect } from 'react';
import { supabase, Request } from '../../lib/supabase';

interface MatchesScreenProps {
  onBack: () => void;
  onShowContacts: () => void;
}

export function MatchesScreen({ onBack, onShowContacts }: MatchesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<Request[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const { data } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMatches(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Шапка */}
      <div className="bg-white px-6 pt-12 pb-4 mb-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
          </motion.button>
          <h1 className="text-2xl font-semibold text-gray-900">Совпадения</h1>
        </div>

        {/* Поиск */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по маршруту или дате"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Список совпадений */}
      <div className="px-6">
        {matches.length > 0 ? (
          matches.map((match) => (
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
          <p className="text-gray-500 text-center py-4">Нет заявок</p>
        )}
      </div>
    </motion.div>
  );
}
