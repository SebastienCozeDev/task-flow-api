import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getHello: jest.fn().mockReturnValue('Hello World!'),
    getStatus: jest.fn().mockReturnValue({ online: true }),
    getOpenSourceLink: jest.fn().mockReturnValue({
      visibility: 'Public',
      ownership: '@SebastienCozeDev',
      link: 'https://github.com/SebastienCozeDev/task-flow-api',
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      expect(mockAppService.getHello).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStatus', () => {
    it('should return the application status', () => {
      expect(appController.getStatus()).toEqual({ online: true });
      expect(mockAppService.getStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOpenSourceLink', () => {
    it('should return the repository information', () => {
      expect(appController.getOpenSourceLink()).toEqual({
        visibility: 'Public',
        ownership: '@SebastienCozeDev',
        link: 'https://github.com/SebastienCozeDev/task-flow-api',
      });
      expect(mockAppService.getOpenSourceLink).toHaveBeenCalledTimes(1);
    });
  });
});
