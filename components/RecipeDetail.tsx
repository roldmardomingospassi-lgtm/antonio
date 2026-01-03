
import React from 'react';
import { DetailedRecipe } from '../types';

interface RecipeDetailProps {
  recipe: DetailedRecipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 pt-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-orange-600 dark:text-orange-500 font-semibold mb-6 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar à Galeria
      </button>

      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-10">
        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
          <div className="p-8 text-white">
            <span className="bg-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
              {recipe.origin}
            </span>
            <h1 className="text-5xl font-bold mb-2">{recipe.name}</h1>
            <p className="text-orange-200 italic font-serif text-lg">{recipe.category}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="bg-orange-50 dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-sm sticky top-10">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 dark:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Ingredientes
            </h3>
            <ul className="space-y-4">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-zinc-400 text-sm leading-tight">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 dark:bg-orange-600 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 space-y-10">
          <section>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              História Cultural
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed italic bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              "{recipe.history}"
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Modo de Preparo</h3>
            <div className="space-y-6">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-none w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 font-bold flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 dark:text-zinc-300 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-red-50 dark:bg-red-950/20 p-8 rounded-3xl border border-red-100 dark:border-red-900/50">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
              </svg>
              Assista no YouTube
            </h3>
            <p className="text-red-700 dark:text-red-300/70 mb-4 text-sm">Preparamos esta pesquisa para que possa ver chefs africanos autênticos a preparar este prato:</p>
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.youtubeQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-md active:scale-95"
            >
              Pesquisar "{recipe.youtubeQuery}"
            </a>
          </section>

          {recipe.googleSources.length > 0 && (
            <section className="border-t dark:border-zinc-800 pt-10">
              <h3 className="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Fontes e Referências</h3>
              <div className="flex flex-wrap gap-3">
                {recipe.googleSources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {source.title}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
