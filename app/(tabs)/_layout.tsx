//fol 23
import { Ionicons } from '@expo/vector-icons'
import {Tabs} from 'expo-router'
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F766E',
    background: '#094738',
    card: '#F4FBF9',
    text: '#0F172A',
    border: '#D1FAE5',
    notification: '#EF4444',
  },
};

export default function TabsLayout(){
    return (
        <ThemeProvider value={MyTheme}>
        <Tabs>
            <Tabs.Screen
            name = "index"
                options = {{
                    title: "Home",
                    tabBarIcon: ({color}:any) =>
                        <Ionicons size={28} name="home-outline" color = {color}/>
                }}
                />
            <Tabs.Screen
            name="addnew"
                options={{
                    title: "New Anomaly",
                    tabBarIcon: ({color}:any) =>
                        <Ionicons size={28} name="add-circle-outline" color = {color}/>
            }}
            />
            <Tabs.Screen
            name="mine"
                options={{
                    title: "My Anomalies",
                    tabBarIcon: ({color}:any) =>
                        <Ionicons size={28} name="planet-outline" color = {color}/>
            }}
            />
            <Tabs.Screen
            name="search"
            options={{
                title: "Search",
                tabBarIcon: ({color}:any) =>
                        <Ionicons size={28} name="search" color = {color}/>
            }}
            />
        </Tabs>
        </ThemeProvider>
    )
}