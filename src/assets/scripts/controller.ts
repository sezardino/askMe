import api from './api';
import {
  Wrapper,
  Sidebar,
  Form,
  Header,
  FormInt,
  HeaderInt,
  Question,
} from './components/index';
import Modal from './components/modal';
import {authType, ControllerType, questionType} from './types';
import {renderComponent} from './services/index';

class Controller implements ControllerType {
  name: string;
  container: HTMLDivElement | null;
  form: FormInt;
  header: HeaderInt;
  user: string | null;
  wrapper: HTMLElement | null;
  headerContainer: HTMLElement | null;
  listContainer: HTMLDivElement | null;
  constructor(name: string, selector: string) {
    this.name = name;
    this.container = document.querySelector(selector);
    this.user = null;
    this.header = new Header();
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

  logInSubmitHandler = (data: authType) => {
    return api.logIn(data).then(this.userCheck);
  };

  signUpSubmitHandler = (data: authType) => {
    return api.signUp(data).then(this.userCheck);
  };

  askFormHandler = (question: questionType) => {
    return api.createQuestion(question).then((response) => {
      api.getQuestions().then((data) => this.renderQuestions(data));
      return response;
    });
  };

  renderModal = (title: string, handler: (data: authType) => Promise<any>) => {
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
      const form = new Form(this.user);
      renderComponent(this.headerContainer, form, 'beforeend');
      form.submitHandler(this.askFormHandler);
    }
  };

  renderQuestions = (data: Array<questionType>) => {
    this.listContainer.innerHTML = '';
    data.map((item) => {
      renderComponent(this.listContainer, new Question(item), 'afterbegin');
    });
  };

  render(data: Array<questionType>) {
    const wrapper = new Wrapper();
    renderComponent(this.container!, new Sidebar(this.name), 'beforeend');
    renderComponent(this.container!, wrapper, 'beforeend');

    this.headerContainer = document.querySelector('.content__header');
    this.listContainer = document.querySelector('.content__list');
    this.renderHeader();

    this.renderQuestions(data);
  }
}

export default Controller;
