
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={() => onClick(recipe)}
      className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-zinc-900/40 transition-all duration-300 border border-orange-50 dark:border-zinc-800 transform hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {recipe.isPremium && (
          <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            PREMIUM
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold">
            {recipe.origin}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-500 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {recipe.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-orange-600 dark:text-orange-500 font-semibold">{recipe.category}</span>
          {recipe.isPremium ? (
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{recipe.price?.toFixed(2)}€</span>
          ) : (
            <span className="text-xs font-bold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">GRÁTIS</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
