import {ThemeProvider} from 'styled-components';
import {
  useFonts, 
  Inter_400Regular,
  Inter_500Medium 
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium, 
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import {Load} from './src/components/Load';

import {Routes} from './src/routes';

import {THEME} from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium, 
    Archivo_600SemiBold
  });

  if(!fontsLoaded){
    return (
      <ThemeProvider theme={THEME}>
        <Load/>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={THEME}>
      <Routes />
    </ThemeProvider>
  );
}