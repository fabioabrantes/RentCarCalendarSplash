import React,{useState,useEffect} from 'react';
import { Alert } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components'
import { useNavigation,useRoute } from '@react-navigation/native';
import {format} from 'date-fns';

import { BackButton } from '../../components/BackButton';

import { ButtonRegister } from '../../components/ButtonRegister';

import { CarDTO } from '../../dtos/CarDTO';


import { api } from '../../services/api';

import { 
  Container,
  Header,
  CarImageContainer,
  CarImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

interface Params{
  car:CarDTO;
  dates:string[];
}
interface RentalPeriod{
  start:string;
  end:string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {car,dates} = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental(){
     setLoading(true);
     try {
      const response = await api.get(`/schedules_bycars/${car.id}`);
      const unavailable_dates =[
        ...response.data.unavailable_dates,
        ...dates
      ];
      await api.post('schedules_byuser',{
        user_id:1,
        car,
        startDate:format(new Date(dates[0]),'dd/MM/yyyy'),
        endDate:format(new Date(dates[dates.length - 1]),'dd/MM/yyyy'),
      });
      
      api.put(`/schedules_bycars/${car.id}`,{
        id:car.id,
        unavailable_dates,
      })
     } catch (error) {
       console.log(error);
       Alert.alert("Não foi possível confirmar o agendamento");
     }finally{
      setLoading(false);
      navigation.navigate('ScheduleSuccess');
     }
       
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(()=>{
    setRentalPeriod({
      start:format(new Date(dates[0]),'dd/MM/yyyy'),
      end:format(new Date(dates[dates.length - 1]),'dd/MM/yyyy'),
    });
  },[]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>
      
      <CarImageContainer>
        <CarImage 
          source={{uri:car.photos[0]}}
          resizeMode="contain"
        />
      </CarImageContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

       <RentalPeriod>
         <CalendarIcon>
           <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape}/>
         </CalendarIcon>

         <DateInfo>
           <DateTitle>De</DateTitle>
           <DateValue>{rentalPeriod.start}</DateValue>
         </DateInfo>

         <Feather name="calendar" size={RFValue(10)} color={theme.colors.text}/>

         <DateInfo>
           <DateTitle>ATÉ</DateTitle>
           <DateValue>{rentalPeriod.end}</DateValue>
         </DateInfo>         
       </RentalPeriod>

       <RentalPrice>
         <RentalPriceLabel>TOTAL</RentalPriceLabel>

         <RentalPriceDetails>
           <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
           <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
         </RentalPriceDetails>
       </RentalPrice>
      </Content>

      <Footer>{/* Dica: coloquei essa view chamado footer para deixar visivel pois o Content e um scroolView */}
        <ButtonRegister 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}