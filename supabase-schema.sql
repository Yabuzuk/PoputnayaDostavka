-- Таблица пользователей
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица заявок
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT REFERENCES users(id),
  username TEXT,
  type TEXT CHECK (type IN ('sender', 'carrier')),
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  weight NUMERIC,
  price NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_requests_type ON requests(type);
CREATE INDEX idx_requests_date ON requests(date);
CREATE INDEX idx_requests_user ON requests(user_id);

-- RLS политики
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert themselves" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view requests" ON requests FOR SELECT USING (true);
CREATE POLICY "Users can create requests" ON requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own requests" ON requests FOR UPDATE USING (user_id = current_setting('app.user_id')::bigint);
CREATE POLICY "Users can delete own requests" ON requests FOR DELETE USING (user_id = current_setting('app.user_id')::bigint);
