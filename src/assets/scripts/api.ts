import {
  ApiType,
  askResponse,
  authType,
  errorResponse,
  questionType,
} from './types';

const API_METHODS = {
  AUTH: 'accounts:signInWithCustomToken',
  CREATE_USER: 'accounts:signUp',
  SIGN_IN: 'accounts:signInWithPassword',
};

class Api implements ApiType {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  fetchData = (method: string, settings: Object) => {
    return fetch(
      `https://identitytoolkit.googleapis.com/v1/${method}?key=${this.key}`,
      settings
    );
  };

  createQuestion = (
    question: questionType
  ): Promise<Response | askResponse> => {
    return fetch(
      'https://askme-40f06-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
      {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).then((response) => response.json());
  };

  getQuestions = () => {
    return fetch(
      'https://askme-40f06-default-rtdb.europe-west1.firebasedatabase.app/questions.json'
    )
      .then((response) => response.json())
      .then((response) => {
        return Object.keys(response).map((id) => ({id, ...response[id]}));
      });
  };

  signUp = (data: authType): Promise<Response | errorResponse> => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.fetchData(API_METHODS.CREATE_USER, settings).then((response) =>
      response.json()
    );
  };

  logIn = (data: authType): Promise<Response | errorResponse> => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.fetchData(API_METHODS.SIGN_IN, settings).then((response) =>
      response.json()
    );
  };
}

export default new Api('AIzaSyAdjF6jn125bjVduVqPOANRQNQIOPJHZDU');
