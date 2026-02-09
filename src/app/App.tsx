import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomeScreen } from './components/HomeScreen';
import { CreateSenderRequest } from './components/CreateSenderRequest';
import { CreateCarrierRequest } from './components/CreateCarrierRequest';
import { MatchesScreen } from './components/MatchesScreen';
import { ContactsModal } from './components/ContactsModal';
import { BottomNav } from './components/BottomNav';
import { getTelegramUser } from '../lib/telegram';
import { supabase } from '../lib/supabase';

type Screen =
  | 'welcome'
  | 'home'
  | 'createSender'
  | 'createCarrier'
  | 'matches'
  | 'requests'
  | 'profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [telegramUser, setTelegramUser] = useState<any>(null);

  useEffect(() => {
    const user = getTelegramUser();
    if (user) {
      setTelegramUser(user);
      supabase.from('users').upsert({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }).then(() => {
        setIsLoggedIn(true);
        setCurrentScreen('home');
      });
    } else {
      // Моковый пользователь для тестирования
      const mockUser = {
        id: 123456789,
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User'
      };
      setTelegramUser(mockUser);
      setIsLoggedIn(true);
      setCurrentScreen('home');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'matches') {
      setCurrentScreen('matches');
    } else if (tab === 'requests') {
      setCurrentScreen('home'); // Можно добавить отдельный экран
    } else if (tab === 'profile') {
      setCurrentScreen('home'); // Можно добавить отдельный экран
    }
  };

  const handleShowContacts = (username: string) => {
    setSelectedUsername(username);
    setShowContactsModal(true);
  };

  const handleCreateSenderRequest = () => {
    setCurrentScreen('createSender');
  };

  const handleCreateCarrierRequest = () => {
    setCurrentScreen('createCarrier');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleSubmitRequest = () => {
    // После создания заявки возвращаемся на главную
    setCurrentScreen('home');
    setActiveTab('home');
  };

  // Экран приветствия убран - автоматический вход

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Экраны */}
      {currentScreen === 'home' && (
        <HomeScreen
          username={telegramUser?.username ? `@${telegramUser.username}` : '@testuser'}
          onCreateSenderRequest={handleCreateSenderRequest}
          onCreateCarrierRequest={handleCreateCarrierRequest}
          onShowContacts={() => handleShowContacts()}
          onViewMatches={() => setCurrentScreen('matches')}
        />
      )}

      {currentScreen === 'createSender' && (
        <CreateSenderRequest
          onBack={handleBackToHome}
          onSubmit={handleSubmitRequest}
        />
      )}

      {currentScreen === 'createCarrier' && (
        <CreateCarrierRequest
          onBack={handleBackToHome}
          onSubmit={handleSubmitRequest}
        />
      )}

      {currentScreen === 'matches' && (
        <MatchesScreen
          onBack={handleBackToHome}
          onShowContacts={() => handleShowContacts()}
        />
      )}

      {/* Нижнее меню (только для основных экранов) */}
      {(currentScreen === 'home' || currentScreen === 'matches') && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Модальное окно контактов */}
      <ContactsModal
        isOpen={showContactsModal}
        onClose={() => setShowContactsModal(false)}
        username={selectedUsername}
      />
    </div>
  );
}
