import {Stack} from 'expo-router'
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { AnomalyProvider } from '../context/AnomalyContext';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    background: '#202035',
    card: '#31315f',
    text: '#ffffff',
    border: '#D1FAE5',
    notification: '#EF4444',
  },
};

export default function Layout (){
    return(
        <ThemeProvider value={MyTheme}>
    <AnomalyProvider>
      <Stack>
        <Stack.Screen name = "(tabs)"
        options = {{headerShown: false}}
        />
      </Stack>
    </AnomalyProvider>
        </ThemeProvider>
    )
}