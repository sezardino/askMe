import {Component} from '../components/absComponent';
import {HeaderInt} from '../components/index';

const ERRORS = {
  INV_PASSWORD: 'INVALID_PASSWORD',
  INV_EMAIL: 'INVALID_EMAIL',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  MISS_EMAIL: 'MISSING_EMAIL',
  MISS_PASSWORD: 'MISSING_PASSWORD',
  TO_MANY:
    'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
};

const createElement = (template: string): Element => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild!;
};

const renderComponent = (
  container: Element,
  element: Component | HeaderInt,
  place: InsertPosition
) => {
  container.insertAdjacentElement(place, element.getElement()!);
};

const removeComponent = (component: Component) => {
  component.getElement().remove();
  component.removeElement();
};

const getErrorMessage = (error: any) => {
  let message;
  switch (error.message) {
    case ERRORS.INV_PASSWORD:
      message = 'Invalid password';
      break;
    case ERRORS.TO_MANY:
      message = 'Access to this account has been temporarily disabled';
      break;
    case ERRORS.INV_EMAIL:
      message = 'Invalid email';
      break;
    case ERRORS.MISS_EMAIL:
      message = 'Missing email';
      break;
    case ERRORS.MISS_PASSWORD:
      message = 'Missing email';
      break;
    case ERRORS.EMAIL_EXISTS:
      message = 'this email is already in use';
      break;
  }
  return message;
};

export {createElement, renderComponent, removeComponent, getErrorMessage};
