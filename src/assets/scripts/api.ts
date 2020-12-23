const API_METHODS = {
  AUTH: 'accounts:signInWithCustomToken',
  CREATE_USER: 'accounts:signUp',
  SIGN_IN: 'accounts:signInWithPassword',
};

type ApiType = {
  key: string;
};

type errorType = {
  code: number;
  errors: Array<{}>;
  message: string;
};

class Api {
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

  signUp = (email: string, password: string): Promise<Response | errorType> => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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

  logIn = (email: string, password: string): Promise<Response | errorType> => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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
