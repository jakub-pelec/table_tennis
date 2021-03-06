import React, { FC } from 'react'
import { AppRegistry, StyleSheet, Text } from 'react-native';


interface IProps {
    text: string,
    variant: 'rating' | 'username' | 'score' | 'ratingSmall'
}

const UsernameCardText: FC<IProps> = (props) => {
    return <Text style={[styles.default, styles[props.variant]]}>{props.text}{props.children}</Text>
};

AppRegistry.registerComponent('usernamecardtext', () => UsernameCardText);

const styles = StyleSheet.create({
    default: {
        fontSize: 36,
        color: '#2B2E4A',
        fontFamily: 'Baloo2-Bold',
    },
    username: {
        fontSize: 24,
        color: '#2B2E4A',
    },
    rating: {
        color: '#09BF68',
    },
    ratingSmall: {
        color: '#09BF68',
        fontSize: 20
    },
    score: {
        fontSize: 24,
    }
});

export default UsernameCardText;
