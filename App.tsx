
import React, { useState, useEffect } from 'react';
import { Recipe, DetailedRecipe, Category } from './types';
import { INITIAL_RECIPES, CATEGORIES } from './constants';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import PaymentModal from './components/PaymentModal';
import { fetchRecipeDetails, generateHeroImage } from './services/geminiService';

const App: React.FC = () => {
  const [recipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailedRecipe, setDetailedRecipe] = useState<DetailedRecipe | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [unlockedRecipes, setUnlockedRecipes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial fetch for a nice hero image
    generateHeroImage("diverse African gourmet food platter").then(setHeroImage);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredRecipes = selectedCategory === 'Todos' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  const handleRecipeClick = async (recipe: Recipe) => {
    if (recipe.isPremium && !unlockedRecipes.has(recipe.id)) {
      setSelectedRecipe(recipe);
      setShowPayment(true);
      return;
    }

    setLoading(true);
    try {
      const details = await fetchRecipeDetails(recipe);
      setDetailedRecipe(details);
    } catch (error) {
      console.error("Error loading recipe details", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedRecipe) {
      const newUnlocked = new Set(unlockedRecipes);
      newUnlocked.add(selectedRecipe.id);
      setUnlockedRecipes(newUnlocked);
      setShowPayment(false);
      handleRecipeClick(selectedRecipe);
    }
  };

  return (
    <div className="min-h-screen african-pattern bg-stone-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Header / Navbar */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-orange-100 dark:border-zinc-800 px-6 py-4 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setDetailedRecipe(null); setSelectedCategory('Todos'); }}>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Sabores de <span className="text-orange-600">África</span></h1>
        </div>
        
        <nav className="hidden lg:flex gap-8">
          {['Início', 'Receitas', 'Premium', 'Sobre'].map(link => (
            <a key={link} href="#" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors">{link}</a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button className="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-md active:scale-95">
            Minha Conta
          </button>
        </div>
      </header>

      {detailedRecipe ? (
        <RecipeDetail recipe={detailedRecipe} onBack={() => setDetailedRecipe(null)} />
      ) : (
        <main>
          {/* Hero Section */}
          <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
            <img 
              src={heroImage || "https://picsum.photos/1200/800?african"} 
              alt="Culinary Africa" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center p-6">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                  A Alma da Gastronomia Africana
                </h2>
                <p className="text-xl text-orange-50 mb-10 leading-relaxed font-light drop-shadow">
                  Descubra receitas autênticas, segredos milenares e o sabor vibrante de um continente inteiro na palma da sua mão.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl">
                    Explorar Receitas
                  </button>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                    Torne-se Premium
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="container mx-auto px-6 -mt-8 relative z-30">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-xl flex gap-3 overflow-x-auto no-scrollbar border border-transparent dark:border-zinc-800">
              <button 
                onClick={() => setSelectedCategory('Todos')}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all ${selectedCategory === 'Todos' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-orange-50 dark:hover:bg-zinc-700'}`}
              >
                Todos
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-orange-50 dark:hover:bg-zinc-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <section className="container mx-auto px-6 py-16">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Populares Agora</h3>
                <p className="text-gray-500 dark:text-zinc-500">Pratos que estão a conquistar paladares pelo mundo.</p>
              </div>
              <div className="hidden sm:block">
                <span className="text-orange-600 dark:text-orange-500 font-bold hover:underline cursor-pointer">Ver todas →</span>
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-100 dark:border-zinc-800 border-t-orange-600 dark:border-t-orange-500 rounded-full animate-spin"></div>
                <p className="text-orange-600 dark:text-orange-500 font-bold animate-pulse text-lg">Preparando a sua experiência culinária...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRecipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={handleRecipeClick}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16 px-6 border-t border-zinc-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <h4 className="text-2xl font-bold mb-6">Sabores de África</h4>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Nossa missão é preservar e digitalizar a herança culinária de África, garantindo que as receitas tradicionais cheguem às novas gerações com a máxima qualidade e respeito.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 bg-white/5 rounded-full hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center">
                    <div className="w-4 h-4 bg-zinc-600 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Explorar</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Categorias</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Receitas Premium</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Chefs Parceiros</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Vídeos Exclusivos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Ajuda</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 Sabores de África. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Visa" />
              <div className="h-4 w-10 bg-zinc-800 rounded-sm opacity-50"></div>
              <div className="h-4 w-10 bg-zinc-800 rounded-sm opacity-50"></div>
            </div>
          </div>
        </div>
      </footer>

      {showPayment && selectedRecipe && (
        <PaymentModal 
          recipe={selectedRecipe} 
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default App;
