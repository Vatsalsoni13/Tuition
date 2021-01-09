import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {getEnrolled, getSearchResult} from '../../utils/apiCalls';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

const Categories = () => {
  const [std, setStd] = useState('ALL');
  const [subject, setSubject] = useState('ALL');
  const [data, setData] = useState([]);
  const [arrived, setArrived] = useState(false);

  const search = async () => {
    let d = await getSearchResult(std, subject);
    setData(d);
  };
  const enroll = async (batchId) => {
    console.log(batchId);
    try {
      let studentId = await AsyncStorage.getItem('mongoId').then((value) => {
        return value;
      });
      await getEnrolled(studentId, batchId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(data);
    setArrived(true);
  }, [data]);

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
                enroll(item._id);
              }}
              activeOpacity={0.5}>
              <LinearGradient
                colors={['#c31432', '#240b36']}
                style={styles.btn2}>
                <Text style={{color: '#fff', fontSize: 18}}>Subscribe</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{padding: 20, flex: 1}}>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
              <LinearGradient
                colors={['#c31432', '#240b36']}
                style={styles.btn2}>
                <Text style={{color: '#fff', fontSize: 18}}>Explore</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </CardAction>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://i.pinimg.com/originals/88/bc/78/88bc78bc2d963bdd11f588db8e1d2acf.jpg',
        }}
        style={styles.image}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Picker
              selectedValue={std}
              style={{
                height: 50,
                width: Dimensions.get('screen').width / 2,
                marginHorizontal: 10,
                marginVertical: 6,
              }}
              onValueChange={(itemValue, itemIndex) => setStd(itemValue)}>
              <Picker.Item label="Select Class" value="ALL" />
              <Picker.Item label="IV" value="IV" />
              <Picker.Item label="V" value="V" />
              <Picker.Item label="VI" value="VI" />
              <Picker.Item label="VII" value="VII" />
              <Picker.Item label="VIII" value="VIII" />
              <Picker.Item label="IX" value="IX" />
              <Picker.Item label="X" value="X" />
              <Picker.Item label="XI" value="XI" />
              <Picker.Item label="XII" value="XII" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <Picker
              selectedValue={subject}
              style={{
                height: 50,
                width: Dimensions.get('screen').width / 2,
                margin: 10,
              }}
              onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
              <Picker.Item label="Select Subject" value="ALL" />
              <Picker.Item label="Mathemathics" value="Math" />
              <Picker.Item label="Science" value="Science" />
              <Picker.Item label="History" value="History" />
              <Picker.Item label="Geography" value="Geography" />
              <Picker.Item label="Programming" value="Programming" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                search();
              }}
              activeOpacity={0.5}>
              <LinearGradient
                colors={['#374045', '#30475e']}
                style={styles.btn}>
                <Text style={{color: '#fff', fontSize: 18}}>Search</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {arrived ? (
          <View style={{marginBottom: 150}}>
            <FlatList
              style={{padding: 25}}
              data={data}
              renderItem={renderComponent}
              keyExtractor={(item) => item._id}
            />
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    height: 45,
    width: Dimensions.get('screen').width / 3,
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    height: 40,
    width: Dimensions.get('screen').width / 3.5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Categories;
