import React, { FC, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteComponentProps } from 'react-router';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';
import Sidebar from '../Sidebar/Sidebar';
import UserCard from '@components/UserCard/UserCard';
import { createForegroundMessagesHandler } from '@actions/actions';
import ChallengePopup from '@components/ChallengePopup/ChallengePopup';

interface IProps extends RouteComponentProps { }

const DashboardPage: FC<IProps> = props => {
    const [sidebarShown, setSidebarShown] = useState<boolean>(false);
    const [open, togglePopup] = useState<boolean>(false);
    useEffect(() => {
        let unsubscribe;
        const attachListener = async () => {
            unsubscribe = await createForegroundMessagesHandler();
        };
        attachListener();
        return unsubscribe;
    }, [])

    const styling = () => {
        return sidebarShown === true ? styles.showSidebar : styles.default;
    };

    return (
        <>
            <View>
                <Button
                    onPress={() => {
                        setSidebarShown(!sidebarShown);
                    }}
                    variant="secondary">
                    <Text.Paragraph text="menu" />
                </Button>
            </View>
            <View style={styles.card}>
                {sidebarShown && <Sidebar />}
                <View style={styling()}>
                    <View style={styles.userCardContainer}>
                        <UserCard />
                        <View style={styles.buttonContainer}>
                            <Button variant='primary' onPress={() => togglePopup(true)}><Text.Button variant='homepage' text='challenge' /></Button>
                            <Button variant='primary'><Text.Button variant='homepage' text='tournament' /></Button>
                        </View>
                    </View>
                </View>
            </View>
            <ChallengePopup open={open} togglePopup={togglePopup} />

        </>
    );
};

const styles = StyleSheet.create({
    card: {

    },
    default: {},
    showSidebar: {
        marginLeft: '20%',
        marginRight: 0,
    },
    buttonContainer: {
        width: '75%',
        height: '25%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    userCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DashboardPage;
