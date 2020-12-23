import AbsComponent from './absComponent';

const questionTemplate = () => {
  return `
  <div class="question">
      <header class="question__header">
        <h3 class="question__header mui--text-headline">
          MUI Acquires New Features
        </h3>
        <p class="question__info mui--text-black-54">
          By <a href="#">Team MUI</a> 1 week ago
        </p>
      </header>
      <p class="question__body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
        facilisis aliquam ipsum sed dignissim. Sed ac accumsan odio.
        Vivamus tristique dignissim neque. Interdum et malesuada fames
        ac ante ipsum primis in faucibus. Nunc cursus felis nec purus
        condimentum vestibulum. Donec mauris nisi, sollicitudin eget
        iaculis id, suscipit id odio. <a href="#">Read more...</a>
      </p>
    </div>
    `;
};

class Question extends AbsComponent {
  getTemplate() {
    return questionTemplate();
  }
}

export default Question;
