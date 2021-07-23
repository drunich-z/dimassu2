import Store from '../../shared/store';

import View from '../../view';

export default {

  renderAdminCardsPage(): void {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = View.renderCardsForAdminCardsCategoryPage(Store.cards);
  },

};
