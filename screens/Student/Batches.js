import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList,
  ImageBackground,
  Image
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Batch from '../../components/Batch';

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {getEnrolledBatches, getEnrolled} from '../../utils/apiCalls';

const Batches = ({navigation}) => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState(false);
  const makeCall = async () => {
    setData(await getEnrolledBatches());
  };
  useEffect(() => {
    if (val === false) {
      makeCall();
    }
    console.log(data, 'HEY THERE');
    setVal(true);
  }, [data]);
  
  
  const renderComponent = ({item,index}) =>(
    <TouchableOpacity>
      <Batch description={item.info.description} subject={item.info.subject} title={item.info.title}/>
    </TouchableOpacity>
  )

  return (
    <ImageBackground
      source={require('../../assets/bright-squares.png')}
      style={styles.image}>
      <View style={{flex: 1}}>
        <View style={{marginBottom: 15, marginTop: 15}}>
          <FlatList
            style={{padding: 25}}
            data={data}
            renderItem={renderComponent}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    height: 45,
    width: Dimensions.get('screen').width / 3,
  },
  image: {
    flex: 1,
    backgroundColor:'white',
    resizeMode: 'cover',
  
  },
 
});

export default Batches;
