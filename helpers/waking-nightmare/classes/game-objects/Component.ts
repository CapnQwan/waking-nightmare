import GameObject from "./GameObject";

export interface Updatable {
  update(): void;
}

class Component extends GameObject implements Updatable {
  update = () => {

  }
}

export default Component;