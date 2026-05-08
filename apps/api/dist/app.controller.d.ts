import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getStatus(): {
        online: boolean;
    };
    getOpenSourceLink(): {
        visibility: string;
        ownership: string;
        link: string;
    };
}
