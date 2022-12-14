import React,{useEffect, useState} from 'react';

import {useTheme} from 'styled-components';
import { StatusBar} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import {DateData} from 'react-native-calendars';

import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ButtonRegister } from '../../components/ButtonRegister';
import {Calendar,MarkedDateProps,generateInterval} from '../../components/Calendar';

import ArrowSvg  from '../../assets/arrow.svg';

import { 
  Container,
  Header,
   Title,
   RentalPeriod,
   DateInfo,
   DateTitle,
   DateValue,
   Content,
   Footer,
   } from './styles';

import { format } from 'date-fns';

interface RentalPeriod{
  startFormatted:string;
  endFormatted:string;
}

interface Params{
  car:CarDTO;
}

export function Scheduling(){
  const [datasMarcadas, setDatasMarcadas] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails',{
      car,
      dates:Object.keys(datasMarcadas)
    });
  }

  function handleBack(){
    navigation.goBack();
  }

  function handleChangeDate(date:DateData){
    let dateInit = !lastSelectedDate.timestamp? date : lastSelectedDate;
    let dateEnd = date;
    if(dateInit.timestamp > dateEnd.timestamp){
      dateInit = dateEnd;
      dateEnd = dateInit;
    }
    setLastSelectedDate(dateEnd);
    //codigo para gerar intervalo de datas entre init e end;
    const interval = generateInterval(dateInit,dateEnd);
    console.log(interval);
    setDatasMarcadas({...datasMarcadas , ...interval});

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      startFormatted: format(new Date(firstDate), 'dd/MM/yyyy'),
      endFormatted: format(new Date(endDate), 'dd/MM/yyyy'),
    });
  }

  useEffect(()=>{
    async function fetchCars(){
      let unavailableDatesMarked:MarkedDateProps = {};
      try {
        const response = await api.get(`/schedules_bycars/${car.id}`);
        const dates = response.data.unavailable_dates as string[];
        dates.forEach(date =>{
          unavailableDatesMarked = {
            ...unavailableDatesMarked,
            [date]:{
              color:theme.colors.shape,
              textColor:theme.colors.text,
              disabled:true,
              disableTouchEvent:true
            }
          }
        });
        setDatasMarcadas(unavailableDatesMarked);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchCars();
    console.log(datasMarcadas);
  },[]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          color={theme.colors.shape} 
          onPress={handleBack}
        />

        <Title>
          Escolha uma {'\n'}
          data de in??cio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue dateSelected={false}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg/>

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue dateSelected={false}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={datasMarcadas}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <ButtonRegister 
          title="Confirmar" 
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
}