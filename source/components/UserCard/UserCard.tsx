import React, { FC } from 'react';
import { ScrollView, StyleSheet, View, AppRegistry } from 'react-native';
import { withRouter } from 'react-router-native';
import ChampionTitle from '@components/ChampionTitle/ChampionTitle';
import UserDetails from '@components/UserDetails/UserDetails';
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

const UserCard: FC<IProps> = (props) => {
    const mockTitles = ['władca wiatru', 'dupa konia', 'chuj sobczaka'];

    return (
        <View>
            <View style={styles.cardsContainer}>
                <View style={styles.usernameCardContainer}>
                    <UserDetails username={props.username} rating={props.rating} wins={props.wins} losses={props.loses} />
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    {/* TODO: Replace with props.titles when done styling */}
                    {mockTitles.length === 0 ? <Text.Header variant='homepage' text='No titles' /> :
                        <View style={styles.insideScrollViewStyle}>
                            {/* TODO: Replace with props.titles when done styling */}
                            {mockTitles.map((title, index) => <ChampionTitle key={index} text={title} variant='homepage' />)}
                        </View>}
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    cardsContainer: {
        width: '100%',
        paddingVertical: '5%',
    },
    usernameCardContainer: {
        padding: '5%',
        width: '90%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgba(227,226,225,0.5)',

    },
    scrollViewStyle: {
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'rgba(200,199,199,0.4)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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

AppRegistry.registerComponent('userCard', () => UserCard);

export default withRouter(connect(mapStateToProps, { logout })(UserCard));
