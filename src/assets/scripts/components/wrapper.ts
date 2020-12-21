import AbsComponent from './absComponent';

const wrapperTemplate = () => {
  return `
  <section class="content" class="mui-container-fluid">
      <div class="mui-row content__row">
        <div class="mui-col-sm-10 mui-col-sm-offset-1 content__wrapper">
          <div class="mui--text-black-54 mui--text-body2">Ask a question</div>
          <div class="mui-divider"></div>
        </div>
      </div>
    </section>
    `;
};

class Wrapper extends AbsComponent {
  getTemplate() {
    return wrapperTemplate();
  }
}

export default Wrapper;
