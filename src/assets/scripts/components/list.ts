import AbsComponent from './absComponent';

const listTemplate = () => {
  return `
  <div class="content__list">
    <div class="mui--text-black-54 mui--text-body2">Your Questions</div>
    <div class="mui-divider"></div>
  </div>`;
};

class List extends AbsComponent {
  getTemplate() {
    return listTemplate();
  }
}

export default List;
