import './shared/types';

const BASE = 'http://localhost:3000/api';
// const BASE = 'https://efk-srv.herokuapp.com/api';
const CATEGORY = '/categories';
const CARDS = '/cards';
const RESET = '/reset';

export default {

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE}${CATEGORY}/`);
    const categories = await response.json();
    return categories;
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await fetch(`${BASE}${CATEGORY}/${id}`);
    const result = await response.json();
    return result;
  },

  async getCardsOfCategoryById(categoryId: number): Promise<CardLocal[]> {
    const response = await fetch(`${BASE}${CARDS}/category/${categoryId}`);
    const result = await response.json();
    return result;
  },

  async getAllCards(): Promise<CardLocal[]> {
    const response = await fetch(`${BASE}${CARDS}/`);
    const cards = await response.json();
    return cards;
  },

  async resetBDToInitialState(): Promise<void> {
    await fetch(`${BASE}${RESET}/`, {
      method: 'PUT',
    });
  },

  async deleteCategory(id: number): Promise<void> {
    await fetch(`${BASE}${CATEGORY}/${id}`, {
      method: 'DELETE',
    });
  },

  async UpdateCategory(id: number, body: Category): Promise<void> {
    await fetch(`${BASE}${CATEGORY}/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async CreateCategory(body: Category): Promise<void> {
    await fetch(`${BASE}${CATEGORY}/`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async CreateCard(inputBody: FormData): Promise<void> {
    await fetch(`${BASE}${CARDS}/`, {
      method: 'POST',
      body: inputBody,
    });
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
