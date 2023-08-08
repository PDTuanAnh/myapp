import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import Icons from '@expo/vector-icons/MaterialIcons'
import MasonryList from '@react-native-seoul/masonry-list';
import { BlurView } from 'expo-blur'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomBackdrop from '../components/CustomBackdrop'
import FilterView from '../components/FilterView'
import { TabsStackScreenProps } from '../navigators/TabsNavigator'

const CATERGORIES = [
    'Clothing',
    'Shoes',
    'Accessories1',
    'Accessories2',
    'Accessories3',
    'Accessories4',
]
const AVATAR_URL = 'https://wellgroomedgentleman.com/media/images/tony-stark-beard.original.jpg'
const MESONARY_LIST_DATA = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        title: 'PUMA Everyday Hussle',
        price: 160
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80',
        title: 'PUMA Everyday Hussle',
        price: 180
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=412&q=80',
        title: 'PUMA Everyday Hussle',
        price: 200
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1615122514692-bfea4a7aa204?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        title: 'PUMA Everyday Hussle',
        price: 220
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1568252748074-f9c8d964e834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=404&q=80',
        title: 'PUMA Everyday Hussle',
        price: 240
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1618885283330-d4a77e27ccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        title: 'PUMA Everyday Hussle',
        price: 260
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1580651214613-f4692d6d138f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        title: 'PUMA Everyday Hussle',
        price: 280
    },
]

const HomeScreen = ({ navigation }: TabsStackScreenProps<'Home'>) => {
    const { colors } = useTheme()
    const [categoryIndex, setCategoryIndex] = useState(0)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <ScrollView>
            <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
                {/*Header Section */}
                <View
                    style={{
                        paddingHorizontal: 24,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8
                    }}>
                    <Image
                        source={{ uri: AVATAR_URL }}
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            borderRadius: 52
                        }} resizeMode='cover'
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: colors.text }} numberOfLines={1}>Hi, IronMan 🖐</Text>
                        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>Discover fashion that suit your style</Text>
                    </View>
                    <TouchableOpacity style={{ width: 52, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 52, borderWidth: 1, borderColor: colors.border }}>
                        <Icons name='notifications' size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>
                {/* Search Bar Section */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12 }}>
                    <TouchableOpacity style={{ flex: 1, height: 52, borderRadius: 52, borderWidth: 1, borderColor: colors.border, alignItems: 'center', paddingHorizontal: 24, gap: 12, flexDirection: 'row' }}>
                        <Icons name='search' size={24} color={colors.text} style={{ opacity: 0.5 }} />
                        <Text style={{ flex: 1, fontSize: 16, color: colors.text, opacity: 0.5 }}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openFilterModal}
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 52,
                            backgroundColor: colors.primary
                        }}>
                        <Icons name='tune' size={24} color={colors.background} />
                    </TouchableOpacity>
                </View>
                {/* Grid Collection View */}
                <View style={{ paddingHorizontal: 24 }}>
                    {/* Tille bar */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 12
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>New Collection</Text>
                        <TouchableOpacity>
                            <Text>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', height: 200, gap: 12 }}>
                        {/* Card */}
                        <Card
                            onPress={() => {
                                navigation.navigate('Details', { id: '123' })
                            }}
                            price={100}
                            imageUrl='https://images.unsplash.com/photo-1619785292559-a15caa28bde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80'
                        />
                        <View style={{ flex: 1, gap: 12 }}>
                            <Card
                                onPress={() => {
                                    navigation.navigate('Details', { id: '456' })
                                }}
                                price={120}
                                imageUrl='https://images.unsplash.com/photo-1577909687863-91bb3ec12db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80'
                            />
                            <Card
                                onPress={() => {
                                    navigation.navigate('Details', { id: '789' })
                                }}
                                price={140}
                                imageUrl='https://images.unsplash.com/photo-1502163140606-888448ae8cfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                            />
                        </View>
                    </View>
                </View>
                {/* Categories Section */}
                <FlatList
                    data={CATERGORIES}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        gap: 12,
                    }}
                    renderItem={({ item, index }) => {
                        const isSelected = categoryIndex === index
                        return (
                            <TouchableOpacity
                                onPress={() => setCategoryIndex(index)}
                                style={{
                                    backgroundColor: isSelected ? colors.primary : colors.card,
                                    paddingHorizontal: 20,
                                    paddingVertical: 12,
                                    borderRadius: 100,
                                    borderWidth: isSelected ? 0 : 1,
                                    borderColor: colors.border
                                }}>
                                <Text
                                    style={{
                                        color: isSelected ? colors.background : colors.text,
                                        fontWeight: '600',
                                        fontSize: 16,
                                        opacity: isSelected ? 1 : 0.5,
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                {/* Masonry */}
                <MasonryList
                    data={MESONARY_LIST_DATA}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }: any) => (
                        <View style={{ padding: 6 }}>
                            <View
                                style={{
                                    aspectRatio: i === 0 ? 1 : 2 / 3,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 24,
                                }}>
                                <Image source={{
                                    uri: item.imageUrl,
                                }}
                                    resizeMode='cover'
                                    style={StyleSheet.absoluteFill}
                                />
                                <View
                                    style={[StyleSheet.absoluteFill, { padding: 16, }]}>
                                    <View style={{ flexDirection: 'row', gap: 8, padding: 4 }}>
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: "#fff",
                                                textShadowColor: "rgba(0,0,0,0.2)",
                                                textShadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                                textShadowRadius: 4,
                                            }}>
                                            {item.title}
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: colors.background,
                                                borderRadius: 100,
                                                height: 32,
                                                aspectRatio: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                            <Icons name='favorite-border' size={20} color={colors.text} />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <BlurView
                                        style={{
                                            flexDirection: 'row',
                                            backgroundColor: 'rgba(0,0,0,0.35)',
                                            alignItems: 'center',
                                            padding: 8,
                                            borderRadius: 100,
                                            overflow: 'hidden',
                                        }} intensity={20}>
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: '#fff',
                                                marginLeft: 4,
                                            }} numberOfLines={1}>
                                            ${item.price}
                                        </Text>
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 8,
                                                borderRadius: 100,
                                                backgroundColor: '#fff',
                                            }}>
                                            <Icons name='add-shopping-cart' size={20} color='#000' />
                                        </TouchableOpacity>
                                    </BlurView>
                                </View>
                            </View>
                        </View>
                    )}
                    onEndReachedThreshold={0.1}
                />
            </SafeAreaView>
            <BottomSheetModal
                snapPoints={['85%']}
                index={0}
                ref={bottomSheetModalRef}
                backdropComponent={(props) => <CustomBackdrop{...props} />}
            >
                <FilterView />
            </BottomSheetModal>
        </ScrollView >
    )
}

export default HomeScreen

const Card = (
    {
        price,
        imageUrl,
        onPress
    }: {
        price: number,
        imageUrl: string,
        onPress?: () => void
    }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 24
            }}>
            <Image
                source={{
                    uri: imageUrl,
                }}
                resizeMode="cover"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    left: 12,
                    top: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    borderRadius: 100,
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
                    ${price}
                </Text>
            </View>

        </TouchableOpacity>
    )
}