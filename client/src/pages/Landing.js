import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, Zap, Shield, Users, Star, CheckCircle,
  ArrowRight, Sparkles, Palette, Home
} from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-примерка за 10 секунд",
      description: "Нейросеть анализирует интерьер и реалистично встраивает искусство"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Гарантия точности 95%",
      description: "Точное соответствие перспективы, освещения и масштаба"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Для профессионалов",
      description: "Инструменты для галерей, дизайнеров и художников"
    }
  ];

  const testimonials = [
    {
      name: "Мария Иванова",
      role: "Владелица галереи ArtSpace",
      content: "Продажи выросли на 40% благодаря виртуальной примерке",
      avatar: "👩‍🎨"
    },
    {
      name: "Алексей Петров",
      role: "Интерьерный дизайнер",
      content: "Экономлю 3-4 часа на каждую визуализацию проекта",
      avatar: "👨‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Навигация */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Palette className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">ArtCurator AI</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600">Возможности</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">Тарифы</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600">Отзывы</a>
          </div>
          
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 hover:text-purple-600"
            >
              Вход
            </Link>
            <Link 
              to="/demo" 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
            >
              Попробовать демо
            </Link>
          </div>
        </div>
      </nav>

      {/* Герой секция */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Искусство в вашем
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            интерьере за 10 секунд
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          AI-платформа для виртуальной примерки картин, скульптур и арт-объектов 
          в реальные интерьеры. Точность 95%, реалистичность гарантирована.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
          <Link 
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition flex items-center justify-center"
          >
            Начать бесплатно
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          
          <Link 
            to="/demo"
            className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 text-lg font-semibold rounded-xl hover:border-purple-300 transition flex items-center justify-center"
          >
            <Sparkles className="mr-2 w-5 h-5 text-yellow-500" />
            Интерактивная демо
          </Link>
        </div>
        
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600">обработанных работ</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">95%</div>
            <div className="text-gray-600">точность примерки</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">40%</div>
            <div className="text-gray-600">рост продаж у партнеров</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600">работа AI</div>
          </div>
        </div>
      </section>

      {/* Демо превью */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Посмотрите, как это работает
            </h2>
            <p className="text-gray-300">
              Загрузите фото комнаты и картины — получите реалистичную визуализацию
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="relative">
                <img 
                  src="/demo-room.jpg" 
                  alt="Комната" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-blue-500 text-white px-4 py-2 rounded-full">
                  Комната
                </div>
              </div>
              <p className="text-gray-300 mt-4">1. Загружаете фото интерьера</p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <img 
                  src="/demo-art.jpg" 
                  alt="Картина" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full">
                  Искусство
                </div>
              </div>
              <p className="text-gray-300 mt-4">2. Выбираете произведение</p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <img 
                  src="/demo-result.jpg" 
                  alt="Результат" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-purple-500 text-white px-4 py-2 rounded-full">
                  Результат AI
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl" />
              </div>
              <p className="text-gray-300 mt-4">3. Получаете реалистичную интеграцию</p>
            </div>
          </div>
        </div>
      </section>

      {/* Возможности */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Почему выбирают ArtCurator AI
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Дополнительные возможности */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Профессиональные инструменты для галерей
            </h3>
            <ul className="space-y-4">
              {[
                "Каталог с автоматической сегментацией",
                "API для интеграции с сайтами",
                "Аналитика просмотров и конверсий",
                "Командная работа над проектами",
                "Брендирование результатов"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl">
            <div className="aspect-video bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <Home className="w-16 h-16 mx-auto mb-4" />
                <div className="text-2xl font-bold">Интерьерный просмотр</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section id="pricing" className="container mx-auto px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-4xl font-bold text-center mb-4">Тарифные планы</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Выберите план, который подходит именно вам. Бесплатный тариф включает 10 обработок в месяц.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Бесплатный тариф */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Бесплатно</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">0₽</span>
              <span className="text-gray-600">/месяц</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "10 AI-обработок в месяц",
                "Базовые настройки",
                "Стандартное качество",
                "Публичная галерея",
                "Поддержка по email"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/register"
              className="block w-full py-3 text-center border-2 border-gray-300 text-gray-900 rounded-lg hover:border-purple-300 transition"
            >
              Начать бесплатно
            </Link>
          </div>
          
          {/* Профессиональный тариф */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-8 text-white relative transform md:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                ПОПУЛЯРНЫЙ
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Профессиональный</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">1 990₽</span>
              <span className="text-purple-200">/месяц</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "500 AI-обработок в месяц",
                "Расширенные настройки",
                "Высокое качество 4K",
                "Приватная галерея",
                "Приоритетная поддержка",
                "API доступ",
                "Аналитика просмотров",
                "Брендирование"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/register?plan=pro"
              className="block w-full py-3 text-center bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Попробовать 14 дней бесплатно
            </Link>
          </div>
          
          {/* Бизнес тариф */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Бизнес</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">9 990₽</span>
              <span className="text-gray-600">/месяц</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "Неограниченные обработки",
                "Все профессиональные функции",
                "Приоритетная очередь AI",
                "Персональный менеджер",
                "White-label решение",
                "Интеграция с CRM",
                "Командная работа",
                "Обучение сотрудников"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/contact"
              className="block w-full py-3 text-center border-2 border-gray-300 text-gray-900 rounded-lg hover:border-purple-300 transition"
            >
              Запросить демо
            </Link>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="testimonials" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Нас рекомендуют профессионалы
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              
              <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA секция */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Начните использовать ArtCurator AI уже сегодня
          </h2>
          
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Присоединяйтесь к 500+ галереям и дизайнерам, которые уже 
            увеличили продажи с помощью нашей платформы
          </p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link 
              to="/register"
              className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Начать 14-дневный триал
            </Link>
            
            <Link 
              to="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition"
            >
              Запросить персональную демо
            </Link>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Palette className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold">ArtCurator AI</span>
              </div>
              <p className="text-gray-400">
                AI-платформа для виртуальной примерки искусства в интерьеры
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Возможности</a></li>
                <li><a href="#" className="hover:text-white">Тарифы</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Документация</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">О нас</a></li>
                <li><a href="#" className="hover:text-white">Блог</a></li>
                <li><a href="#" className="hover:text-white">Карьера</a></li>
                <li><a href="#" className="hover:text-white">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Подписаться</h4>
              <p className="text-gray-400 mb-4">
                Будьте в курсе новых функций и обновлений
              </p>
              
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none flex-grow"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-r-lg hover:opacity-90">
                  →
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ArtCurator AI. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;