import './shared/types';

const BASE_CATEGORIES = './assets/resource/data-categories.json';
const BASE_CARDS = './assets/resource/data-cards.json';

export default {

  async getCategories(): Promise<Category[]> {
    const response = await fetch(BASE_CATEGORIES);
    const categories = await response.json();
    return categories;
  },

  async getCategoryByName(name: string): Promise<Category> {
    const response = await fetch(BASE_CATEGORIES);
    const categories = await response.json();
    const [result] = categories.filter((item: Category) => item.name === name);
    return result;
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await fetch(BASE_CATEGORIES);
    const [categories] = await response.json();
    const [result] = Array(categories).filter((item) => item.id === id);
    return result;
  },

  async getCardsOfCategoryById(categoryId: number): Promise<CardLocal[]> {
    const response = await fetch(BASE_CARDS);
    const cards = await response.json();
    const result = cards.filter((item:CardLocal) => (item.categoryId === categoryId));
    return result;
  },

  async getCardsOfCategoryByName(categoryName: string): Promise<CardLocal[]> {
    const response = await fetch(BASE_CARDS);
    const cards = await response.json();
    const categoryId = (await this.getCategoryByName(categoryName)).id;
    const result = cards.filter((item: CardLocal) => (item.categoryId === categoryId));
    return result;
  },

  async getAllCards(): Promise<CardLocal[]> {
    const response = await fetch(BASE_CARDS);
    const cards = await response.json();
    return cards;
  },

  // ********************************************************************************

  updateStatistics(card: CardLocalForStatistics): void {
    const key = `EFK-${card.word}`;
    localStorage.setItem(key, JSON.stringify(card));
  },

  getStatistics(): CardLocalForStatistics[] {
    const result = [];
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) result.push(JSON.parse(localStorage.getItem(keys[i]) as string));
    }
    return result;
  },

  clearStistics(): void {
    let tmpObj;
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) {
        tmpObj = {
          ...JSON.parse(localStorage.getItem(keys[i]) as string),
          trainClicks: 0,
          gameCorrectClicks: 0,
          gameErrorClicks: 0,
          gameCorrectPercent: 0,
        };
        localStorage.setItem(keys[i], JSON.stringify(tmpObj));
      }
    }
  },

  deleteStistics(): void {
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) localStorage.removeItem(keys[i]);
    }
  },

  initStatistics(cards: CardLocalForStatistics[]): void {
    let key;
    this.deleteStistics();
    for (let i = 0; i < cards.length; i++) {
      key = `EFK-${cards[i].word}`;
      localStorage.setItem(key, JSON.stringify(cards[i]));
    }
  },

};
