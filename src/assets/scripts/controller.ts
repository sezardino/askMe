import api from './api';
import {Component} from './components/absComponent';
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
  constructor(name: string, selector: string) {
    this.name = name;
    this.container = document.querySelector(selector);
    this.user = null;
    this.form = new Form();
    this.header = new Header(this.user);
  }

  logInSubmitHandler = (email: string, password: string) => {
    return api.logIn(email, password).then((response: any) => {
      const {displayName, email} = response;
      if (displayName || email) {
        this.user = displayName ? displayName : email;
        this.header.rerender(this.user);
      }
      console.log(this);
      return response;
    });
  };

  signUpSubmitHandler = (email: string, password: string) => {
    return api.signUp(email, password).then((response: any) => {
      const {displayName, email} = response;
      if (displayName || email) {
        this.user = displayName ? displayName : email;
        this.header.rerender(this.user);
      }
      console.log(this);
      return response;
    });
  };

  renderModal = (
    title: string,
    handler: (email: string, password: string) => Promise<any>
  ) => {
    const modal = new Modal(title);
    renderComponent(this.container!, modal, 'beforeend');
    modal.submitHandler(handler);
  };

  renderHeader = (container: Element) => {
    renderComponent(container, this.header, 'afterbegin');
    this.header.logInButtonHandler((title) =>
      this.renderModal(title, this.logInSubmitHandler)
    );
    this.header.signUpButtonHandler((title) =>
      this.renderModal(title, this.signUpSubmitHandler)
    );
  };

  render() {
    renderComponent(this.container!, new Sidebar(this.name), 'beforeend');

    const wrapper = new Wrapper();
    renderComponent(this.container!, wrapper, 'beforeend');
    const wrapperSection = wrapper._element!.querySelector('.content__wrapper');
    renderComponent(wrapperSection!, this.form, 'afterbegin');
    this.renderHeader(wrapperSection!);
    // this.form.submitHandler(api.signIn);

    renderComponent(wrapperSection!, new List(), 'beforeend');
  }
}

export {UserType};
export default Controller;
