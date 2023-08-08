import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

const PriceRangeSelector = ({
    minPrice, maxPrice, startPrice, endPrice, onStartPriceChange, onEndPriceChange
}: {
    minPrice: number;
    maxPrice: number;
    startPrice: number;
    endPrice: number;
    onStartPriceChange: (value: number) => void;
    onEndPriceChange: (value: number) => void;
}) => {

    const theme = useTheme();
    const [barWidth, setBarWidth] = useState(0)
    const leftHandlePos = useSharedValue(0)
    const rightHandlePos = useSharedValue(0)

    const startHandleGesture = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        {
            prevPos: number
        }>({
            onStart(event, context) {
                context.prevPos = leftHandlePos.value
            },
            onActive(event, context) {
                leftHandlePos.value = Math.min(rightHandlePos.value, Math.max(0, context.prevPos + event.translationX));

                runOnJS(onStartPriceChange)(Math.round((maxPrice / barWidth) * leftHandlePos.value));

            },
        })

    const rightHandleGesture = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        {
            prevPos: number
        }>({
            onStart(event, context) {
                context.prevPos = rightHandlePos.value
            },
            onActive(event, context) {
                rightHandlePos.value = Math.min(barWidth, Math.max(leftHandlePos.value, context.prevPos + event.translationX));

                runOnJS(onEndPriceChange)(Math.round((maxPrice / barWidth) * rightHandlePos.value));

            },
        })

    const leftHandleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: leftHandlePos.value
            }
        ]
    }))

    const rightHandleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: rightHandlePos.value
            }
        ]
    }))

    const barHighLightStyle = useAnimatedStyle(() => ({
        left: leftHandlePos.value,
        right: barWidth - rightHandlePos.value,
    }))

    useEffect(() => {
        if (barWidth === 0) return;
        leftHandlePos.value = (startPrice * barWidth) / maxPrice;
        rightHandlePos.value = (endPrice * barWidth) / maxPrice;
    }, [barWidth])

    return (
        <View style={{ paddingHorizontal: 24 }}>
            <View style={{ marginBottom: 24 }}>
                <Text>Price Range</Text>
            </View>

            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.colors.border,
                    position: 'relative'
                }}
                onLayout={(event) => {
                    setBarWidth(event.nativeEvent.layout.width)
                }}
            >
                <Animated.View
                    style={[
                        barHighLightStyle,
                        {
                            position: 'absolute',
                            height: '100%',
                            backgroundColor: theme.colors.primary
                        },
                    ]}
                />

                <PanGestureHandler onGestureEvent={startHandleGesture}>
                    <Animated.View style={[leftHandleStyle, { position: 'absolute', zIndex: 10 }]}>
                        <SliderHandler label={`$${startPrice}`} />
                    </Animated.View>
                </PanGestureHandler>
                <PanGestureHandler onGestureEvent={rightHandleGesture}>
                    <Animated.View style={[rightHandleStyle, { position: 'absolute', zIndex: 10 }]}>
                        <SliderHandler label={`$${endPrice}`} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    )
}

export default PriceRangeSelector

const SliderHandler = ({ label }: { label: string }) => {
    const theme = useTheme()
    return (
        <View
            style={{
                height: 24,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                borderColor: theme.colors.primary,
                borderWidth: 2,
                backgroundColor: theme.colors.background,
                position: 'absolute',
                transform: [
                    {
                        translateX: -11.5
                    },
                    {
                        translateY: -11.5
                    }
                ]
            }}>
            <View
                style={{
                    width: 3,
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: theme.colors.primary
                }} />
            <View style={{
                position: 'absolute',
                top: 24,
                width: 200,
                alignItems: 'center'
            }}>
                <View style={{ backgroundColor: theme.colors.card }}>
                    <Text numberOfLines={1} style={{ color: theme.colors.text }}>{label}</Text>
                </View>
            </View>
        </View>

    )
}