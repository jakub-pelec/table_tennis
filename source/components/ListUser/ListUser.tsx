import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native';
import Text from '@shared/styled-components/Text/export';
import Button from '@shared/styled-components/Button/Button';

interface IProps {
    username: string,
    rating: number,
    selected: boolean
}

const ListUser: FC<IProps> = (props) => {
    return (
        <View style={[styles.default, (props.selected && styles.selected)]}>
            <View style={styles.usernameContainer}>
                <Text.Paragraph text={props.username} />
            </View>
            <View style={styles.ratingContainer}>
                <Text.UsernameCardText variant='ratingSmall' text={String(props.rating)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        width: '90%',
        height: 50,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        marginBottom: 10
    },
    selected: {
        backgroundColor: '#c6ffc1'
    },
    usernameContainer: {
        position: 'absolute',
        left: "5%"
    },
    ratingContainer: {
        position: 'absolute',
        right: "5%"
    }

})

export default ListUser
