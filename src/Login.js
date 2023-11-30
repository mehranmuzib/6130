import React, {useState} from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config'

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    loginUser = async(email,password) => {
        try {
             await firebase.auth().signInWithEmailAndPassword(email,password)
        } catch(error){
            alert(error.message)
        }
    }

    return (
        <View style={StyleSheet.container}>
            <Text style={{fontWeight: 'bold',fontSize:26}}>
                Login
            </Text>

            <View style={{marginTop:40}}>

                <TextInput
                        style={StyleSheet.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        style={StyleSheet.textInput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />

            </View>
            <TouchableOpacity 
            onPress={() => loginUser(email, password)}
            style={styles.button} 
            >
            <Text style={{fontWeight:'bold', fontSize:22}}>
                Login
            </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.navigate('Registration')}
            style={{marginTop:20}} 
            >
            <Text style={{fontWeight:'bold', fontSize:16}}>
                Don't have an account?
            </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    container: {
       flex: 1,
       allignItems: 'cecnter',
       marginTop:100,
    },
    title: {
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20,
    },
    textInput: {
       paddingTop:20,
       paddingBottom:10,
       width:400,
       fontSize:20,
       borderBottomWidth:1,
       borderBottomColor:'#000',
       marginBottom:10,
       textAlign:'center'

    },
    button: {
       marginTop: 50,
       height:70,
       width:250,
       backgroundColor:'#026efd',
       allignItems:'center',
       justifyContent:'center',
       borderRadius:50,

    },
    buttonText: {
       color: 'white',
       fontWeight: 'bold',
       textAlign: 'center',
    },
   });