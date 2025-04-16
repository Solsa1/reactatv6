import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import { Input, Icon , Button , ListItem, Avatar} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';


const list = [
  {
    name: 'Claudia Alves',
    status: 'Do more of what you love',
    image: require('/images/Captura de tela 2025-04-16 181102.png'),
    time: '3m ago'
  },
  {
    name: 'Dani Martinez',
    status: 'Do your own thing',
    image: require('/images/Captura de tela 2025-04-16 181037.png'),
    time: '5m ago'
  },
  {
    name: 'Kimgberly Nguyen',
    status: 'Kindness is beautiful',
    image: require('/images/Captura de tela 2025-04-16 181011.png'),
    time: '1h ago'
  },
  {
    name: 'Mariana Napolitani',
    status: 'Live your purpose',
    image: require('/images/Captura de tela 2025-04-16 181028.png'),
    time: '2h ago'
  },
  {
    name: 'Olivia Wilson',
    status: 'You got this.',
    image: require('/images/Captura de tela 2025-04-16 181117.png'),
    time: '5h ago'
  },
  {
    name: 'Rachelle Beaudry',
    status: "You're wonderful",
    image: require('/images/Captura de tela 2025-04-16 181018.png'),
    time: 'Yesterday'
  },
  {
    name: 'Soo Jin Ae',
    status: 'Keep it simple',
    image: require('/images/Captura de tela 2025-04-16 181110.png'),
    time: 'Yesterday'
  }
]


export default function HomeScreen() {
  return (

  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <View style={styles.headerIcon}>
        <Ionicons
                name="mail"
                size={35}
                color="black"
                onPress={() => navigation.navigate('AddContato')}
        />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.title}>Messages & Chat </Text>
      </View>
    </View> 
    <View style={styles.containerList}>
    {
    list.map((item, i) => (
      <ListItem style={{ marginTop: 30 }}key={i} bottomDivider>
        <Avatar
          rounded
          source={item.image}
          size='medium'
        />
        <Avatar source={item.avatar} />
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 20}}>{item.name}</ListItem.Title>
          <ListItem.Title>{item.status}</ListItem.Title>
        </ListItem.Content>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 12, color: 'gray' }}>{item.time}</Text>
          </View>
      </ListItem>
    ))
    }
    </View>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    backgroundColor: '#fff',
    width: '80%',
  },
  containerheader:{
    flexDirection: 'row',
    height: '10%',
    width: '100%'
  },
  headerIcon:{
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1ebea',
    borderBottomRightRadius: 10
  },
  headerText:{
    backgroundColor: '#f7f2dc',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10
  },
  title:{
    fontSize: 25
  }
});
