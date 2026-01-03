
export interface Recipe {
  id: string;
  name: string;
  origin: string;
  description: string;
  imageUrl: string;
  category: string;
  isPremium: boolean;
  price?: number;
}

export interface DetailedRecipe extends Recipe {
  ingredients: string[];
  instructions: string[];
  history: string;
  youtubeQuery: string;
  googleSources: Array<{title: string, uri: string}>;
}

export type Category = 'Oeste Africano' | 'Este Africano' | 'África Austral' | 'Norte de África' | 'Central';

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
  holder: string;
}
