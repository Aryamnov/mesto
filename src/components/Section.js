export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderer(this._renderedItems);
  }
}
