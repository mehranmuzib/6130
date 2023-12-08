import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState,useEffect} from 'react'
import {firebase} from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import QR from "./src/QR"
import Header from "./components/Header";
import QRCodeScanner from './src/SecondPage';

const Stack = createStackNavigator();

function App(){
   const[initializing, setInitilizing] = useState(true);
   const [user, setUser] = useState();

   function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitilizing(false);
   }

   useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
   }, []);
   if (initializing) return null;

   if (!user){
      return(
         <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
               headerTitle: () => <Header name = "Login" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />

           <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
               headerTitle: () => <Header name = "Registration" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />


           <Stack.Screen
            name="QR"
            component={QR}
            options={{
               headerTitle: () => <Header name = "Scan it" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />

           <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
               headerTitle: () => <Header name = "Dashboard" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />

         <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
           </Stack.Navigator>

         
      );
   }

   return (
      <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
               headerTitle: () => <Header name = "QR" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />

      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
      
      <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
               headerTitle: () => <Header name = "Registration" />,
             headerStyle:{
               height:150,
               borderBottomLeftRadius:50,
               borderBottomRightRadius:50,
               backgroundColor:'#00e4d0',
               shadowColor: '#000',
               elevation:25
             }  
            }}

            />
      

      </Stack.Navigator>

      

      
   );

}


export default () => {
   return (
      <NavigationContainer>
         <App />
      </NavigationContainer>
   )
}