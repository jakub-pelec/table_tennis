import React, {FC, useEffect} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-native';
import {AppRegistry, StyleSheet, View, Image} from 'react-native';
import Text from '@shared/styled-components/Text/export';
import icons from '@assets/export';
import { DIMENSIONS } from '@constants/deviceValues';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Button from '@shared/styled-components/Button/Button';
import {finishChallenge} from '@actions/actions';
import {connect} from 'react-redux';
import { APP_STATE } from '@typings/redux';
import { LiveGameDocument } from '@reducers/fetch';
import { ROUTES } from '@constants/routes';

interface IProps extends RouteComponentProps {
    currentGame: LiveGameDocument
}

const InGame: FC<IProps> = (props) => {
    useEffect(() => {
        if(!props.currentGame) {
            return props.history.push(ROUTES.DASHBOARD);
        }
    }, [props.currentGame]);
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

    const handleChallangeFinish = () => {
        const {id, from, to} = props.currentGame;
        //TODO: replace with real data
        finishChallenge({push: props.history.push, challengeID: id, winnerId: from, loserId: to})
    }
    return (
        <View style={styles.default}>
            <Text.Header text='You are in game!' variant='homepage'/>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image style={styles.image} source={icons.ping_pong} />
            </Animated.View>
            <View style={styles.buttonContainer}>
                <Button variant='cancel' onPress={handleChallangeFinish}><Text.Button variant='homepage' text='finish game' /></Button>
            </View>
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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('ingame', () => InGame);

const mapStateToProps = (state: APP_STATE) => ({
    currentGame: state.fetch.liveGames[0]
})

export default connect(mapStateToProps)(withRouter(InGame));