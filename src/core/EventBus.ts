export type Callback = (...args: any[]) => void;

export default class EventBus {
  _events: Record<string, Callback[]> = {};

  // attach
  on(event: string, callback: Callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(callback);
  }

  // detach
  off(event: string, callback: Callback) {
    if (!this._events[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._events[event] = this._events[event].filter(
      (item) => item !== callback,
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this._events[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._events[event].forEach((item) => {
      item(...args);
    });
  }
}
