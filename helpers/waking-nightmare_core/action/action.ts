export class Action<T> {
  subscribers: Array<(data: T) => void> = [];

  constructor() {}

  public subscribe(callback: (data: T) => void) {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: (data: T) => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  public invoke(data: T) {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}
