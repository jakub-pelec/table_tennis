import React, { FC, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DIMENSIONS } from '@constants/deviceValues';
import Text from '@shared/styled-components/Text/export';
import Input from '@shared/styled-components/Input/Input';
import ListUser from '@components/ListUser/ListUser';
import { APP_STATE } from '@typings/redux';
import { connect } from 'react-redux';
import Button from '@shared/styled-components/Button/Button';


interface IProps {
    users: any
}

const ChallengePopup: FC<IProps> = (props) => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState('')

    const buttonHandler = (user: any) => {
        setSelected(user.id);
        setValue(user.username);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.backdrop}>
                <View style={styles.mainContainer}>
                    <Input value={value} onChange={(e) => setValue(e.nativeEvent.text)} />
                    <ScrollView>
                        {props.users.filter((item: any) => item.username.includes(value))
                            .map((user: any, index: number) => <Button key={index} onPress={() => buttonHandler(user)} variant='secondary'><ListUser username={user.username} rating={user.rating} selected={selected === user.id} /></Button>)}
                    </ScrollView>
                </View>
                <View style={styles.confirmButton}>
                    <Button onPress={() => console.log(selected)} variant='primary'><Text.Button variant='primary' text='confirm' /></Button>
                </View>
            </View >
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: DIMENSIONS.nativeWidth,
        height: DIMENSIONS.nativeHeight,
        backgroundColor: 'rgba(100,100,100,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mainContainer: {
        marginTop: '10%',
        backgroundColor: 'white',
        width: DIMENSIONS.nativeWidth * .9,
        maxHeight: DIMENSIONS.nativeHeight * .5,
        borderRadius: 10
    },
    confirmButton: {
        width: DIMENSIONS.nativeWidth * .9,
        marginTop: '5%',

    }
});

const mapStateToProps = (state: APP_STATE) => ({
    users: state.users.allUsers
});

export default connect(mapStateToProps,)(ChallengePopup);
