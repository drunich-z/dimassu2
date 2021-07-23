import Store from '../../shared/store';

import View from '../../view';

export default {

  renderAdminPage(): void {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = View.renderCardsForAdminCategoryPage(Store.cardsForCategories);
  },

};
