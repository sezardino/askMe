import {Wrapper, Sidebar, Form, List} from './components/index';
import {renderComponent} from './services/index';

type ControllerType = {
  render: () => void;
};

class Controller implements ControllerType {
  name: string;
  container: HTMLDivElement | null;
  constructor(name: string, selector: string) {
    this.name = name;
    this.container = document.querySelector(selector);
  }

  render() {
    renderComponent(this.container!, new Sidebar(this.name), 'beforeend');

    const wrapper = new Wrapper();
    renderComponent(this.container!, wrapper, 'beforeend');
    const wrapperSection = wrapper._element!.querySelector('.content__wrapper');
    renderComponent(wrapperSection!, new Form(), 'beforeend');
    renderComponent(wrapperSection!, new List(), 'beforeend');
  }
}

export default Controller;
