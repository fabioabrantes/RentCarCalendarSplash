import { CarDTO } from '../../dtos/CarDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      CarDetails: undefined;
      ScheduleSuccess: undefined;
      Scheduling: {car:CarDTO};
      SchedulingDetails:{car:CarDTO, dates:string[]};
      Splash:undefined;
    }
  }
}