
import { Recipe, Category } from './types';

export const CATEGORIES: Category[] = [
  'Oeste Africano',
  'Este Africano',
  'África Austral',
  'Norte de África',
  'Central'
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Jollof Rice',
    origin: 'Nigéria/Gana',
    description: 'Um prato de arroz aromático cozido num molho de tomate rico e picante.',
    imageUrl: 'https://picsum.photos/seed/jollof/800/600',
    category: 'Oeste Africano',
    isPremium: false
  },
  {
    id: '2',
    name: 'Muamba de Galinha',
    origin: 'Angola',
    description: 'Galinha cozida em molho de dendém com quiabos e abóbora.',
    imageUrl: 'https://picsum.photos/seed/muamba/800/600',
    category: 'Central',
    isPremium: true,
    price: 4.99
  },
  {
    id: '3',
    name: 'Injera com Doro Wat',
    origin: 'Etiópia',
    description: 'Pão fermentado esponjoso servido com um guisado picante de frango e ovos.',
    imageUrl: 'https://picsum.photos/seed/injera/800/600',
    category: 'Este Africano',
    isPremium: true,
    price: 5.50
  },
  {
    id: '4',
    name: 'Bunny Chow',
    origin: 'África do Sul',
    description: 'Pão oco recheado com caril aromático e picante.',
    imageUrl: 'https://picsum.photos/seed/bunnychow/800/600',
    category: 'África Austral',
    isPremium: false
  },
  {
    id: '5',
    name: 'Tagine de Cordeiro',
    origin: 'Marrocos',
    description: 'Guisado cozido lentamente com frutos secos e especiarias exóticas.',
    imageUrl: 'https://picsum.photos/seed/tagine/800/600',
    category: 'Norte de África',
    isPremium: true,
    price: 6.99
  },
  {
    id: '6',
    name: 'Cachupa Rica',
    origin: 'Cabo Verde',
    description: 'Guisado robusto de milho, feijão e diversas carnes.',
    imageUrl: 'https://picsum.photos/seed/cachupa/800/600',
    category: 'Oeste Africano',
    isPremium: false
  }
];
