import { Heading, VStack, Icon, useTheme } from "native-base";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import { Input } from "../components/Input";
import { Envelope, Key, Alien } from "phosphor-react-native";
import { Button } from "../components/Button";
import { useState } from "react";

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    function handleSignin() {
        if (!email || !password) {
            return Alert.alert('Entrar', 'Informe Email e Senha');
        }
        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error);
                setIsLoading(false);

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('Entrar', 'E-mail inválido.');
                }

                if (error.code === 'auth/wrong-password') {
                    return Alert.alert('Entrar', 'E-mail ou Senha inválido.');
                }

                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Entrar', 'E-mail ou Senha inválido.');
                }

                return Alert.alert('Entrar', 'Não foi possível acessar.')
            })
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Alien size={42} color={colors.gray[300]} />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder="E-mail"
                mb={4}
                InputLeftElement={
                    <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
                }
                onChangeText={setEmail}
            />
            <Input
                placeholder="Senha"
                mb={8}
                InputLeftElement={
                    <Icon as={<Key color={colors.gray[300]} />} ml={4} />
                }
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button
                title="Entrar"
                w="full"
                isLoading={isLoading}
                onPress={handleSignin}
            />
        </VStack>
    )
}