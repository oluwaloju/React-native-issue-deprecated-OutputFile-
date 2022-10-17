import React, {useRef, useState, useEffect} from 'react';
import {Camera, CameraType} from 'expo-camera';
import {View, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';

const Expocamera = ({navigation, route}) => {
  useEffect(() => {
    async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  }, []);
  useEffect(() => {
    async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  }, []);

  const {Tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      const filePath = photo.uri;
      updateTask(route.params.id, filePath);
    }
  };

  const updateTask = (id, photo) => {
    const index = Tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...Tasks];
      newTasks[index].Image = photo;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Successful!', 'Image is now available');
          Vibration.vibrate();
          navigation.goBack();
        })
        .catch(error => {
          console.log('Problem with saving picture at expocamera' + error);
        });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === 'false') {
    return Alert.alert('Error', 'Permission to camera denied!');
  }

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{width: '100%', height: '100%'}}
        type={Camera.Constants.Type.back}
        ref={camera => (cameraRef.current = camera)}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff',
          }}
          onPress={snap}>
          <Ionicons name={'camera-outline'} size={30} color={'#A0F'} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default Expocamera