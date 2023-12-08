import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import Registration from './Registration';
import {firebase} from '../config'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const API_KEY = 'c1a13e30ad9c2b03074f07e4f145188b52dfe304fd6d6cef4cd539914694a856'; 

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [isMalicious, setIsMalicious] = useState(false);
  const navigation = useNavigation()

 
  const checkURL = async () => {
    try {
      const response = await axios.get(
        `https://www.virustotal.com/vtapi/v2/url/report`,
        {
          params: {
            apikey: API_KEY,
            resource: url,
          },
        }
      );

      if (response.data.response_code === 1 && response.data.positives > 0) {
        setIsMalicious(true);
      } else {
        setIsMalicious(false);
      }
    } catch (error) {
      console.error('Error checking URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check for Malicious URLs</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter URL (e.g., https://example.com)"
        onChangeText={(text) => setUrl(text)}
        value={url}
      />
      <Button title="Check URL" onPress={checkURL} />
      {isMalicious && (
        <Text style={[styles.result, { color: 'red' }]}>
          Potentially malicious URL!
        </Text>
      )}
      {isMalicious === false && (
        <Text style={[styles.result, { color: 'green' }]}>
          URL is safe and not malicious.
        </Text>
      )}



      <TouchableOpacity
  onPress={() => navigation.navigate('QRCodeScanner')} 
  
>
  <Text style={{ color: 'black' }}>Scan QR code</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}>

        <Text style={{fontSize:22, fontWeight:'bold'}}>
          Sign out
        </Text>

        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default Dashboard;