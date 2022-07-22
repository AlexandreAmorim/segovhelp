import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
    Heading,
    HStack,
    IconButton,
    useTheme,
    VStack,
    Text,
    FlatList,
    Center
} from 'native-base';
import { SignOut, Alien, ChatTeardropText } from 'phosphor-react-native';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Alert } from 'react-native';

export function Home() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [selected, setSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'open'
        },
        {
            id: '124',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'open'
        },
        {
            id: '125',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'closed'
        },
        {
            id: '126',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'closed'
        },
        {
            id: '127',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'open'
        },
        {
            id: '128',
            patrimony: '123456',
            when: '19/07/2022 às 10:00',
            status: 'open'
        }
    ]);

    function handleNewOrder() {
        navigation.navigate('new');
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', { orderId });
    }

    function handleLogout() {
        auth().signOut().catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.')
        })
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Alien size={32} color={colors.gray[300]} />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                    onPress={handleLogout}
                />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>
                    <Text color="gray.200">
                        {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title="em andamento"
                        onPress={() => setSelected('open')}
                        isActive={selected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title="finalizados"
                        onPress={() => setSelected('closed')}
                        isActive={selected === 'closed'}
                    />
                </HStack>
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={(
                        { item }
                    ) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'}
                                solicitações {selected === 'open' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />
                <Button title='Nova Solicitação' onPress={handleNewOrder} />
            </VStack>
        </VStack>
    );
}