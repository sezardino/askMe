import AbsComponent, {Component} from './absComponent';

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
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >
        Ask
      </button>
    </form>
  </div>`;
};

interface FormInt extends Component {
  recoveryListeners: () => void;
  submitHandler: (handler: (email: string, password: string) => void) => void;
}

class Form extends AbsComponent implements FormInt {
  constructor() {
    super();
    this.recoveryListeners();
  }

  getTemplate() {
    return formTemplate();
  }

  submitHandler = (handler: (email: string, password: string) => void) => {
    this.getElement().addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      const target = evt.target as Element;
      const question = target!.querySelector('input')!.value.trim();
      const data = {
        date: new Date(),
        question,
      };
      const pass = '123456';
      const em = 'eddd@gmail.com';
      handler(em, pass);
    });
  };

  recoveryListeners() {
    // this.getElement().addEventListener('submit', (evt: Event) => {
    //   evt.preventDefault();
    //   const target = evt.target as Element;
    //   const question = target!.querySelector('input')!.value.trim();
    //   const data = {
    //     date: new Date(),
    //     question,
    //   };
    //   handler(data);
    // });
  }
}

export {FormInt};
export default Form;
