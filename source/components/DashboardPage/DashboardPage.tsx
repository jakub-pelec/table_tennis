import React, { FC, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { RouteComponentProps } from 'react-router';
import Button from '../../shared/styled-components/Button/Button';
import icons from '../../assets/export';
import Text from '../../shared/styled-components/Text/export';
import Sidebar from '../Sidebar/Sidebar';
import HomePage from '@components/HomePage/HomePage';
interface IProps extends RouteComponentProps {
};

const DashboardPage: FC<IProps> = (props) => {

    const [sidebarShown, setSidebarShown] = useState(false);

    const styling = () => {
        return sidebarShown === true ? styles.mainContainerSidebar : styles.mainContainerNoSidebar
    }

    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <View style={{ width: '33%' }}>
                <Button onPress={() => { setSidebarShown(!sidebarShown) }} variant='secondary'><Text.Paragraph text='menu' /></Button>
            </View>
            {sidebarShown === true ? <Sidebar /> : <></>}
            <HomePage />

        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: '33%',
        width: '90%',
        padding: '10%',
        backgroundColor: 'rgba(203,203,202,0.5)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    sidebar: {
        width: '17.5%',
        backgroundColor: 'rgba(203,203,202,0.5)',
        height: '100%',
        marginRight: '2.5%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    mainContainerSidebar: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: '90%',
        marginRight: '12.5%'

    },
    mainContainerNoSidebar: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: '90%',

    },
    backgroundStyle: {
        position: 'absolute',
        zIndex: 0,
    },
    cardsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    usernameCardContainer: {
        padding: '5%',
        width: '90%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgba(203,203,202,0.5)',
    },
    scrollViewStyle: {
        width: '90%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'rgba(172,172,172,0.5)',
        height: '50%'
    },
    insideScrollViewStyle: {
        width: '100%',
        height: '25%'
    }
})

export default DashboardPage
