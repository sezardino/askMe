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
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Component};
export default AbsComponent;
