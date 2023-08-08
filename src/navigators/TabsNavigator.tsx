import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import Icon from '@expo/vector-icons/MaterialIcons'
import { RootStackScreenProps } from './RootNavigator'
import { CompositeScreenProps } from '@react-navigation/native'

export type TabsStackParamList = {
    Home: undefined,
    Cart: undefined,
    Payment: undefined,
    Profile: undefined
}

const TabsStack = createBottomTabNavigator<TabsStackParamList>()

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"TabsStack">
    >

const TabsNavigator = () => {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false, }}>
            <TabsStack.Screen name='Home' component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <Icon name='home' {...props} />
                }
            }} />
            <TabsStack.Screen name='Cart' component={Example} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <Icon name='shopping-cart' {...props} />
                }
            }} />
            <TabsStack.Screen name='Payment' component={Example} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <Icon name='account-balance-wallet' {...props} />
                }
            }} />
            <TabsStack.Screen name='Profile' component={Example} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <Icon name='person' {...props} />
                }
            }} />
        </TabsStack.Navigator>
    )
}

export default TabsNavigator

const Example = () => {
    return <View />
}