import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import { Input, Icon , Button , ListItem, Avatar} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default App;

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="AddContato" component={AddCont} />
      <Stack.Screen name="EditContato" component={EditContat} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

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
    contatos.map((item, i) => (
      <ListItem style={{ marginTop: 30 }}key={i} bottomDivider>
      <Avatar
        rounded
        source={{uri: item.image}}
        size='medium'
        onPress={() => navigation.navigate('EditContato', {contatos: item})}
      />  

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
    
 )}

  export function AddCont({navigation}) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [time, setTime] = useState('');
 
  const saveCont = () => {
    axios.post('http://localhost:3000/contatos', {
      name, status, image, time
    })
    .then(() => navigation.navigate('Home'))
    .catch((err) => console.log(err));
  };
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.containerheader}>
      <Text style={styles.title}>Cadastrar contato</Text>
    </View>
    <View style={styles.container}>
      <Input style={styles.Input} placeholder='nome' value={name} onChangeText={setName}/>
      <Input style={styles.Input} placeholder='status' value={status} onChangeText={setStatus}/>
      <Input style={styles.Input} placeholder='imagem' values={image} onChangeText={setImage}/>
      <Input style={styles.Input} placeholder='time' values={time} onChangeText={setTime}/>

      <Button style={styles.Button} title="adicionar" onPress={saveCont}/>
    </View>
  </SafeAreaView>
  );
}

export function EditContat({ navigation, route}){
  const { contatos } = route.params;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');

  const deleteContat = (id) => {
    axios.delete(`http://localhost:3000/contatos/${contatos.id}`)
    .then((response) => {
      setContatos(response.data);
      setLoading(false);
    } , navigation.navigate('Home'))
    .catch((error) => {
      console.error('Erro ao buscar contatos:', error);
      setLoading(false);
    });
  }

  const attContat = () => {
    axios.put(`http://localhost:3000/contatos/${contatos.id}`, {
      ...contatos,
      name,
      status,
      image,
      time
    })
    .then(() => navigation.navigate('Home'))
    .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerheader}>
        <Text style={styles.title}> Editar contato</Text>
      </View>
      <View style={styles.container}>
        <Text>Bem-vindo, {contatos.name}!</Text>
        
        <Input style={styles.Input} placeholder='Nome' value={name} onChangeText={setName}/>
        <Input style={styles.Input} placeholder='Status'value={status} onChangeText={setStatus}/>
        <Input style={styles.Input} placeholder='Image' value={image} onChangeText={setImage}/>
        <Input style={styles.Input} placeholder='Time' value={time} onChangeText={setTime}/>
        
        <Button style={styles.Button} title="Atualizar" onPress={attContat}/>
        <Button style={styles.Button} title="Excluir" onPress={deleteContat}/>
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

