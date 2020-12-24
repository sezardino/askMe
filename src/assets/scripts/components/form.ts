import {FormInt} from '../types';
import AbsComponent from './absComponent';

const formTemplate = () => {
  return `
  <div class="content__form-wrapper">
    <div class="mui--text-black-54 mui--text-body2">Ask a question</div>
    <div class="mui-divider"></div>
    <form class="mui-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input
          type="text"
          id="question"
          required
          minlength="10"
          maxlength="256"
        />
        <label for="question">Your question</label>
      </div>
      <p class=""></p>
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >
        Ask
      </button>
    </form>
  </div>`;
};

class Form extends AbsComponent implements FormInt {
  handler: () => void;
  user: string;
  constructor(user: string) {
    super();
    this.user = user;
  }

  getTemplate() {
    return formTemplate();
  }

  submitHandler = (handler: (question: any) => Promise<any>) => {
    const form: Element = this.getElement();
    const input: HTMLInputElement = form.querySelector('input');
    const button: HTMLButtonElement = form.querySelector('button');
    const status: HTMLParagraphElement = form.querySelector('p');

    this.getElement().addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      const question = input.value.trim();
      button.disabled = true;
      status.textContent = 'Sending';
      const data = {
        date: new Date(),
        question,
        author: this.user,
      };
      handler(data).then(() => {
        input.value = '';
        status.textContent = 'Your question has been successfully sent';
        button.disabled = false;
      });
    });
  };
}

export {FormInt};
export default Form;
