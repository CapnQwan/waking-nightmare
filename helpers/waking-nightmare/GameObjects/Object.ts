class Object {
  name: string | null = null;
  id: number | null = null;

  constructor({ name = null }: { name?: string | null }) {
    this.name = name;
  }
}

export default Object;
