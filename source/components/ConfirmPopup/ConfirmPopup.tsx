import { DIMENSIONS } from '@constants/deviceValues';
import {withRouter} from 'react-router-native';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Text from '@shared/styled-components/Text/export';
import Button from '@shared/styled-components/Button/Button';
import { APP_STATE } from '@typings/redux';
import {acceptChallenge, rejectChallenge} from '@actions/actions';
import {RouteComponentProps} from 'react-router-native';

interface IChallengeMessage {
    challengeID?: string
}

interface IProps extends RouteComponentProps {
    open: boolean,
    title: string,
    body: string,
    payload: IChallengeMessage,
}

const ConfirmPopup: FC<IProps> = (props) => {
    const acceptHandler = () => acceptChallenge({push: props.history.push, id: props.payload.challengeID || ''});
    const denyHandler = () => rejectChallenge({id: props.payload.challengeID || ''})
    return (
        <Modal isVisible={props.open}>
            <View style={styles.card}>
                <View>
                    <Text.Header variant='homepage' text={props.title} />
                </View>
                <View style={styles.bodyWrapper}>
                    <Text.Paragraph text={props.body} />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button variant='primary' onPress={acceptHandler}><Text.Button text='Accept' variant='homepage' /></Button>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button variant='cancel' onPress={denyHandler}><Text.Button text='Deny' variant='primary' /></Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    card: {
        width: DIMENSIONS.nativeWidth * 0.9,
        height: DIMENSIONS.nativeHeight * 0.59,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 15,
        padding: '5%'
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonWrapper: {
        width: '40%'
    },
    bodyWrapper: {
        width: '65%',
        transform: [{translateY: -20}]
    }
});

AppRegistry.registerComponent('confirmpopup', () => ConfirmPopup);

const mapStateToProps = (state: APP_STATE) => ({
    open: state.ui.popup.open,
    title: state.ui.popup.title,
    body: state.ui.popup.body,
    payload: state.ui.popup.payload
})

export default withRouter(connect(mapStateToProps)(ConfirmPopup));
