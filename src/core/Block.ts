import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus.ts';

export interface BaseProps {
    events?: Partial<Record<string, (event: FocusEvent) => void>>;

    [key: string]: unknown;
}

export default class Block<Props extends BaseProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _props;

  _children;

  _id;

  _element: HTMLElement | null = null;

  _lists;

  _meta;

  _eventBus;

  _setUpdate = false;

  constructor(propsAndChilds: Props, tagName = 'div') {
    const { children, props, lists } = this.getChildren(propsAndChilds);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = this.makePropsProxy(children);
    // this._children = children;
    this._lists = this.makePropsProxy(lists);
    this._props = this.makePropsProxy({ ...props, __id: this._id });
    this._meta = { tagName, props };

    this.registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  init() {
    this._element = this.createDocumentElement(this._meta.tagName);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
  }

  componentDidUpdate(_oldProps: BaseProps, _newProps: BaseProps) {
    return true;
  }

  registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
        this._element!.innerHTML = '';
        this._element!.appendChild(block);
        this.addAttribute();
        this.addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  // addEvents() {
  //   const { events = {} } = this._props;
  //   Object.keys(events).forEach((eventName) => {
  //           this._element!.addEventListener(eventName, events[eventName]);
  //   });
  // }
  addEvents() {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => {
      const eventHandler = events[eventName as keyof typeof events];
      if (eventHandler && typeof eventHandler === 'function') {
                this._element!.addEventListener(eventName, eventHandler as EventListener);
      }
    });
  }

  // removeEvents() {
  //   const { events = {} } = this._props;
  //   Object.keys(events).forEach((eventName) => {
  //           this._element!.removeEventListener(eventName, events[eventName]);
  //   });
  // }

  removeEvents() {
    const { events = {} } = this._props;
    Object.keys(events).forEach((eventName) => {
      const eventHandler = events[eventName as keyof typeof events];
      if (eventHandler && typeof eventHandler === 'function') {
                this._element!.removeEventListener(eventName, eventHandler as EventListener);
      }
    });
  }

  // addAttribute() {
  //   const { attr = {} } = this._props;
  //   Object.entries(attr).forEach(([key, value]) => {
  //           this._element!.setAttribute(key, value as string);
  //   });
  // }
  addAttribute() {
    const attr = this._props.attr || {};
    if (typeof attr === 'object' && !Array.isArray(attr)) {
      Object.entries(attr).forEach(([key, value]) => {
        if (typeof value === 'string') {
                    this._element!.setAttribute(key, value);
        }
      });
    }
  }

  getChildren(propsAndChilds: Props) {
    const children: Record<string, Block<BaseProps>> = {};
    const props: BaseProps = {};
    const lists: Record<string, typeof Block[]> = {};

    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Block) children[key] = propsAndChilds[key];
      else if (Array.isArray(propsAndChilds[key])) lists[key] = propsAndChilds[key];
      else props[key] = propsAndChilds[key];
    });

    return { children, props, lists };
  }

  getElement() {
    return this._element;
  }

  getId() {
    return this._id;
  }

  compile(template: string, props: BaseProps) {
    if (!props) props = this._props;

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, children]) => {
      propsAndStubs[key] = `<div data-id="${(children as Block<BaseProps>).getId()}"></div>`;
    });

    Object.entries(this._lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__1_${key}"></div>`;
    });

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((children) => {
      const stub = fragment.content.querySelector(`[data-id="${(children as Block<BaseProps>).getId()}"]`);
      if (stub) stub.replaceWith((children as Block<BaseProps>).getContent() as Node); // так было у Коли
      // if (stub) stub.replaceWith(children.getElement());
    });

    Object.entries(this._lists).forEach(([key, listItem]) => {
      const stub = fragment.content.querySelector(`[data-id="__1_${key}"]`);

      if (!stub) {
        return;
      }

      const listContent = this.createDocumentElement('template') as HTMLTemplateElement;

      (listItem as Block<BaseProps>[]).forEach((item) => {
        if (item) listContent.content.append(item.getContent() as Node);
        else listContent.content.append(`${item}`);
      });

      stub.replaceWith(listContent.content);
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    (Object.values(this._children) as Block<BaseProps>[]).forEach((children) => {
      children.dispatchComponentDidMount();
    });
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(oldProps: BaseProps, newProps: BaseProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // show() {
  //   this.getContent().style.display = 'block';
  // }
  //
  // hide() {
  //   this.getContent().style.display = 'none';
  // }

  getContent() {
    return this._element;
  }

  setProps(newProps: BaseProps) {
    if (!newProps) return;

    this._setUpdate = false;
    const oldValue = { ...this._props };
    const { props, children } = this.getChildren(newProps as Props);

    if (Object.values(children).length) Object.assign(this._children, children);
    if (Object.values(props).length) Object.assign(this._props, props);

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }

  makePropsProxy(props: BaseProps) {
    return new Proxy<BaseProps>(props, {
      get(target, prop: string) { // TODO: сотри эту функцию, она не используется нигде
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop: string, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }

        return true;
      },

    });
  }
}
