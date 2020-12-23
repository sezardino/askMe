import AbsComponent, {Component} from './absComponent';

interface AbsSmartComponentInterface extends Component {
  rerender: (data: any) => void;
}

abstract class AbsSmartComponent
  extends AbsComponent
  implements AbsSmartComponentInterface {
  data: any;
  abstract recoveryListeners(): void;
  constructor(data: any) {
    super();
    this.data = data;
  }

  rerender(data: any) {
    this.data = data;
    console.log(1);
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent!.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}

export {AbsSmartComponentInterface};
export default AbsSmartComponent;
