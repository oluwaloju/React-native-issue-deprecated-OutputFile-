// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import GlobalStyle from '../utils/GlobalStyle';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// export default function Location({route}) {
//   const {city, lat, long} = route.params;


//   return (
//     <View>
//       <Text style={[GlobalStyle.CustomFont, styles.text]}>{city}</Text>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: lat,
//           longitude: long,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 40,
//     margin: 10,
//   },
//   map: {
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });
