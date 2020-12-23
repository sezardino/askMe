import AbsComponent from './absComponent';

const formTemplate = () => {
  return `
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
  </form>`;
};

class Form extends AbsComponent {
  getTemplate() {
    return formTemplate();
  }
}

export default Form;
