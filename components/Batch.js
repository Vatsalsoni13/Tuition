import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Image,Dimensions} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const Batch = ({
  description,
  title,
  subject,
  ...rest
}) => {
    const str=[require(`../assets/${1}.png`),require(`../assets/${2}.png`),require(`../assets/${3}.png`),require(`../assets/${4}.png`),require(`../assets/${5}.png`)];
    const backColors=['#494949','#a9294f','#11698e','#6e5773','#6a492b','#48426d','#55b3b1','#445c3c','#0d335d','#939b62'];
  return (
    <View style={[styles.flatItem,{backgroundColor:backColors[(description.length)%10]}]}>
    <View style={{flex:3,alignSelf:'flex-start',display:'flex',flexDirection:'column',zIndex:5}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
      <Text style={{fontSize:25,color:'white',fontWeight:'bold'}}>{title}</Text>
    </View>
    <View style={{flex:1,justifyContent:'flex-end'}}>
      <Text style={{fontSize:15,color:'#DCDCDC'}}>{description}</Text>
    </View>
    <View style={{flex:2,justifyContent:'flex-end'}}>
      <Text style={{fontSize:13,color:'white'}}>{subject} </Text>
    </View>
    </View>
    <View styles={{flex:1,alignSelf:'flex-end'}}>
    <Image style={styles.icons} source={str[(description.length)%5 + 1]}/>
    </View>
    </View>
  );
};

export default Batch;

const styles = StyleSheet.create({
    icons: {
        width: Dimensions.get('screen').width / 4,
        height: Dimensions.get('screen').height / 8
      },
      flatItem:{paddingHorizontal:15,borderLeftWidth:8,borderRadius:13,marginBottom: 20, padding: 10,display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',height:Dimensions.get('screen').height / 6}
});
