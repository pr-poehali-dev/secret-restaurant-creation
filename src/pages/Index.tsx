import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const menuItems = [
  {
    id: 1,
    name: 'Подводный сад',
    description: 'Нежный тартар из лосося с икрой и микрозеленью на ледяной подушке',
    price: '2 890 ₽',
    background: 'from-blue-900/40 to-cyan-900/40',
    category: 'Холодные закуски'
  },
  {
    id: 2,
    name: 'Космическая трюфель',
    description: 'Чёрный трюфель с золотой пылью, томленый в сливочном соусе',
    price: '4 590 ₽',
    background: 'from-purple-900/40 to-pink-900/40',
    category: 'Основные блюда'
  },
  {
    id: 3,
    name: 'Огненный дракон',
    description: 'Говядина вагю с перечным соусом и карамелизированными овощами',
    price: '6 290 ₽',
    background: 'from-orange-900/40 to-red-900/40',
    category: 'Основные блюда'
  },
  {
    id: 4,
    name: 'Лунный десерт',
    description: 'Молекулярный шоколад с жидким азотом и ягодным муссом',
    price: '1 890 ₽',
    background: 'from-indigo-900/40 to-purple-900/40',
    category: 'Десерты'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredDish, setHoveredDish] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/d6a9f8ab-2a91-4353-b7b9-70c93bca06b5/files/bafa150f-fedc-430f-bc1b-6ced3cccbf90.jpg" alt="Логотип ЭКСТАЗ" className="h-10 w-10 rounded-lg object-cover glow-box" />
            <h1 className="text-2xl font-bold glow-text">ЭКСТАЗ</h1>
          </div>
          <div className="flex gap-6">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'menu', label: 'Меню' },
              { id: 'about', label: 'О ресторане' },
              { id: 'contact', label: 'Контакты' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all ${
                  activeSection === item.id
                    ? 'text-primary glow-text'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/50 to-cyan-950/50" />
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/10 animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h2 className="text-7xl font-black mb-6 glow-text">ЭКСТАЗ</h2>
          <p className="text-2xl mb-4 text-primary">Секретный ресторан с изумительной кухней</p>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Добро пожаловать в мир, где каждое блюдо создаёт уникальную атмосферу. 
            Наши экраны-стены погружают вас в иммерсивное путешествие вкуса.
          </p>
          <Button 
            onClick={() => scrollToSection('menu')} 
            size="lg" 
            className="glow-box text-lg px-8 py-6 hover:scale-105 transition-transform"
          >
            Открыть меню
            <Icon name="ChevronDown" className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="menu" className="min-h-screen py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center mb-4 glow-text">Наше меню</h2>
          <p className="text-center text-muted-foreground mb-12">Каждое блюдо — это целый мир</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <Card
                key={item.id}
                className={`relative overflow-hidden bg-gradient-to-br ${item.background} border-primary/30 hover:border-primary transition-all duration-300 cursor-pointer group animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredDish(item.id)}
                onMouseLeave={() => setHoveredDish(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
                
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-2xl font-bold text-accent">{item.price}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Icon name="Sparkles" size={16} className="animate-glow-pulse" />
                    <span>Иммерсивная подача</span>
                  </div>
                </div>

                {hoveredDish === item.id && (
                  <div className="absolute inset-0 bg-primary/5 animate-fade-in" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/20 to-background" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-12 glow-text">О ресторане</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'Eye', title: 'Конфиденциальность', description: 'Полная анонимность гостей и приватные залы' },
              { icon: 'Sparkles', title: 'Иммерсивный опыт', description: 'Стены-экраны создают атмосферу под каждое блюдо' },
              { icon: 'ChefHat', title: 'Изысканная кухня', description: 'Авторские блюда от шеф-повара мирового уровня' }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card/50 border-primary/20 hover:border-primary transition-all hover:glow-box animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 glow-box">
                  <Icon name={feature.icon as any} className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-card/50 to-purple-950/20 border-primary/30">
            <p className="text-lg leading-relaxed text-center">
              <span className="text-primary font-semibold">ЭКСТАЗ</span> — это не просто ресторан. 
              Это секретное пространство, где технологии встречаются с искусством кулинарии. 
              Наши стены-экраны создают уникальную атмосферу для каждого блюда: 
              от подводных глубин с медузами до космических пейзажей. 
              Мы гарантируем полную конфиденциальность и незабываемый опыт.
            </p>
          </Card>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-20 px-4 flex items-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl font-bold text-center mb-4 glow-text">Контакты</h2>
          <p className="text-center text-muted-foreground mb-12">Бронирование только по приглашениям</p>
          
          <Card className="p-8 bg-card/50 border-primary/30 glow-box">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">Местоположение раскрывается после подтверждения брони</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефоны директоров</h3>
                  <p className="text-muted-foreground text-sm">Анастасия Павловна: +7 (953) 812-16-16</p>
                  <p className="text-muted-foreground text-sm">Анна Дмитриевна: +7 (930) 778-46-77</p>
                  <p className="text-muted-foreground text-sm">Диана Сергеевна: +7 (961) 620-19-90</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">diana11pese@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Ежедневно с 19:00 до 02:00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/20">
              <Button className="w-full glow-box hover:scale-105 transition-transform" size="lg">
                <Icon name="Lock" className="mr-2" />
                Запросить бронирование
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 border-t border-primary/20 text-center text-muted-foreground">
        <p>© 2024 ЭКСТАЗ. Все права защищены. Конфиденциальность гарантирована.</p>
      </footer>
    </div>
  );
};

export default Index;