type EventName = string;
type EventHandler = (...args: any[]) => any;
type EventQueue = { [key: EventName]: EventHandler[] };

class EventCenter {
  eventQueue: EventQueue = {};

  on(event: EventName, handler: EventHandler) {
    if (this.eventQueue[event] && !this.eventQueue[event].includes(handler)) {
      this.eventQueue[event].push(handler);
    } else if (!this.eventQueue[event]) {
      this.eventQueue[event] = [];
      this.eventQueue[event].push(handler);
    }
  }

  off(event: string, handler: EventHandler) {
    if (!handler && this.eventQueue[event]) {
      delete this.eventQueue[event];
      return;
    }
    if (this.eventQueue[event]) {
      this.eventQueue[event].splice(this.eventQueue[event].indexOf(handler) >>> 0, 1);
    }
  }

  trigger(event: string, ...args: any[]) {
    if (this.eventQueue[event]) this.eventQueue[event].forEach((handler) => handler(...args));
  }
}

export const event = new EventCenter();
