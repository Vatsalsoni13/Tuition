import React,{useState,useEffect,useContext} from 'react';
import {View, Text, StyleSheet, Image, Dimensions,FlatList} from 'react-native';
import { getBatchInfo } from '../../utils/apiCalls';
import {NetworkContext} from '../../navigation/BatchPanel';
import { ScrollView } from 'react-native-gesture-handler';

const BatchInfo = () => {
    const [data,setData] = useState({});
    const [arrived,setArrived] = useState(false)
    const [students,setStudents] = useState([])
    const batchId = useContext(NetworkContext);  

    const enrolledStudents = ({item}) => (
      <View style={{marginVertical:6,backgroundColor:'#CCD4BF',padding:8,borderRadius:6}}>
        <Text>Name : {item.name}</Text>
        <Text>Email : {item.email}</Text>
      </View>
    );


    useEffect(()=>{
      getBatchInfo(batchId).then((batch)=>{
        console.log(batch,"SSSS");
        setData(batch);
        setStudents(batch.batch.students);
        setArrived(true);
      });
     
    },[])
    const str=[require(`../../assets/${1}.png`),require(`../../assets/${2}.png`),require(`../../assets/${3}.png`),require(`../../assets/${4}.png`),require(`../../assets/${5}.png`)];
    
  return (
      <ScrollView style={styles.container}>
     
        <View >
        {(arrived===true) && ( 
        <View>
        <View style={{display:'flex',flex:1,padding:20,backgroundColor:'#F5E2E4',borderBottomLeftRadius:40,borderBottomRightRadius:40}}>        
            <View style={{flex:1}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>{data.batch.info.subject}</Text>
            </View>
            <View style={{flex:2,alignSelf:'center'}}>
                <Text style={{fontSize:30,fontWeight:'bold'}}>{data.batch.info.title}</Text>
            </View>
            <View style={{flex:3,marginTop:20,alignSelf:'center'}}>
                <Image source={str[(data.batch.info.description.length)%5 + 1]} style={styles.image}></Image>
            </View>
        </View>
        <View style={{display:'flex',flex:2,padding:20,marginBottom:10}}>
            <View style={{flex:1,display:'flex',justifyContent:'space-evenly',alignItems:'flex-start'}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'black',marginVertical:10,marginTop:13}}>BATCH  DURATION</Text>
                <Text style={styles.tags}>Batch Beggining :  {new Date(data.batch.info.date_of_begin).toString().substring(0,15)}</Text>
                <Text style={styles.tags}>Batch End :  {new Date(data.batch.info.expire_date).toString().substring(0,15)}</Text>
            </View>
            <View style={{flex:1,display:'flex',justifyContent:'space-evenly',alignItems:'flex-start'}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'black',marginVertical:10,marginTop:13}}>BATCH  DESCRIPTION</Text>
                <Text style={styles.tags}>{data.batch.info.description}</Text>
            </View>
            <View>
            </View>
       
        <View style={{height:Dimensions.get('screen').height/3}}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'black',marginVertical:10}}>STUDENTS ENROLLED</Text>

        <FlatList
          data={students}
          renderItem={enrolledStudents}
          keyExtractor={(item) => item.email}
        />
      </View>
        </View>
        </View>
        )}
        </View>
       
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex'
    ,
    backgroundColor:'#CA9C95'
  },
  image:{
      width:Dimensions.get('screen').width/2,
      height:Dimensions.get('screen').height/4.5
  }
  ,
  tags:{fontSize:15,fontWeight:'900',color:'#46302B',marginBottom:3}
});

export default BatchInfo;
