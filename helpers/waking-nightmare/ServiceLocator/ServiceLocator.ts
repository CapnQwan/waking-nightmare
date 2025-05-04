export class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<Function, any> = new Map();

  private constructor() {}

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  register<T extends TClass>(service: T): void {
    this.services.set(service.constructor, service);
  }

  get<T extends TClass>(service: { new (...args: any[]): any }): T {
    const serviceInstance = this.services.get(service);
    if (!serviceInstance) {
      throw new Error(`Service ${service.name} not found`);
    }
    return serviceInstance as T;
  }
}

export default ServiceLocator.getInstance();
