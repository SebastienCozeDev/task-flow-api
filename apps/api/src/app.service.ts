import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus(): { online: boolean } {
    return {
      online: true,
    };
  }

  getOpenSourceLink(): { visibility: string, ownership: string, link: string } {
    return {
      visibility: "Private",
      ownership: "@SebastienCozeDev",
      link: "https://github.com/SebastienCozeDev/task-flow-api",
    }
  }
}
