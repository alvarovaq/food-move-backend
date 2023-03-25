import { Test, TestingModule } from '@nestjs/testing';
import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';

describe('WeeklyDietController', () => {
  let controller: DietsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietsController],
      providers: [DietsService],
    }).compile();

    controller = module.get<DietsController>(DietsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
