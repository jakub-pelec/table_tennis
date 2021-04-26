import React, { FC } from 'react'
import { AppRegistry, StyleSheet, Text } from 'react-native';


interface IProps {
    text: string
}

const Paragraph: FC<IProps> = (props) => {
    return <Text style={styles.default}>{props.text}{props.children}</Text>
};

AppRegistry.registerComponent('paragraph', () => Paragraph);

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        color: '#4D375D',
        fontFamily: 'Baloo2-Bold'
    }
});

export default Paragraph
