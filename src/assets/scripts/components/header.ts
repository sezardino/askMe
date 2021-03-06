import {HeaderInt} from '../types';
import AbsSmartComponent from './absSmartComponent';

const headerTemplate = (user?: string | null) => {
  const withUserClass = user ? '' : 'hidden';
  const withoutUserClass = user ? 'hidden' : '';
  return `
  <div class="header__info">
    <div class="header__wrapper ${withUserClass}">
      <p class="user">${user}</p>
    </div>
    <button class="mui-btn mui-btn--primary btn-login ${withoutUserClass}">Log In</button>
    <button class="mui-btn mui-btn--primary btn-signup ${withoutUserClass}">Sign Up</button>
  </div>`;
};

class Header extends AbsSmartComponent implements HeaderInt {
  data: string | null;
  _logInButtonHandler: (title: string) => void;
  _signUpButtonHandler: (title: string) => void;

  getTemplate() {
    return headerTemplate(this.data);
  }

  logInButtonHandler = (handler: (title: string) => void) => {
    this._logInButtonHandler = handler;
    this.getElement()
      .querySelector('.btn-login')
      .addEventListener('click', () => {
        handler('Log in');
      });
  };

  signUpButtonHandler = (handler: (title: string) => void) => {
    this._signUpButtonHandler = handler;
    this.getElement()
      .querySelector('.btn-signup')
      .addEventListener('click', () => {
        handler('Sign Up');
      });
  };

  recoveryListeners() {
    this.logInButtonHandler(this._logInButtonHandler);
    this.signUpButtonHandler(this._signUpButtonHandler);
  }
}

export {HeaderInt};
export default Header;
