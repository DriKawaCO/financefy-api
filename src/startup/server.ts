import App from './app.js';
import config from 'config';
import http from 'http';

class Server {
    private app: App;
    private port: number;
    private server: http.Server | null;

    constructor() {
        this.app = new App();
        this.port = config.get<number>('api.port');
        this.server = null;
    }

    public async startup(): Promise<void> {
        await this.app.build();
        this.server = this.app.express.listen(this.port, () => {
            console.log(`Server is listening on: ${this.port}`);
        });
    }

    public stop(): void {
        if (this.server) {
            this.server.close();
        }
    }
}

export default Server;
