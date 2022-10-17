import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Vibration,
  Image,
  ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import CustomButton from '../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
 import * as FileSystem from 'expo-file-system'
import {
  useFonts,
  Chango_400Regular,
  Charmonman_400Regular,
} from '@expo-google-fonts/dev';


export default function Task({navigation}) {
  let [fontsLoaded] = useFonts({
    Chango_400Regular,
    Charmonman_400Regular,
  });

  const {Tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [color, setColor] = useState('white');
  const [bellTime, setBellTime] = useState('1');
  const [image, setImage] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask();
    });
  }, []);


const deleteImage=()=>{
FileSystem.deleteAsync(image)
.then(()=>{
  const index = Tasks.findIndex(task=>task.ID===taskID)
  if(index >-1){
     let newTasks=[...Tasks] 
     newTasks[index].Image=''
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
      .then(()=>{
          dispatch(setTasks(newTasks))
          getTask()
          Alert.alert('Successful!','Image deleted')
      })
      .catch(error=>{console.log('Problem with saving picture at Task'+ error)})
  } 
})
.catch(error=>{console.log('Problem with saving picture atTask'+ error)})
}

  const getTask = () => {
    const Task = Tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
      setImage(Task.Image);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
          Image: image,
        };
        const index = Tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...Tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...Tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            Vibration.vibrate();
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: 'Time for your task: ' + desc,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      ignoreInForeground: false,
      allowWhileIdle: true,
      vibrate: true,
      vibration: 300,
      playSound: true,
    });
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <Modal
          visible={showBellModal}
          transparent
          onRequestClose={() => setShowBellModal(false)}
          hardwareAccelerated
          animationType="slide">
          <View style={styles.centeredview}>
            <View style={styles.bellmodal}>
              <View style={styles.bellbody}>
                <Text style={styles.text}>Remind me after</Text>
                <TextInput
                  style={styles.bellinput}
                  keyboardType="number-pad"
                  placeholder="1"
                  value={bellTime}
                  onChangeText={value => setBellTime(value)}
                />
                <Text style={styles.text}>minute(s)</Text>
              </View>
              <View style={styles.bellbutton}>
                <TouchableOpacity
                  style={styles.bellcancelbutton}
                  onPress={() => {
                    setShowBellModal(false);
                  }}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bellokbutton}
                  onPress={() => {
                    setShowBellModal(false);
                    setTaskAlarm();
                  }}>
                  <Text style={styles.text}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={value => setTitle(value)}
        />
        <TextInput
          value={desc}
          style={styles.inputsecond}
          placeholder="Task description"
          multiline={true}
          onChangeText={value => setDesc(value)}
        />
        <View style={styles.colorbar}>
          <TouchableOpacity
            style={styles.colorwhite}
            onPress={() => {
              setColor('white');
            }}>
            {color === 'white' && (
              <Ionicons
                size={20}
                color={'#A020F0'}
                name={'checkmark-done-outline'}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.colorred}
            onPress={() => {
              setColor('red');
            }}>
            {color === 'red' && (
              <Ionicons
                size={20}
                color={'#fff'}
                name={'checkmark-done-outline'}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.colorblue}
            onPress={() => {
              setColor('blue');
            }}>
            {color === 'blue' && (
              <Ionicons
                size={20}
                color={'#fff'}
                name={'checkmark-done-outline'}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.coloryellow}
            onPress={() => {
              setColor('yellow');
            }}>
            {color === 'yellow' && (
              <Ionicons
                size={20}
                color={'#fff'}
                name={'checkmark-done-outline'}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.extrarow}>
          <TouchableOpacity
            style={styles.extrabutton}
            onPress={() => {
              setShowBellModal(true);
            }}>
            <Ionicons name={'notifications-outline'} size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.extrabutton}
            onPress={() => {
              navigation.navigate('Expocamera', {id: taskID});
            }}>
            <Ionicons name={'camera-outline'} size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
        {image ? 
          <View>
            <Image style={styles.image} source={{uri: image}} />
            <TouchableOpacity style={styles.delete} onPress={()=>{deleteImage()}}>
            <Ionicons name={'trash-outline'} size={25} color={'#ff3636'} />
            </TouchableOpacity>
          </View>
         : 
         null}
        <View style={styles.checkbox}>
          <CheckBox
            value={done}
            tintColors={'ColorValue' === true ? 'purple' : '#fff'}
            onValueChange={newValue => setDone(newValue)}
          />
          <Popover
            placement={PopoverPlacement.TOP}
            from={
              <TouchableOpacity>
                <Text style={styles.textdone}>Done?</Text>
              </TouchableOpacity>
            }>
            <Text>Check the box if the task is finished</Text>
          </Popover>
        </View>
        <Animatable.View
          animation="bounce"
          iterationCount="infinite"
          iterationDelay={4000}>
          <CustomButton
            title={'Save task'}
            style={{width: '100%', fontFamily: 'Arizonia-Regular'}}
            onPressFunction={setTask}
            color={'#A020F0'}
          />
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    height:800,
    alignContent: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
    border: 2,
    borderRadius: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredview: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'grey',
    borderRadius: 10,
    textAlign: 'left',
    fontSize: 20,
    marginRight: 20,
  },
  inputsecond: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'grey',
    borderRadius: 10,
    textAlign: 'left',
    fontSize: 20,
    marginRight: 20,
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Arizonia-Regular',
  },
  textdone: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Arizonia-Regular',
  },
  colorbar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  bellmodal: {
    width: 300,
    heigth: 200,
    backgroundColor: '#CBC3E3',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bellcancelbutton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellokbutton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellbody: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellbutton: {
    flexDirection: 'row',
    height: 50,
  },
  bellinput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#000',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    color: '#fff',
  },
  extrarow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extrabutton: {
    flex: 1,
    height: 50,
    backgroundColor: '#A020F0',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorwhite: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  colorred: {
    backgroundColor: '#FF0000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorblue: {
    backgroundColor: '#87CEEB',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coloryellow: {
    backgroundColor: '#FFFF00',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  delete:{
    width:50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:20,
    bottom:20,
    backgroundColor:'#ffffff80',
    margin:10,
    borderRadius:5
  }
});
