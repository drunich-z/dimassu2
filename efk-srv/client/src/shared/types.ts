type PageView = 'main' | 'category' | 'statistics' |'admin';

type ApplicationMode = 'train' | 'game';

type Card = {
  word: string,
  translation: string,
  categoryId: number,
};

type CardCategory = {
  id: number,
  name: string,
  description: string,
  image: string,
  words: number,
};

type CardLocal = {
  word: string,
  translation: string,
  image: string,
  audio: string
  categoryId: number,
};

type CardLocalForStatistics = {
  word: string,
  translation: string,
  categoryId: number,
  trainClicks: number,
  gameCorrectClicks: number,
  gameErrorClicks: number,
  gameCorrectPercent: number
};

type Category = {
  id: number
  name: string,
  description: string,
};
