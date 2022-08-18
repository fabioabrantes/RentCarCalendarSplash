import {eachDayOfInterval,format} from 'date-fns';
import {MarkedDateProps} from '.';
import {DateData} from 'react-native-calendars';

import {THEME} from '../../global/styles/theme';

export function generateInterval(dateStart:DateData, dateEnd:DateData){
  let interval:MarkedDateProps = {};
  let datePeriod = eachDayOfInterval({
    start: new Date(dateStart.timestamp), end:new Date(dateEnd.timestamp)});
  
  datePeriod.forEach(date=>{
    const dateFormated = format(date, 'yyyy-MM-dd');

    interval = {
      ...interval,
      [dateFormated]:{
        color:(dateStart.dateString === dateFormated || dateEnd.dateString === dateFormated)?
        THEME.colors.main : THEME.colors.main_light,
        textColor: (dateStart.dateString === dateFormated || dateEnd.dateString === dateFormated)?
        THEME.colors.main_light : THEME.colors.main
      }
    }
  })

  return interval;
}