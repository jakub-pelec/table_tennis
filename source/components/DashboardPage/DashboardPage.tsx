import React, { FC, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteComponentProps } from 'react-router';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';
import Sidebar from '../Sidebar/Sidebar';
import HomePage from '@components/HomePage/HomePage';
import { createForegroundMessagesHandler } from '@actions/actions';
import ChallengePopup from '@components/ChallengePopup/ChallengePopup';

interface IProps extends RouteComponentProps { }

const DashboardPage: FC<IProps> = props => {
    const [sidebarShown, setSidebarShown] = useState(false);
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

            <View style={{ width: '20%', marginTop: '5%' }}>
                <Button
                    onPress={() => {
                        setSidebarShown(!sidebarShown);
                    }}
                    variant="secondary">
                    <Text.Paragraph text="menu" />
                </Button>
            </View>
            <View>
                {sidebarShown && <Sidebar />}
                <View style={styling()}>
                    <HomePage />
                </View>
            </View>
            {/* <ChallengePopup></ChallengePopup> */}
        </>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {

    },
    showSidebar: {
        marginLeft: '20%',
        marginRight: 0,
    },
    default: {},
});

export default DashboardPage;
