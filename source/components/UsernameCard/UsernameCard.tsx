import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@shared/styled-components/Text/export';

interface IProps {
    username: string,
    wins: number,
    losses: number,
    rating: number
}

const UsernameCard: FC<IProps> = (props) => {
    return (
        <View style={styles.mainContainer}>
            <Text.UsernameCardText variant="username" text={props.username} />
            <Text.UsernameCardText variant="rating" text={String(props.rating)} />
            <View style={styles.scoreContainer}>
                <View style={styles.scoreContainerInside}>
                    <Text.UsernameCardText variant="score" text="W" />
                    <Text.UsernameCardText variant="score" text={String(props.wins)} />
                </View>
                <View style={styles.scoreContainerInside} >
                    <Text.UsernameCardText variant="score" text="L" />
                    <Text.UsernameCardText variant="score" text={String(props.losses)} />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    scoreContainerInside: {
        width: '50%',
        alignItems: 'center'
    }
})

export default UsernameCard;
