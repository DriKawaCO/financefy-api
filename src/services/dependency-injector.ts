export type DI = { identifier: symbol, service: any };

class DIService {
    private services: DI[];
    constructor() {
        this.services = [];
    }

    public add({ identifier, service }: DI): void {
        if (!this.get(identifier)) {
            const serviceInstance = new service();
            this.services.push({ identifier, service: serviceInstance });
        }
    }

    public get(serviceIdentifier: symbol): DI | undefined {
        return this.services.find(({ identifier }) => identifier === serviceIdentifier);
    }
}

const instance = new DIService();
export default instance;
