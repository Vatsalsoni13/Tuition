import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const Categories = () => {
  const [std, setStd] = React.useState('NULL');
  const [subject, setSubject] = React.useState('NULL');

  return (
    <View style={styles.container}>
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
            style={{
              height: 50,
              width: Dimensions.get('screen').width / 2,
              margin: 10,
            }}
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
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            <LinearGradient colors={['#0080ff', '#05b0ff']} style={styles.btn}>
              <Text style={{color: '#fff', fontSize: 18}}>Seacrch</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}
      />
      <View>{/* Add FlatList here */}</View>
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
    height: 40,
    width: Dimensions.get('screen').width / 3,
  },
});

export default Categories;
