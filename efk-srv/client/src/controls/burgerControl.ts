import Model from '../model';
import Store from '../shared/store';
import View from '../view';
import MainContainerControl from './mainContainerControl';
import { Popup } from '../components/popup/popup';

const STATISTICS = 'statistics';
const MAIN = 'main';
const CATEGORY = 'category';
const ADMIN = 'admin';

export default {
  burgerBtn: document.getElementById('burger-menu_button') as HTMLElement,
  burgerMenu: document.getElementById('burger-menu') as HTMLElement,
  burgerLinks: document.getElementById('burger-links') as HTMLElement,
  coverElement: document.getElementById('cover') as HTMLElement,
  bodyElement: document.getElementById('body') as HTMLElement,
  adminPanel: document.getElementById('burger-link-admin') as HTMLElement,
  login: document.getElementById('burger-link-login') as HTMLElement,
  logout: document.getElementById('burger-link-logout') as HTMLElement,
  reset: document.getElementById('burger-link-reset') as HTMLElement,

  async initBurger(): Promise<void> {
    this.burgerBtn = document.getElementById('burger-menu_button') as HTMLElement;
    this.burgerMenu = document.getElementById('burger-menu') as HTMLElement;
    this.coverElement = document.getElementById('cover') as HTMLElement;
    this.bodyElement = document.getElementById('body') as HTMLElement;
    this.burgerLinks = document.getElementById('burger-links') as HTMLElement;

    const categoriesForRender = await Model.getCategories();
    this.burgerLinks.innerHTML = View.renderBurger(categoriesForRender, Store.authorized);

    this.adminPanel = document.getElementById('burger-link-admin') as HTMLElement;
    this.login = document.getElementById('burger-link-login') as HTMLElement;
    this.logout = document.getElementById('burger-link-logout') as HTMLElement;
    this.reset = document.getElementById('burger-link-reset') as HTMLElement;

    this.burgerBtn.addEventListener('click', (e: Event) => this.burgerBtnHandler(e));
    // this.coverElement.addEventListener('click', this.handleBurger.bind(this));
    this.burgerLinks.addEventListener('click', (e: Event) => this.handleBurgerLinks(e));
  },

  async initBurgerLinks(): Promise<void> {
    const categories = await Model.getCategories();
    this.burgerLinks.innerHTML = View.renderBurger(categories, Store.authorized);
  },

  burgerBtnHandler(e: Event): void {
    e.preventDefault();
    this.handleBurger();
  },

  handleBurger(): void {
    this.bodyElement.classList.toggle('notScrollable');
    this.coverElement.classList.toggle('hidden');
    this.burgerMenu.classList.toggle('burger-menu_active');
  },

  async handleBurgerLinks(e: Event): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.classList.contains('burger-link') && !target.classList.contains('burger-link_active')) {
      Store.activeGame = false;
      const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
      if (prevActiveLink
        && !target.classList.contains('burger-link-login')
        && !target.classList.contains('burger-link-logout')
        && !target.classList.contains('burger-link-reset')) prevActiveLink.classList.remove('burger-link_active');
      if (!target.classList.contains('burger-link-login')
        && !target.classList.contains('burger-link-logout')
        && !target.classList.contains('burger-link-reset')) target.classList.add('burger-link_active');
      if (target.dataset.type === MAIN) {
        Store.page = MAIN;
        window.location.hash = MAIN;
        this.handleBurger();
      }
      if (target.dataset.type === CATEGORY) {
        Store.page = CATEGORY;
        Store.activeCategory = await Model.getCategoryById(Number(target.dataset.id));
        Store.cards = await Model.getCardsOfCategoryById(Number(target.dataset.id));
        window.location.hash = ' ';
        window.location.hash = CATEGORY;
        this.handleBurger();
      }
      if (target.dataset.type === STATISTICS) {
        Store.page = STATISTICS;
        window.location.hash = STATISTICS;
        this.handleBurger();
      }
      if (target.dataset.type === 'login') {
        this.handleLogin();
      }
      if (target.dataset.type === 'logout') {
        this.handleLogout();
      }
      if (target.dataset.type === 'reset') {
        Model.resetBDToInitialState();
        this.initBurgerLinks();
        window.location.hash = ' ';
        window.location.hash = MAIN;
        this.handleBurger();
      }
      if (target.dataset.type === ADMIN) {
        Store.page = ADMIN;
        window.location.hash = ADMIN;
        this.handleBurger();
      }
    }
  },

  handleLogout():void {
    Store.authorized = false;
    this.adminPanel.classList.toggle('hidden');
    this.logout.classList.toggle('hidden');
    this.login.classList.toggle('hidden');
    this.reset.classList.toggle('hidden');
    this.handleBurger();
    Store.page = MAIN;
    window.location.hash = ' ';
    window.location.hash = MAIN;
  },

  handleLogin():void {
    MainContainerControl.switchOffMainContainerControls();
    const loginForm = document.createElement('div');
    loginForm.innerHTML = View.renderLoginForm();
    this.bodyElement.append(loginForm);
    const okBtn = document.getElementById('btnOk') as HTMLButtonElement;
    const cancelBtn = document.getElementById('btnCancel') as HTMLButtonElement;
    const loginInput = document.getElementById('input-login') as HTMLInputElement;
    const passwordInput = document.getElementById('input-pass') as HTMLInputElement;
    this.burgerMenu.classList.toggle('burger-menu_active');

    const removeForm = () => {
      this.bodyElement.classList.toggle('notScrollable');
      this.coverElement.classList.toggle('hidden');
      loginForm.remove();
      MainContainerControl.initMainContainerControls();
    };

    // потом(наверное) на стороне сервера сделаю
    const authorize = (): boolean => {
      if (loginInput.value === ADMIN && passwordInput.value === ADMIN) return true;
      return false;
    };

    okBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (authorize()) {
        Store.authorized = true;
        this.adminPanel.classList.toggle('hidden');
        this.logout.classList.toggle('hidden');
        this.login.classList.toggle('hidden');
        this.reset.classList.toggle('hidden');
        removeForm();
        return;
      }
      const popup = new Popup('login and password are not correct', false, false);
      popup.show();
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeForm();
    });
  },

};
