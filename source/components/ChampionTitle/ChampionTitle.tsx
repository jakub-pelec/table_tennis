import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import icons from '../../assets/export';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';


interface IProps {
    count: number,
    text: string,
    variant: 'dashboard'
}

const ChampionTitle: FC<IProps> = (props) => {
    return (
        <View style={[styles.default, styles[props.variant]]}>
            <View>
                <View style={styles.crownStyle}>
                    <Image source={icons.champion_title_crown} />
                    <View style={styles.crownCountStyle}>
                        <Text.ChampionTitleText color={'#FFC93C'} variant={'dashboard'} text={String(props.count)} />
                    </View>
                </View>
            </View>
            <Text.ChampionTitleText color={"black"} variant={'default'} text={props.text} />
            <View style={styles.arrowStyle}>
                <Button onPress={() => console.log("arrowclicked")} variant='secondary'><Image style={styles.arrowStyle} source={icons.arrow} /></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        width: '100%',
        height: 64,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dashboard: {
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    arrowStyle: {
        position: 'absolute',
        right: 0,
        width: 28
    },
    crownStyle: {
        marginRight: '5%',
    },
    crownCountStyle: {
        position: 'absolute',
        left: 28,
        top: 18,
        width: 18,
        height: 21,
        padding: 0
    }

});



export default ChampionTitle
