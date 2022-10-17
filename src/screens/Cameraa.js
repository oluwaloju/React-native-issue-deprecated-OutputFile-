import {Camera, CameraType} from 'expo-camera';
import {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default function Cameraa({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const [flashmode, setFlashMode] = useState('off');
  let camera = Camera;


useEffect(()=>{
  permissions();
  mountcamera()
})


const permissions=()=>{
  if (!permission) {
    // Camera permissions are still loading
    return <ActivityIndicator size="small" />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
}
 

  const mountcamera = async () => {
    const permissionstatus = await Camera.getMicrophonePermissionsAsync();
    if (permissionstatus.granted) {
      return _startCamera;
    } else {
     permissions()
    }
  };

  const CameraPreview = ({photo, _retakePicture, savePicture}) => {
    console.log('sdsfds', photo);
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        }}>  
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1,
          }}
        />
        <Button title="retake picture" onPress={_retakePicture} />
        <Button title="Save" onPress={savePicture} />
      </View>
    );
  };

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();  //photo then has the picture
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const savePicture = () => {
    setCapturedImage(photo);
    setStartCamera(false);
    navigation.navigate('Tasks');
  };

  const _retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    _startCamera();
  };

  const handleflashmode = () => {
    if (flashmode === 'off') {
      setFlashMode('on');
    }
    if (flashmode === 'on') {
      setFlashMode('off');
    } else {
      setFlashMode('auto');
    }
  };

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  const _startCamera = () => {
    {
      capturedImage && previewVisible ? (
        <CameraPreview
          photo={capturedImage}
          retakePicture={_retakePicture}
          savePicture={savePicture}
        />
      ) : (
        <View style={styles.container}>
          <Camera
            flashmode={flashmode}
            style={styles.camera}
            type={type}
            ref={r => {
              camera = r;
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleflashmode}
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '10%',
                  backgroundColor: flashmode === 'off' ? '#000' : '#fff',
                  borderRadius: '50%',
                  height: 25,
                  width: 25,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  ⚡️
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
      setStartCamera(true);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
