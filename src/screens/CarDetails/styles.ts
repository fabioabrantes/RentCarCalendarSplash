import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  flex:1;
  background-color: ${({theme})=>theme.colors.background_secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin-top:${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImageContainer = styled.View`
  margin-top:${getStatusBarHeight() + 32}px;
  width:${Dimensions.get('window').width}px;
  height:132px;
  justify-content:center;
  align-items:center
`;

export const CarImage = styled.Image`
  width: 280px;
  height:160px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{
    padding:24,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator:false,
})``;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  margin-top: 38px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme})=>theme.fonts.secondary_500};
  color: ${({theme})=>theme.colors.text_detail};
  text-transform:uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({theme})=>theme.fonts.secondary_500};
  color: ${({theme})=>theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme})=>theme.fonts.secondary_500};
  color: ${({theme})=>theme.colors.text_detail};
  text-transform:uppercase;
`;

export const Price = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({theme})=>theme.fonts.secondary_500};
  color: ${({theme})=>theme.colors.main};
`;

export const About = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme})=>theme.fonts.primary_400};
  color: ${({theme})=>theme.colors.text};
  text-align: justify;
  line-height: 25px;
  margin-top:${RFValue(23)}px;
`;

export const Footer = styled.View`
  width: 100%;
  background-color: ${({theme})=>theme.colors.background_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;