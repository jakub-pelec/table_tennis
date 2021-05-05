import React, { FC, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DIMENSIONS } from '@constants/deviceValues';
import Text from '@shared/styled-components/Text/export';
import Input from '@shared/styled-components/Input/Input';
import ListUser from '@components/ListUser/ListUser';
import { APP_STATE } from '@typings/redux';
import { connect } from 'react-redux';
import Button from '@shared/styled-components/Button/Button';
import Modal from 'react-native-modal';
import {createChallenge} from "@actions/actions";

interface IProps {
    users: any,
    open: boolean,
    togglePopup: (s: any) => void,
    ownID: string
}

const ChallengePopup: FC<IProps> = (props) => {
    const [value, setValue] = useState<string>('');
    const [selected, setSelected] = useState<string>('')

    const buttonHandler = (user: any) => {
        setSelected(user.id);
        setValue(user.username);
    }

    const submitHandler = async() => {
        const payload = {from: props.ownID, to: selected};
        await createChallenge(payload);
        props.togglePopup(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Modal isVisible={props.open} onBackdropPress={() => props.togglePopup(false)}>
                <View style={styles.card}>
                    <View>
                        <Text.Header variant='default' text='Choose player' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input value={value} onChangeText={(value) => setValue(value)} placeholder="Search..." />
                    </View>
                    <ScrollView>
                        {props.users.filter((item: any) => item.username.includes(value))
                            .map((user: any, index: number) => <Button key={index} onPress={() => buttonHandler(user)} variant='secondary'><ListUser username={user.username} rating={user.rating} selected={selected === user.id} /></Button>)}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button variant='primary' onPress={submitHandler}><Text.Button text='Challenge!' variant='homepage' /></Button>
                    </View>
                </View>
            </Modal>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '80%'
    },
    inputContainer: {
        width: '80%',
        position: 'relative',
        zIndex: 20,
        elevation: 20,
        marginVertical: '10%'
    },
    card: {
        width: DIMENSIONS.nativeWidth * 0.9,
        height: DIMENSIONS.nativeHeight * 0.59,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 15,
        padding: '10%'
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
    users: state.users.allUsers,
    ownID: state.auth.id
});

export default connect(mapStateToProps,)(ChallengePopup);
