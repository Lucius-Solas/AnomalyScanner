import {Stack} from 'expo-router'
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';

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
        <Stack>
            <Stack.Screen name = "(tabs)"
            options = {{headerShown: false}}
            />
        </Stack>
        </ThemeProvider>
    )
}