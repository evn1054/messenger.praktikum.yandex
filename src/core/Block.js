import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _props;

  _children;

  _id;

  _element;

  _lists;

  _meta;

  _eventBus;

  _setUpdate = false;

  // constructor(tagName = 'div', propsAndChildrens: Record<string, unknown> = {}) {
  constructor(tagName = 'div', propsAndChilds = {}) {
    const { children, props, lists } = this.getChildren(propsAndChilds);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this.makePropsProxy(children);
    this._lists = this.makePropsProxy(lists);
    this._props = this.makePropsProxy({ ...props, __id: this._id });
    this._meta = { tagName, props };

    this.registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  init() {
    this._element = this.createDocumentElement(this._meta?.tagName);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
  }

  componentDidUpdate(oldProps, newProps) {
    console.log('newProps, oldProps >>>>', newProps, oldProps);
    return true;
  }

  registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    if (this._props.settings?.withInternalId) element.setAttribute('data-id', this._id);

    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addAttribute();
    this.addEvents();
  }

  render() {
  }

  addEvents() {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttribute() {
    const { attr = {} } = this._props;
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  getChildren(propsAndChilds) {
    const children = {};
    const props = {};
    const lists = {};

    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Block) children[key] = propsAndChilds[key];
      else if (Array.isArray(propsAndChilds[key])) lists[key] = propsAndChilds[key];
      else props[key] = propsAndChilds[key];
    });

    return { children, props, lists };
  }

  compile(template, props) {
    if (typeof props === 'undefined') props = this._props;

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, children]) => {
      propsAndStubs[key] = `<div data-id="${children._id}"></div>`;
    });

    Object.entries(this._lists).forEach(([key, listItem]) => {
      propsAndStubs[key] = `<div data-id="__1_${key}"></div>`;
    });

    const fragment = this.createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((children) => {
      const stub = fragment.content.querySelector(`[data-id="${children._id}"]`);
      if (stub) stub.replaceWith(children.getContent());
    });

    Object.entries(this._lists).forEach(([key, listItem]) => {
      const stub = fragment.content.querySelector(`[data-id="__1_${key}"]`);

      if (!stub) {
        return;
      }

      const listContent = this.createDocumentElement('template');

      listItem.forEach((item) => {
        if (item instanceof Block) listContent.content.append(item.getContent());
        else listContent.content.append(`${item}`);
      });

      stub.replaceWith(listContent.content);
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((children) => {
      children.dispatchComponentDidMount();
    });
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(oldProps, newProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // с этим setProps будет происходить много ререндеров
  // setProps = (newProps) => {
  //   if (!newProps) {
  //     return;
  //   }
  //
  //   const { children, props } = this.getChildren(newProps);
  //
  //   if (Object.values(children).length) Object.assign(this._children, children);
  //   if (Object.values(props).length) Object.assign(this._props, props);
  // };
  //
  // makePropsProxy(props) {
  //   // Можно и так передать this
  //   // Такой способ больше не применяется с приходом ES6+
  //
  //   return new Proxy(props, {
  //     get(target, prop) {
  //       const value = target[prop];
  //       return typeof value === 'function' ? value.bind(target) : value;
  //     },
  //     set: (target, prop, value) => {
  //       const oldValue = { ...target };
  //       target[prop] = value;
  //       this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
  //
  //       return true;
  //     },
  //     // deleteProperty() {
  //     //   throw new Error('Нет доступа');
  //     // },
  //   });
  // }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  getContent() {
    return this._element;
  }

  setProps(newProps) {
    if (!newProps) return;

    this._setUpdate = false;
    const oldValue = { ...this._props };
    const { props, children } = this.getChildren(newProps);

    if (Object.values(children).length) Object.assign(this._children, children);
    if (Object.values(props).length) Object.assign(this._props, props);

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }

  makePropsProxy(props) {
    return new Proxy(props, {
      get(target, props) {
        const value = target[props];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }

        return true;
      },
    });
  }
}
