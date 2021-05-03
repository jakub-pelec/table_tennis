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
        return sidebarShown === true ? styles.showSidebar : styles.default
    }

    return (
        <>
            <Image style={styles.backgroundStyle} source={icons.background} />
            <View style={{ width: '20%' }}>
                <Button onPress={() => { setSidebarShown(!sidebarShown) }} variant='secondary'><Text.Paragraph text='menu' /></Button>
            </View>
            <View>
                {sidebarShown === true ? <Sidebar /> : <></>}
                <View style={styling()}>
                    <HomePage />
                </View>
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        position: 'absolute',
        zIndex: 0,
    },
    showSidebar: {
        marginLeft: '20%',
        marginRight: 0
    },
    default: {

    }

})

export default DashboardPage
