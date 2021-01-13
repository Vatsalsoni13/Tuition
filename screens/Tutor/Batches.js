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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {getCreatedBatches} from '../../utils/apiCalls';

const Batches = ({navigation}) => {
  const [data, setData] = useState([]);
  // const [val, setVal] = useState(false);
  const makeCall = async () => {
    setData(await getCreatedBatches());
  };
  useEffect(() => {
    makeCall();
    // console.log(data, 'HEY THERE');
    // setVal(true);
  }, []);

  const renderComponent = ({item}) => (
    <View style={{marginBottom: 20, padding: 10}}>
      <Card style={{borderRadius: 20, borderWidth: 1, borderColor: 'black'}}>
        <CardImage
          source={{
            uri: 'https://i.imgur.com/SOQFYw0.png',
          }}
          title={item.info.std + '  ' + item.info.subject}
        />
        <CardTitle
          title={item.info.title}
          subtitle={
            'Date of begin :' + new Date(item.info.date_of_begin).toDateString()
          }
        />
        <CardContent text={item.info.description} />
        <CardAction separator={true} inColumn={false}>
          <View style={{padding: 20, flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BatchPanel', {
                  batchId: item._id,
                });
              }}
              activeOpacity={0.5}>
              <LinearGradient
                colors={['#c31432', '#240b36']}
                style={styles.btn}>
                <Text style={{color: '#fff', fontSize: 18}}>Explore</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </CardAction>
      </Card>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{marginBottom: 15, marginTop: 15}}>
          <FlatList
            style={{padding: 25}}
            data={data}
            renderItem={renderComponent}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
      <View style={styles.floatButton}>
        <TouchableOpacity
          onPress={() => {
            // add icon
            //navigate to Add Contact screen
            navigation.navigate('CreateBatch');
          }}
          // style={styles.floatButton}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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
    resizeMode: 'cover',
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    // zIndex: 2,
    opacity: 0.9,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
});

export default Batches;
