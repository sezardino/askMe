import AbsComponent from './absComponent';
import {questionType} from '../types';

const questionTemplate = (data: questionType) => {
  const {question, date, author} = data;
  return `
  <div class="question">
      <header class="question__header">
        <h3 class="question__header mui--text-headline">
          From ${author}
        </h3>
        <p class="question__info mui--text-black-54">
          ${new Date(date).toLocaleString()}
        </p>
      </header>
      <p class="question__body">
        ${question}
      </p>
    </div>
    `;
};

class Question extends AbsComponent {
  data: questionType;
  constructor(data: questionType) {
    super();
    this.data = data;
  }
  getTemplate() {
    return questionTemplate(this.data);
  }
}

export default Question;
