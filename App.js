import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import { Input, Icon , Button , ListItem, Avatar} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import MinhaImagem from './images/181102.png';


export function HomeScreen({ navigation, route}) {
  const [contatos, setContatos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  
   useEffect(() => {
    axios.get('http://localhost:3000/contatos')
      .then((response) => {
        setContatos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar contatos:', error);
        setLoading(false);
      });
  }, []);

const images = [
  {
    image: require('./images/181102.png'), 
  },
  {
    image: require('./images/Captura de tela 2025-04-16 181037.png'), 
  },
  {
    image: require('./images/Captura de tela 2025-04-16 181011.png'), 
  },
  {
    image: require('./images/Captura de tela 2025-04-16 181028.png'),
  },
  {
   image: require('./images/Captura de tela 2025-04-16 181117.png'), 
  },
  {
    image: require('./images/Captura de tela 2025-04-16 181018.png'),
  },
  {
    image: require('./images/Captura de tela 2025-04-16 181110.png'),
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
    images.map((item, i) => (
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
