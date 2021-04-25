import React, { FC } from 'react'
import { AppRegistry, StyleSheet, Text } from 'react-native';


interface IProps {
    text: string
}

const Paragraph: FC<IProps> = (props) => {
    return <Text style={styles.default}>{props.text}</Text>
};

AppRegistry.registerComponent('paragraph', () => Paragraph);

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        color: '#6F6F6F',
    }
});

export default Paragraph
