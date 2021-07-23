import Store from '../../shared/store';

import View from '../../view';

export default {

  renderMainPage(): void {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = View.renderCardsForMainCategoryPage(Store.cardsForCategories, Store.applicationMode);
  },
};
