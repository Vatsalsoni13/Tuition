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
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
const TodaysDate =()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd+'-'+ mm + '-' + yyyy ;
    return today;
}
const CreateBatch = ({navigation}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fees, setFees] = React.useState('');
    const [date, setDate] = React.useState(TodaysDate());
    const [std, setStd] = React.useState('NULL');
    const [subject, setSubject] = React.useState('NULL');


   

  return (
    <View style={styles.container}>
       <ImageBackground source={require('../blur.jpg')} style={styles.image}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="2500"
            source={require('../teach.png')}
            style={{width:230,height:210,alignSelf:'center'}}
            resizeMode="stretch"
            />
           <Animatable.View style={styles.arrange} animation="fadeInUpBig">
          
                <TextInput
                style={styles.textInput}
                placeholder="Enter Batch Title"
                onChangeText={text => setTitle(text)}
                value={title}
                />
                <TextInput
                style={styles.textInput}
                placeholder="Enter Monthly Batch Fees"
                onChangeText={text => setFees(text)}
                value={fees}
                />
                <TextInput
                multiline
                numberOfLines={2}
                style={styles.textInput}
                placeholder="Enter Description"
                onChangeText={text => setDescription(text)}
                value={description}
                />
                <Text style={{color:'grey',margin:10,paddingLeft:10}}>Select Starting date</Text>
                <DatePicker
                        style={{width:300,marginBottom:10,paddingLeft:15}}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={TodaysDate()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {setDate(date)}}
                    />
                    <Picker
                        selectedValue={std}
                        style={{height: 50, width: 300,marginHorizontal:10,marginVertical:6}}
                        onValueChange={(itemValue, itemIndex) =>setStd(itemValue)
                        }>
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
                        style={{height: 50, width: 300,margin:10}}
                        onValueChange={(itemValue, itemIndex) =>
                            setSubject(itemValue)
                        }>
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
                login(username, password);
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
    </ImageBackground>
    </View>
  );
};

export default CreateBatch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:60
      },
      arrange:{
         
          borderColor:'black',
          padding:20,  
      }
      ,
  signIn: {
    width: 210,
    height: 50,
    marginTop:10,
    justifyContent: 'center',
    alignSelf:'center',
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
    marginTop:10,
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
    margin:10,
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
