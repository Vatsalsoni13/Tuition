import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-paper';



const ChoiceScreen = ({navigation}) => {

    
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#79e3fe","#635df8","#42385D"]}  style={{flex: 1}}>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
    
        <View style={styles.header}>
            
                <Animatable.Image 
                    animation="bounceInDown"
                    duraton="1500"
                source={require('../choice.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
               
                <View style={styles.button}>
                
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>{
                        navigation.navigate('TutorPanel');
                    }}
                >
                <LinearGradient
                    colors={['#001433', '#001433']}

                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Tutor Panel</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('StudentPanel')}
                    style={[styles.signIn, {
                        borderColor: '#635df8',
                        borderWidth: 1,
                        marginTop: 15,
                        backgroundColor:'white'
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Student Panel</Text>
                </TouchableOpacity>
            </View>
            
        </View>
       
        </LinearGradient>
      </View>
    );
};

export default ChoiceScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    signIn: {
        width: 210,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        marginTop:100,
        alignItems:'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    logo:{
      width:400,
      height:400 
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        flex:2.5,
        marginTop:30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    button: {
        alignItems: 'center',
        marginTop: 60,
       
    }
    
  });