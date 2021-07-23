import Model from '../model';
import './types';
import Utils from './utils';

const categories: Category[] = await Model.getCategories();
const activeCategory = { name: '', id: -1, description: '' } as Category;
const cards: CardLocal[] = [];
const cardsForGame: CardLocal[] = [];
const cardsForCategories: CardCategory[] = [];
const page = 'main' as PageView;
const applicationMode = 'train' as ApplicationMode;
const statistics: CardLocalForStatistics[] = [];
const gameErrors = 0;
const wordsCounter = 0;
const correctWordsCounter = 0;
const errorWordsCounter = 0;
const activeGame = false as boolean;
const authorized = false as boolean;

export default {
  categories,
  activeCategory,
  cards,
  cardsForCategories,
  page,
  applicationMode,
  statistics,
  gameErrors,
  cardsForGame,
  wordsCounter,
  correctWordsCounter,
  errorWordsCounter,
  activeGame,
  authorized,

  // async statInit(): Promise<void> {
  //   // const res = Model.getStatistics();
  //   // if (res.length === 0) {
  //   //   this.statistics = await Utils.initStatistics();
  //   //   Model.initStatistics(this.statistics);
  //   // } else this.statistics = res;
  //   // console.log(this.statistics);
  // },

  async InitStore(): Promise<void> {
    this.categories = await Model.getCategories();
    [this.activeCategory] = this.categories;
    this.cards = await Model.getCardsOfCategoryById(this.activeCategory.id);
    this.cardsForGame = this.cards.slice();
    this.cardsForCategories = await Utils.getCardsForCategories();
    this.page = 'main';
    this.applicationMode = 'train';
    // this.statInit();
  },

  initGameState(toggle = true):void {
    this.gameErrors = 0;
    this.cardsForGame = this.cards.slice();
    this.cardsForGame = Utils.shuffle(this.cardsForGame);
    this.wordsCounter = this.cardsForGame.length;
    this.correctWordsCounter = 0;
    this.errorWordsCounter = 0;
    this.activeGame = toggle;
  },

};
