import BurgerControl from './controls/burgerControl';
import MainContainerControl from './controls/mainContainerControl';
import SwitchModeControl from './controls/switchModeControl';
import AdminControl from './controls/adminContainerControl';
import GameCardsPage from './pages/game-cards/gameCardsPage';
import MainPage from './pages/main/mainCategoryPage';
import AdminPage from './pages/admin/adminCategoryPage';
import Store from './shared/store';
import Utils from './shared/utils';

const switchOnMainControls = () => {
  MainContainerControl.switchOffMainContainerControls();
  AdminControl.switchOffAdminContainerControls();
  MainContainerControl.initMainContainerControls();
};

const switchOnAdminControls = () => {
  MainContainerControl.switchOffMainContainerControls();
  AdminControl.switchOffAdminContainerControls();
  AdminControl.initAdminContainerControls();
};

export default {
  async mainRoute(): Promise<void> {
    const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
    if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
    Store.activeCategory = { name: '', id: -1, description: '' };
    Store.cards = [];
    Store.page = 'main';
    Store.cardsForCategories = await Utils.getCardsForCategories();
    MainPage.renderMainPage();
    const mainLink = (document.getElementById('burger-link-main') as HTMLElement);
    if (mainLink) mainLink.classList.add('burger-link_active');
    switchOnMainControls();
  },

  async categoryRoute(): Promise<void> {
    GameCardsPage.renderGameCardsPage();
    switchOnMainControls();
  },

  async statisticsRoute(): Promise<void> {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = 'СТРАНИЦА СТАТИСТИКИ <br> НЕ ГОТОВА (';
    MainContainerControl.switchOffMainContainerControls();
  },

  async adminRoute(): Promise<void> {
    const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
    if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
    Store.activeCategory = { name: '', id: -1, description: '' };
    Store.cards = [];
    Store.page = 'admin';
    Store.cardsForCategories = await Utils.getCardsForCategories();
    AdminPage.renderAdminPage();
    switchOnAdminControls();
  },

  async initControlls(): Promise<void> {
    BurgerControl.initBurger();
    SwitchModeControl.initSwitch();
  },

};
