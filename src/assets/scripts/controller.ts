import api from './api';
import {
  Wrapper,
  Sidebar,
  Form,
  List,
  Header,
  FormInt,
  HeaderInt,
} from './components/index';
import Modal from './components/modal';
import {renderComponent} from './services/index';

type ControllerType = {
  render: () => void;
};

type UserType = {
  id: string;
  email: string;
  displayName: string;
};

class Controller implements ControllerType {
  name: string;
  container: HTMLDivElement | null;
  form: FormInt;
  header: HeaderInt;
  user: string | null;
  wrapper: HTMLElement | null;
  headerContainer: HTMLElement | null;
  constructor(name: string, selector: string) {
    this.name = name;
    this.container = document.querySelector(selector);
    this.user = null;
    this.form = new Form();
    this.header = new Header(this.user);
  }

  userCheck = (response: any) => {
    const {displayName, email} = response;
    if (displayName || email) {
      this.user = displayName ? displayName : email;
      this.header.rerender(this.user);
      this.renderAskForm();
    }
    return response;
  };

  logInSubmitHandler = (email: string, password: string) => {
    return api.logIn(email, password).then(this.userCheck);
  };

  signUpSubmitHandler = (email: string, password: string) => {
    return api.signUp(email, password).then(this.userCheck);
  };

  renderModal = (
    title: string,
    handler: (email: string, password: string) => Promise<any>
  ) => {
    const modal = new Modal(title);
    renderComponent(this.container!, modal, 'beforeend');
    modal.submitHandler(handler);
  };

  renderHeader = () => {
    renderComponent(this.headerContainer, this.header, 'beforeend');
    this.header.logInButtonHandler((title) =>
      this.renderModal(title, this.logInSubmitHandler)
    );
    this.header.signUpButtonHandler((title) =>
      this.renderModal(title, this.signUpSubmitHandler)
    );
  };

  renderAskForm = () => {
    if (this.user) {
      renderComponent(this.headerContainer, this.form, 'beforeend');
    }
  };

  render() {
    const wrapper = new Wrapper();
    renderComponent(this.container!, new Sidebar(this.name), 'beforeend');
    renderComponent(this.container!, wrapper, 'beforeend');

    this.headerContainer = wrapper._element!.querySelector('.header');
    console.log(wrapper._element!.querySelector('.header'));
    this.renderHeader();
    // renderComponent(this.wrapper, this.form, 'beforeend');
    this.renderAskForm();

    // renderComponent(this.wrapper, new List(), 'beforeend');
  }
}

export {UserType};
export default Controller;
