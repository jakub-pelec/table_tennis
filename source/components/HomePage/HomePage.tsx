import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { withRouter } from 'react-router-native';
import ChampionTitle from '@components/ChampionTitle/ChampionTitle';
import UsernameCard from '@components/UsernameCard/UsernameCard';
import Button from '@shared/styled-components/Button/Button';
import Text from '@shared/styled-components/Text/export';
import { DIMENSIONS } from '@constants/deviceValues';
import { connect } from 'react-redux';
import { APP_STATE } from '@typings/redux';
import { logout } from '@actions/actions';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
    username: string,
    wins: number,
    loses: number,
    titles: string[],
    rating: number,
}

const HomePage: FC<IProps> = (props) => {
    const mockTitles = ['władca wiatru', 'dupa konia', 'chuj sobczaka'];

    return (
        <View>
            <View style={styles.cardsContainer}>
                <View style={styles.usernameCardContainer}>
                    <UsernameCard username={props.username} rating={props.rating} wins={props.wins} losses={props.loses}></UsernameCard>
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    {/* TODO: Replace with props.titles when done styling */}
                    {mockTitles.length === 0 ? <Text.Header variant='homepage' text='No titles' /> :
                        <View style={styles.insideScrollViewStyle}>
                            {/* TODO: Replace with props.titles when done styling */}
                            {mockTitles.map((title, index) => <ChampionTitle key={index} text={title} variant='homepage'></ChampionTitle>)}
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
        backgroundColor: 'rgba(227,226,225,0.5)',
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
        backgroundColor: 'rgba(227,226,225,0.5)',
    },
    scrollViewStyle: {
        width: '90%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'rgba(200,199,199,0.4)',
    },
    insideScrollViewStyle: {
        width: '100%',
        paddingVertical: '5%'
    },
});

const mapStateToProps = (state: APP_STATE) => ({
    username: state.fetch.username,
    wins: state.fetch.wins,
    loses: state.fetch.loses,
    titles: state.fetch.titles,
    rating: state.fetch.rating
});

export default withRouter(connect(mapStateToProps, { logout })(HomePage));
