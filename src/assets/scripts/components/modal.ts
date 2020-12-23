import {getErrorMessage, removeComponent} from '../services/index';
import AbsComponent from './absComponent';

const modalTemplate = (title: string) => {
  return `
  <div class="modal">
    <div class="modal__overlay"></div>
    <form class="mui-form modal__form">
      <legend>${title} Form</legend>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email-input">
        <label for="email-input">Your Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password-input">
        <label for="password-input">Your password</label>
      </div>
      <p class="modal__error-message"></p>
      <button type="submit" class="mui-btn mui-btn--raised">${title}</button>
    </form>
  </div>`;
};

class Modal extends AbsComponent {
  title: string;
  constructor(title: string) {
    super();
    this.title = title;
    this.addListeners();
  }
  getTemplate() {
    return modalTemplate(this.title);
  }

  keydownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      removeComponent(this);
    }
  };

  closeModal = (evt: MouseEvent) => {
    const target = evt.target as Element;
    if (target.classList.contains('modal__overlay')) {
      removeComponent(this);
    }
  };

  submitHandler = (handler: (arg0: string, arg1: string) => Promise<any>) => {
    const button = this.getElement().querySelector('button');
    const errorMessage = this.getElement().querySelector(
      '.modal__error-message'
    );
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        const target = evt.target as HTMLFormElement;
        const passwordInput: HTMLInputElement = target.querySelector(
          '#password-input'
        );
        const emailInput: HTMLInputElement = target.querySelector(
          '#email-input'
        );
        button.disabled = true;
        handler(emailInput.value, passwordInput.value).then((response) => {
          if (response.error) {
            button.disabled = false;
            target.classList.add('modal__error');
            errorMessage.textContent = getErrorMessage(response.error);
          } else if (response.email) {
            const {email, displayName} = response;
            removeComponent(this);
            return {displayName, email};
          }
        });
      });
  };

  addListeners() {
    this.getElement().addEventListener('click', this.closeModal);
    document.addEventListener('keydown', this.keydownHandler);
  }

  removeListeners = () => {
    this.getElement().removeEventListener('click', this.closeModal);
    document.removeEventListener('keydown', this.keydownHandler);
  };

  removeElement = () => {
    this.removeListeners();
  };
}

export default Modal;
