export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
  }

  // or just use innnerHTML = '', if it needed
  removeAllChilds(): void {
    while (this.element.firstChild) {
      if (this.element.lastChild) this.element.removeChild(this.element.lastChild);
    }
  }

  addChild(tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText = ''): void {
    const childElement = document.createElement(tag);
    childElement.classList.add(...styles);
    childElement.innerHTML = innerText;
    this.element.appendChild(childElement);
  }

  show(): void {
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
  }
}
