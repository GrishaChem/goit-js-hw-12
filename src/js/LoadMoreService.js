export default class ButtonService {
  constructor(buttonEl, hiddenClass) {
    this.buttonEl = buttonEl;
    this.hiddenClass = hiddenClass;
  }
  hide() {
    this.buttonEl.classList.add(this.hiddenClass);
  }
  show() {
    this.buttonEl.classList.remove(this.hiddenClass);
  }
  disable() {
    this.buttonEl.disabled = true;
  }
  enable() {
    this.buttonEl.disabled = false;
  }
}
