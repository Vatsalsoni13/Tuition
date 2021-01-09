import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {createBatch} from '../../utils/apiCalls';

const TodaysDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
};
const CreateBatch = ({navigation}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [fees, setFees] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [std, setStd] = React.useState('NULL');
  const [size, setSize] = React.useState('');
  const [subject, setSubject] = React.useState('NULL');

  const sendData = async () => {
    let batch = {};
    batch.title = title;
    batch.description = description;
    batch.fees = fees;
    batch.date = startDate;
    batch.exp_date = endDate;
    batch.std = std;
    batch.size = size;
    batch.subject = subject;
    await createBatch(batch).then(() => {
      navigation.goBack();
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/blur.jpg')}
      style={styles.image}>
      <ScrollView style={styles.container}>
        <Animatable.Image
          animation="bounceIn"
          duraton="2500"
          source={require('../../assets/teach.png')}
          style={{width: 230, height: 210, alignSelf: 'center'}}
          resizeMode="stretch"
        />
        <Animatable.View style={styles.arrange} animation="fadeInUpBig">
          <TextInput
            style={styles.textInput}
            placeholder="Enter Batch Title"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            placeholder="Enter Monthly Batch Fees"
            onChangeText={(text) => setFees(text)}
            value={fees}
          />
          <TextInput
            multiline
            numberOfLines={2}
            style={styles.textInput}
            placeholder="Enter Description"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <Text
            style={{color: '#000', margin: 10, paddingLeft: 10, fontSize: 20}}>
            Select Starting date
          </Text>

          <DatePicker
            style={{
              width: 250,
              marginBottom: 10,
              paddingLeft: 15,
              alignSelf: 'center',
            }}
            textColor="#32a852"
            fadeToColor="rgba(100, 100, 100, 1)"
            date={startDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            // minDate={TodaysDate()}
            minimumDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(startDate) => {
              setStartDate(startDate);
            }}
          />
          <Text
            style={{color: '#000', margin: 10, paddingLeft: 10, fontSize: 20}}>
            Select Ending date
          </Text>
          <DatePicker
            style={{
              width: 250,
              marginBottom: 10,
              paddingLeft: 15,
              alignSelf: 'center',
            }}
            textColor="red"
            date={endDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            // minDate={TodaysDate()}
            minimumDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(endDate) => {
              setEndDate(endDate);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter Size of Batch (Max size: 10)"
            onChangeText={(size) => {
              if (parseInt(size) > 10) {
                Alert.alert(
                  'Oops',
                  'Please enter value less than or equal to 10',
                );
                setSize('10');
              } else setSize(size);
            }}
            value={size}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={std}
            style={{
              height: 50,
              width: 300,
              marginHorizontal: 10,
              marginVertical: 6,
            }}
            onValueChange={(itemValue, itemIndex) => setStd(itemValue)}>
            <Picker.Item label="Select Class" value="NULL" />
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
            style={{height: 50, width: 300, margin: 10}}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="Select Subject" value="NULL" />
            <Picker.Item label="Mathemathics" value="Math" />
            <Picker.Item label="Science" value="Science" />
            <Picker.Item label="History" value="History" />
            <Picker.Item label="Geography" value="Geography" />
            <Picker.Item label="Programming" value="Programming" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              sendData();
            }}>
            <LinearGradient
              colors={['#70416d', '#170a19']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Create Batch
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateBatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  arrange: {
    borderColor: 'black',
    padding: 20,
  },
  signIn: {
    width: 210,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logo: {
    width: 210,
    height: 200,
  },
  textSign: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    flex: 2.5,
    marginTop: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  textInput: {
    margin: 10,
    paddingLeft: 10,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    alignItems: 'center',
    marginTop: 60,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
