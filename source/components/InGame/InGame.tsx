import React, {FC, useEffect} from 'react';
import {AppRegistry, StyleSheet, View, Image} from 'react-native';
import Text from '@shared/styled-components/Text/export';
import icons from '@assets/export';
import { DIMENSIONS } from '@constants/deviceValues';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface IProps {}

const InGame: FC<IProps> = (props) => {
    const rotation = useSharedValue(0);
    const animationTime = 500;
    const animationRepeat = 6;
    const animationValue = withRepeat(withTiming(360, {duration: animationTime, easing: Easing.out(Easing.sin)}), animationRepeat, false);
    useEffect(() => {
        rotation.value = animationValue;
        const timer = setInterval(() => {
            rotation.value = animationValue;
            setTimeout(() => {
                rotation.value = 0;
            }, animationTime * animationRepeat);
        }, 10000);
        return () => clearInterval(timer);
    }, [])
    const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ rotateZ: `${rotation.value}deg` }],
        };
      });
    return (
        <View style={styles.default}>
            <Text.Header text='You are in game!' variant='homepage'/>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image style={styles.image} source={icons.ping_pong} />
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    default: {
        width: DIMENSIONS.nativeWidth,
        height: DIMENSIONS.nativeHeight,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    imageContainer: {
        width: 100,
        height: 100,
        transform: [{translateY: -30}]
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

AppRegistry.registerComponent('ingame', () => InGame);

export default InGame;