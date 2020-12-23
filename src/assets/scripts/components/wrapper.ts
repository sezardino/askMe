import AbsComponent from './absComponent';

const wrapperTemplate = () => {
  return `
  <section class="content" class="mui-container-fluid">
  <div class="mui-row content__row">
    <div class="mui-col-sm-10 mui-col-sm-offset-1 content__wrapper">
    <header class="content__header header">

    </header>
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
