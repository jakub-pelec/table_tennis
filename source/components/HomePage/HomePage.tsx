import ChampionTitle from '@components/ChampionTitle/ChampionTitle';
import UsernameCard from '@components/UsernameCard/UsernameCard';
import Button from '@shared/styled-components/Button/Button';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Text from '../../shared/styled-components/Text/export';

const HomePage = () => {
    return (
        <View>

            <View style={styles.cardsContainer}>
                <View style={styles.usernameCardContainer}>
                    <UsernameCard username={'pelec'} rating={3021} wins={51} losses={10}></UsernameCard>
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    <View style={styles.insideScrollViewStyle}>
                        <ChampionTitle count={0} text={'król Albanii'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
                        <ChampionTitle count={2} text={'właasddca wiatru'} variant={'dashboard'}></ChampionTitle>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button variant='primary'><Text.ChampionTitleText text="challenge" color="black" variant='dashboard' /></Button>
                    <Button variant='primary'><Text.ChampionTitleText text="tournament" color="black" variant='dashboard' /></Button>
                </View>
            </View>
        </View>
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

export default HomePage
