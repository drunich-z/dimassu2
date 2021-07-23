import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';
import View from '../view';
import BurgerControl from './burgerControl';

const handleDeleteCategory = async (target: HTMLElement) => {
  await Model.deleteCategory(Number(target.dataset.id));
  BurgerControl.initBurgerLinks();
  window.location.hash = ' ';
  window.location.hash = 'admin';
};

const handleAddWordCategory = (target: HTMLElement) => {
  console.log(`add word-${target.dataset.id}`);
  const createNewWordForm = document.createElement('div');
  createNewWordForm.innerHTML = View.renderNewCardForm();
  document.body.append(createNewWordForm);
  const newWordForm = document.getElementById('form-new-card') as HTMLFormElement;
  const coverElement = document.getElementById('cover') as HTMLElement;
  const okBtn = document.getElementById('btnOk') as HTMLButtonElement;
  const cancelBtn = document.getElementById('btnCancel') as HTMLButtonElement;

  document.body.classList.toggle('notScrollable');
  coverElement.classList.toggle('hidden');

  const validateForm = (): boolean => true;

  const removeForm = () => {
    document.body.classList.toggle('notScrollable');
    coverElement.classList.toggle('hidden');
    createNewWordForm.remove();
  };

  okBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // создать карточку
      const formData = new FormData(newWordForm);
      formData.append('categoryId', `${target.dataset.id}`);
      await Model.CreateCard(formData);
      removeForm();
    }
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeForm();
  });
};

const handleUpdateCategory = (target: HTMLElement) => {
  const input = document.getElementById(`input-category-${target.dataset.id}`) as HTMLInputElement;
  input.classList.add('input-active');
  target.classList.toggle('hidden');
  (document.getElementById(`btnCatSave-${target.dataset.id}`) as HTMLButtonElement).classList.toggle('hidden');
};

const handleSaveUpdateCategory = async (target: HTMLElement) => {
  const input = document.getElementById(`input-category-${target.dataset.id}`) as HTMLInputElement;
  if (!input.value) return;
  input.classList.remove('input-active');
  target.classList.toggle('hidden');
  (document.getElementById(`btnCatUpd-${target.dataset.id}`) as HTMLButtonElement).classList.toggle('hidden');
  const categoryToUpdate: Category = {
    id: Number(target.dataset.id),
    name: input.value,
    description: '',
  };
  await Model.UpdateCategory(categoryToUpdate.id, categoryToUpdate);
  BurgerControl.initBurgerLinks();
};

const handleCategoryWords = async (target: HTMLElement) => {
  console.log(`shows words of category-${target.dataset.id}`);
  Store.activeCategory = await Model.getCategoryById(Number(target.dataset.id));
  Store.cards = await Model.getCardsOfCategoryById(Number(target.dataset.id));
  const adminContainer = document.getElementById('main-container') as HTMLElement;
  window.location.hash = 'admin-cards';
  adminContainer.innerHTML = View.renderCardsForAdminCardsCategoryPage(Store.cards);
};

const handleCreateCategory = async (): Promise<void> => {
  const createCategoryForm = document.createElement('div');
  createCategoryForm.innerHTML = View.renderCreateCategoryForm();
  document.body.append(createCategoryForm);
  const coverElement = document.getElementById('cover') as HTMLElement;
  const okBtn = document.getElementById('btnOk') as HTMLButtonElement;
  const cancelBtn = document.getElementById('btnCancel') as HTMLButtonElement;
  const categoryNameInput = document.getElementById('input-new-name') as HTMLInputElement;
  document.body.classList.toggle('notScrollable');
  coverElement.classList.toggle('hidden');

  const removeForm = () => {
    document.body.classList.toggle('notScrollable');
    coverElement.classList.toggle('hidden');
    createCategoryForm.remove();
  };

  okBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (categoryNameInput.value) {
      const newCategory:Category = {
        id: 100,
        name: categoryNameInput.value,
        description: '',
      };
      await Model.CreateCategory(newCategory);
      removeForm();
      BurgerControl.initBurgerLinks();
      window.location.hash = ' ';
      window.location.hash = 'admin';
    }
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeForm();
  });
};

export default {
  // adminContainer: document.getElementById('main-container') as HTMLElement,

  initAdminContainerControls(): void {
    const adminContainer = document.getElementById('main-container') as HTMLElement;
    adminContainer.addEventListener('click', this.adminHandler);
  },

  switchOffAdminContainerControls(): void {
    const adminContainer = document.getElementById('main-container') as HTMLElement;
    adminContainer.removeEventListener('click', this.adminHandler);
  },

  adminHandler(e: Event): void {
    e.preventDefault();

    const eTarget = (e.target as HTMLElement);
    if (eTarget.classList.contains('btn-delete-category')) handleDeleteCategory(eTarget);
    if (eTarget.classList.contains('btn-add-word-category')) handleAddWordCategory(eTarget);
    if (eTarget.classList.contains('btn-update-category')) handleUpdateCategory(eTarget);
    if (eTarget.classList.contains('btn-save-category')) handleSaveUpdateCategory(eTarget);
    if (eTarget.classList.contains('category-words')) handleCategoryWords(eTarget);
    if (eTarget.classList.contains('new-category')) handleCreateCategory();
  },

};
