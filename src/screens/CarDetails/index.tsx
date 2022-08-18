import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {api} from '../../services/api';

import { ButtonRegister } from '../../components/ButtonRegister';
import {Load} from '../../components/Load';

import { CarDTO } from '../../dtos/CarDTO';

import { 
  Container,
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
  About,
  Footer,
} from './styles';


export function CarDetails(){
  const [car, setCar] = useState<CarDTO>({} as CarDTO);
  const [loading,setLoading] = useState(true);

  const navigation = useNavigation();

  function handleConfirmRental(){
    navigation.navigate('Scheduling',{car});
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars');
        const cars = response.data as CarDTO[];
        setCar(cars[0]);
        console.log(car);
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }

    }
    fetchCars();
  },[]);
  return (
    <>
      {
        loading ?
          <Load/>
      :
          <Container>   
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
            
              <About>{car.about}</About>
            </Content>

            <Footer>{/* Dica: coloquei essa view chamado footer para deixar visivel pois o Content é um scroolView */}
              <ButtonRegister title="Escolher o período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
          </Container>
      }
    </>
  );
}