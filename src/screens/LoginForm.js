// LoginForm.js

import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, FlatList} from 'react-native';
import {validateNullOrEmpty, validateEmail} from '../utils/ValidationUtil';
import {CustomError} from '../utils/ErrorHandlingUtil';
import axios from 'axios';

const Item = ({item}) => (
  <View style={{margin: 10}}>
    <Text style={{color: 'blue'}}>{item.email}</Text>
    <Text style={{color: 'black'}}>{item.password}</Text>
  </View>
);

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setData(response.data.users);
    } catch (error) {
      setError('Failed to retrieve user data');
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers();
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    try {
      validateNullOrEmpty(email, 'Email');
      validateEmail(email);
      validateNullOrEmpty(password, 'Password');

      const matchedUser = data.find(
        element => element.email === email && element.password === password,
      );

      if (matchedUser) {
        navigation.navigate('Home');
      } else if (data.length === 0) {
        throw new CustomError('No users found', 'login');
      } else if (data.some(element => element.email === email)) {
        throw new CustomError('Incorrect password', 'login');
      } else if (!matchedUser) {
        throw new CustomError('User does not exist', 'login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View>
      <Text style={{color: 'blue', fontSize: 35, fontWeight: 'bold'}}>
        Welcome To App Mode
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="black"
        style={{borderColor: 'black', borderWidth: 1, color: 'black'}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor="black"
        style={{borderColor: 'black', borderWidth: 1, color: 'black'}}
      />
      <Button title="Login" onPress={handleLogin} testID="login" />
      {data.length !== 0 && (
        <FlatList
          data={data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      )}
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    </View>
  );
};

export default LoginForm;
