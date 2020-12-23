import {Component} from '../components/absComponent';

const createElement = (template: string): Element => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild!;
};

const renderComponent = (
  container: Element,
  element: Component,
  place: InsertPosition
) => {
  container.insertAdjacentElement(place, element.getElement()!);
};

export {createElement, renderComponent};
