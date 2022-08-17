import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Load} from '../../components/Load';

import {useTheme} from 'styled-components';

import { Container,Title } from './styles';

interface Props extends TouchableOpacityProps{
  title:string;
  color?:string;
  enabled?:boolean;
  loading?:boolean;
}
export function ButtonRegister({
  title,
  color,
  enabled=true, 
  loading= false,
  ...rest
}:Props){
  const theme = useTheme();

  return (
    <Container 
      {...rest} 
      color={color? color: theme.colors.main}
      enabled={enabled}
      style={{opacity:(enabled === false || loading === true) ? 0.5: 1}}
    >
      {loading ?
        <Load />
        :
        <Title>{title}</Title>
      }      
    </Container>
  );
}

