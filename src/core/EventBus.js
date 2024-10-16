export default class EventBus {
  _events = {};

  // attach
  on(event, callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(callback);
  }

  // detach
  off(event, callback) {
    if (!this._events[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._events[event] = this._events[event].filter(
      (event) => event !== callback,
    );
  }

  emit(event, ...args) {
    if (!this._events[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._events[event].forEach((event) => {
      event(...args);
    });
  }
}
