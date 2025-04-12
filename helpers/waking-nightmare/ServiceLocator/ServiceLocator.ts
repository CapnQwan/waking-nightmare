class ServiceLocator {
    private static instance: ServiceLocator;
    private services: Map<string, any> = new Map();

    private constructor() {}

    static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    register<T>(key: string, service: T): void {
        this.services.set(key, service);
    }

    get<T>(key: string): T {
        const service = this.services.get(key);
        if (!service) {
            throw new Error(`Service ${key} not found`);
        }
        return service as T;
    }
}

export default ServiceLocator.getInstance();
