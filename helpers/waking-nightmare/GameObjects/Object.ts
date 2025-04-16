export interface IObjectConstructor {
  name?: string | null;
  id?: number | null;
}

export class Object {
  name: string | null = null;
  id: number | null = null;

  constructor({ id = null, name = null }: IObjectConstructor) {
    if (id) this.id = id;
    if (name) this.name = name;
  }
}
