import React, { FC } from 'react';
import { View } from 'react-native';
import { RouteComponentProps } from 'react-router';
import ChampionTitle from '../ChampionTitle/ChampionTitle';

interface IProps extends RouteComponentProps {
};

const DashboardPage: FC<IProps> = (props) => {
    return (
        <View style={{ width: '75%' }}>
            <ChampionTitle count={0} text={'król Albanii'} variant={'dashboard'}></ChampionTitle>
            <ChampionTitle count={3} text={'5cm chuja sobczaka'} variant={'dashboard'}></ChampionTitle>
            <ChampionTitle count={2} text={'władca wiatru'} variant={'dashboard'}></ChampionTitle>
            <ChampionTitle count={1} text={'5cm chuja sobczaka 5cm chuja sobczaka 5cm chuja sobczaka'} variant={'dashboard'}></ChampionTitle>
        </View>
    )
}

export default DashboardPage
