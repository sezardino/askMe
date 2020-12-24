type ApiType = {
  key: string;
};

type askResponse = {
  name: string;
};

type errorResponse = {
  code: number;
  errors: Array<{}>;
  message: string;
};

type questionType = {
  author: string;
  question: string;
  date: string;
  id?: string;
};

type authType = {
  email: string;
  password: string;
};

type UserType = {
  id: string;
  email: string;
  displayName: string;
};

type Component = {
  getTemplate: () => string;
  getElement: () => Element | null;
  removeElement: () => void;
};

interface AbsSmartComponentInterface extends Component {
  rerender: (data: any) => void;
}

interface HeaderInt extends AbsSmartComponentInterface {
  data: string | null;
  logInButtonHandler: (handler: (title: string) => void) => void;
  signUpButtonHandler: (handler: (title: string) => void) => void;
}

interface FormInt extends Component {
  submitHandler: (question: any) => void;
}

type ControllerType = {
  render: (data: Array<Object>) => void;
};

interface ControllerInt {
  userCheck: (response: any) => Promise<Response | errorResponse>;
  logInSubmitHandler: (data: authType) => Promise<Response | errorResponse>;
  signUpSubmitHandler: (data: authType) => Promise<Response | errorResponse>;
  askFormHandler: (question: questionType) => Promise<Response | askResponse>;
  renderModal: (
    title: string,
    handler: (data: authType) => Promise<any>
  ) => void;
  renderHeader: () => void;
  renderAskForm: () => void;
  renderQuestions: (data: Array<questionType>) => void;
  render(data: Array<questionType>): void;
}

export {
  ApiType,
  errorResponse,
  questionType,
  authType,
  askResponse,
  HeaderInt,
  Component,
  AbsSmartComponentInterface,
  FormInt,
  UserType,
  ControllerType,
};
