import ChampionTitle from '@components/ChampionTitle/ChampionTitle';
import UsernameCard from '@components/UsernameCard/UsernameCard';
import Button from '@shared/styled-components/Button/Button';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Text from '@shared/styled-components/Text/export';
import { DIMENSIONS } from '@constants/deviceValues';

interface IProps {
}

const HomePage: FC<IProps> = (props) => {

    const przykladowyarray = [1];

    return (
        <View>
            <View style={styles.cardsContainer}>
                <View style={styles.usernameCardContainer}>
                    <UsernameCard username={'pelec'} rating={3021} wins={51} losses={10}></UsernameCard>
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    {przykladowyarray.length === 0 ? <Text.Header variant='homepage' text='No titles' /> : <View style={styles.insideScrollViewStyle}>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'homepage'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'homepage'}></ChampionTitle>
                        <ChampionTitle count={10} text={'władca wiatru'} variant={'homepage'}></ChampionTitle>
                        <ChampionTitle count={2} text={'władca wiatru'} variant={'homepage'}></ChampionTitle>
                        <ChampionTitle count={20} text={'władca wiatru'} variant={'homepage'}></ChampionTitle>
                        <ChampionTitle count={2} text={'właasasdca wiatru'} variant={'homepage'}></ChampionTitle>
                    </View>}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button variant='primary'><Text.Button variant='homepage' text='challenge' /></Button>
                    <Button variant='primary'><Text.Button variant='homepage' text='tournament' /></Button>
                </View>
            </View>
        </View >
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
    cardsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: DIMENSIONS.nativeHeight * 0.85
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
    },
    insideScrollViewStyle: {
        width: '100%',
        paddingVertical: '5%'
    },
})

export default HomePage
