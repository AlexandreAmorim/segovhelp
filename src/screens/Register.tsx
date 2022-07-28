import { VStack } from 'native-base';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Register() {
    const [patrimony, setPatrimony] = useState(0);
    const [description, setDescription] = useState('');
    const navigation = useNavigation();

    async function handlerRegisterAdd() {
        firestore().collection('calleds').add({
            patrimony,
            description,
            status: 'open',
            when: firestore.FieldValue.serverTimestamp()
        })
            .then(() => {
                Alert.alert('Cadastrado com sucesso!');
                navigation.navigate('home');
            })
            .catch((error) => console.error(error))
    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title='Nova Solicitação' />

            <Input
                placeholder='Número do patrimônio'
                mt={4}
                onChangeText={value => setPatrimony(Number(value))}
            />

            <Input
                placeholder='Descrição do problema'
                flex={1}
                mt={5}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
            />

            <Button
                title='Cadastrar'
                mt={5}
                onPress={handlerRegisterAdd}
            />
        </VStack>
    );
}