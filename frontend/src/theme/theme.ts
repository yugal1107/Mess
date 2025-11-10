import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8B4350', // A deep, confident raspberry
    secondary: '#765A5E', // A warm, sophisticated taupe
    tertiary: '#7C5A31', // A classic, rich brown
  },
  fonts: configureFonts({ config: fontConfig }),
};
