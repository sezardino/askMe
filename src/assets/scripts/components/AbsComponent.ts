import {createElement} from '../services/index';

type Component = {
  getTemplate: () => string;
  getElement: () => Element | null;
  removeElement: () => void;
};

abstract class AbsComponent implements Component {
  _element: Element | null;
  abstract getTemplate(): string;

  constructor() {
    this._element = null;
  }

  getElement() {
    return (this._element = createElement(this.getTemplate()));
  }

  removeElement() {
    this._element = null;
  }
}

export {Component};
export default AbsComponent;
