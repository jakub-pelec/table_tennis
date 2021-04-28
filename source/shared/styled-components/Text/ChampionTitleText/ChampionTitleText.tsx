import React, { FC } from 'react';
import { AppRegistry, ColorValue, StyleSheet, Text, TextProps } from 'react-native';

interface IProps {
    text: string,
    variant: 'dashboard' | 'default',
    color: any
};

const ChampionTitleText: FC<IProps & TextProps> = (props) => {

    const colorVariant = () => {
        return StyleSheet.create({
            colorVariant: {
                color: props.color
            }
        });
    }

    return <Text {...props} style={[styles.default, colorVariant().colorVariant]}>{props.text}</Text>
}

let styles = StyleSheet.create({
    default: {
        fontSize: 18,
        fontFamily: 'Baloo2-Bold',
        color: 'black',
        textAlign: 'left',
        maxWidth: '75%'
    },
});

AppRegistry.registerComponent('championTitleText', () => ChampionTitleText);

export default ChampionTitleText;