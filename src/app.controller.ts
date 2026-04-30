import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from "@nestjs/swagger";


@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello World message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  @ApiOperation({ summary: 'Retrieve the status of the application' })
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('/link')
  @ApiOperation({ summary: 'Retrieve the repository information' })
  getOpenSourceLink() {
    return this.appService.getOpenSourceLink();
  }
}
