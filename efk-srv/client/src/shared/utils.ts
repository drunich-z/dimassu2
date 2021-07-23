import Model from '../model';

const DEFAULT_CATEGORY_IMAGE = './assets/resource/control-img/no-cards-in.jpg';

export default {
  async initStatistics(): Promise<CardLocalForStatistics[]> {
    const result = [];
    const gameCards = await Model.getAllCards();
    const obj = {
      word: '',
      translation: '',
      categoryId: -1,
      trainClicks: 0,
      gameCorrectClicks: 0,
      gameErrorClicks: 0,
      gameCorrectPercent: 0,
    };
    for (let i = 0; i < gameCards.length; i++) {
      obj.word = gameCards[i].word;
      obj.translation = gameCards[i].translation;
      obj.categoryId = gameCards[i].categoryId;
      result.push(obj);
    }
    return result;
  },

  async getCardsForCategories(): Promise<CardCategory[]> {
    const result: CardCategory[] = [];
    let cards: CardLocal[];
    const categories = await Model.getCategories();
    for (let i = 0; i < categories.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      cards = await Model.getCardsOfCategoryById(categories[i].id);
      if (cards.length > 0) result[i] = { ...categories[i], image: cards[0].image, words: cards.length };
      else result[i] = { ...categories[i], image: DEFAULT_CATEGORY_IMAGE, words: 0 };
    }
    return result;
  },

  playAudio(src: string):void {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  },

  shuffle(arr: CardLocal[]): CardLocal[] {
    let j;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  createDOMElement(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText = '',
  ): HTMLElement {
    const element = document.createElement(tag);
    element.classList.add(...styles);
    element.innerHTML = innerText;
    return element;
  },

  popup(result: 'win' | 'lose', errors: number): void {
    let sound; let text; let picture;
    if (result === 'win') {
      sound = './assets/resource/control-audio/win.mp3';
      picture = './assets/resource/control-img/success.jpg';
      text = 'Win!!!';
    } else {
      sound = './assets/resource/control-audio/failure.mp3';
      picture = './assets/resource/control-img/failure.jpg';
      text = `Lose...(${errors} errors)`;
    }
    const innerText = `
      <div>${text}</div>
      <img src="${picture}" alt="game result">
    `;
    const body = document.getElementById('body') as HTMLElement;
    const cover = document.getElementById('cover') as HTMLElement;
    const popupMsg = this.createDOMElement('div', ['popup'], innerText);
    body.append(popupMsg);
    this.playAudio(sound);
    body.classList.toggle('notScrollable');
    cover.classList.toggle('hidden');

    setTimeout(() => {
      body.classList.toggle('notScrollable');
      cover.classList.toggle('hidden');
      body.removeChild(popupMsg);
    }, 3000);
  },

};
