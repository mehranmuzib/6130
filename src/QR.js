import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';



export default function App() {
    const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setScanned(true);

    if (data === 'Hello') {
        navigation.navigate('Dashboard');
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={styles.cameraContainer}>
        {hasPermission === null ? (
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        ) : hasPermission === false ? (
          <Text style={styles.permissionText}>No access to camera.</Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
        )}
        {scannedData && (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Sorry you have scanned a wrong QR Code</Text>
            <Text style={styles.dataValue}>{scannedData}</Text>
            <Button
              title="Scan Again"
              onPress={() => {
                setScannedData(null);
                setScanned(false);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  dataContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dataValue: {
    fontSize: 16,
    marginBottom: 16,
  },
});