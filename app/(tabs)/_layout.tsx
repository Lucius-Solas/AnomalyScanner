//fol 23
import { Ionicons } from '@expo/vector-icons'
import {Tabs} from 'expo-router'

export default function TabsLayout(){
    return (
    
        <Tabs screenOptions={{ headerShown: false }}>
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
       
    )
}