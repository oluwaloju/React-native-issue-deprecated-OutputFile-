import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import {useFonts, Chango_400Regular, Charmonman_400Regular} from '@expo-google-fonts/dev'
import CheckBox from '@react-native-community/checkbox';



export default function Done({navigation}) {

  const { Tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [filteredTask, setFilteredTask] = useState([]);

  useEffect(() => {
      navigation.addListener('focus', () => {
          getTasks();
      });

  }, [])





  const getTasks = () => {
      AsyncStorage.getItem('Tasks')
          .then(Tasks => {
              const parsedTasks = JSON.parse(Tasks);
              if (parsedTasks && typeof parsedTasks === 'object') {
                  dispatch(setTasks(parsedTasks));
                  setFilteredTask(parsedTasks.filter(task => task.Done === true));
              }
          })
          .catch(err => console.log(err))
  }



  const deleteTask = (id) => {
      const filteredTasks = Tasks.filter(task => task.ID !== id);
      AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
          .then(() => {
              dispatch(setTasks(filteredTasks));
              setFilteredTask(filteredTasks.filter(task => task.Done === true));
              Alert.alert('Success!', "Task deleted");
          })
          .catch(err => console.log(err))
  }

  const checkTask = (id, newValue) => {
      const index = Tasks.findIndex(task => task.ID === id);
      if (index > -1) {
          let newTasks = [...Tasks];
          newTasks[index].Done = newValue;
          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
              .then(() => {
                  dispatch(setTasks(newTasks));
                  setFilteredTask(newTasks.filter(task => task.Done === true));
                  Alert.alert('Hey!', 'You did not finish your task 🧐?');
              })
              .catch(err => console.log(err))
      }
  }


  return (
    <View style={styles.container}>
    <FlatList
    data={filteredTask} 
    renderItem={({item})=>(
      <TouchableOpacity
       style={styles.item}
       onPress={()=>{
       dispatch(setTaskID(item.taskID))
       }}>
        <View style={styles.item_row}>
 
        <CheckBox
          value={item.Done}
          tintColors={'ColorValue' === true ? 'purple' : '#fff'}
          onValueChange={(newValue)=>{checkTask(item.ID,newValue)}}
        />
          <View style={styles.item_body}>
            <Text style={styles.title} numberOfLines={1}>{item.Title}</Text>
            <Text style={styles.taskdescription} numberOfLines={1}>{item.Desc}</Text>
          </View>
       
          <TouchableOpacity
          style={styles.delete}
          onPress={()=>{deleteTask(item.ID)}}
          > 
            <Ionicons
            name={"trash-outline"}
            size={25}
            color={"#fff"}
            />
          </TouchableOpacity>
         
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index)=>index.toString()}
    />   
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex:1
  },
  text:{
    color:"white"
  },
  delete:{
   width:50,
   height:50,
   justifyContent: 'center',
   alignItems: 'center',
  },
  item:{
    marginHorizontal:10,
    marginVertical:7,
    paddingHorizontal:10,
    backgroundColor:'#BF40BF',
    justifyContent: 'center',
    borderRdius:10,
    elevation:5,
  },
  title:{
    color:'#ffff',
    fontSize: 30,
    margin:5,
    fontFamily:'Chango_400Regular'
  },
  taskdescription:{
    color:'#ffff',
    fontSize: 15,
    margin:5,
    fontFamily:'Charmonman_400Regular'
  },
  item_row:{
    flexDirection:'row',
    alignItems: 'center'
  },
  item_body:{
    flex:1
  }
})