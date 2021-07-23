import Store from '../../shared/store';

import View from '../../view';

export default {

  renderGameCardsPage(): void {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = View.renderCardsForGameCardsPage(Store.cards, Store.applicationMode);
  },

};
