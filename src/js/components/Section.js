export default class Section {
  constructor({renderer}, selector) {
  //  this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);

  }

  renderItems(data,id) {
    this._renderedItems = data;
    this._renderedItems.forEach(item => this._renderer(item,id))
  }



  addItem(element) {
    this._container.prepend(element);
  }
}
