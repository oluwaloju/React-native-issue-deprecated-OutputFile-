import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ActivityIndicator} from 'react-native';
import PushNotification from 'react-native-push-notification';
import GlobalStyle from '../utils/GlobalStyle';
import * as Animatable from 'react-native-animatable';
import {useFonts, Arizonia_400Regular} from '@expo-google-fonts/dev';

export default function Splash({navigation}) {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 6000);
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel',
    });
  };

  let [fontsLoaded] = useFonts({
    Arizonia_400Regular,
  });


 
    return (
      <View style={styles.body}>
        <Animatable.View animation="wobble"  iterationCount="infinite" ease={'ease-in'}>
        <Image style={styles.logo} source={require('../assets/icon.jpg')} />
        </Animatable.View>
      <Animatable.Text animation="fadeOutRight" easing="ease-out" direction="alternate" iterationCount={2} style={styles.text}>Task</Animatable.Text>
      </View>
    )

  }


const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
    fontFamily:"Arizonia-Regular"
  },
});
