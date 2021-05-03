import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import icons from '../../assets/export';
import Button from '../../shared/styled-components/Button/Button';
import Text from '../../shared/styled-components/Text/export';


interface IProps {
    count: number,
    text: string,
    variant: 'homepage'
}

const ChampionTitle: FC<IProps> = (props) => {

    const styling = () => {
        return props.count >= 10 ? styles.crownCountStyle2Digit : styles.crownCountStyle1Digit
    }

    return (
        <View style={[styles.default, styles[props.variant]]}>
            <View>
                <View style={styles.crownStyle}>
                    <Image source={icons.champion_title_crown} />
                    <View style={styling()}>
                        <Text.ChampionTitleText color={'#FFC93C'} variant={'crown'} text={String(props.count)} />
                    </View>
                </View>
            </View>
            <Text.ChampionTitleText color={"black"} variant={'default'} text={props.text} />
            <View style={styles.arrowStyle}>
                <Button onPress={() => console.log("arrowclicked")} variant='secondary'><Image style={styles.arrowStyle} source={icons.arrow} /></Button>
            </View>
        </View >
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
        padding: '1%'
    },
    homepage: {
        backgroundColor: 'rgba(172,172,172,0.2)',
        borderRadius: 10,
        marginBottom: '1%'
    },
    arrowStyle: {
        position: 'absolute',
        right: 5,
        width: 28
    },
    crownStyle: {
        marginRight: '5%',
        overflow: 'hidden'
    },
    crownCountStyle1Digit: {
        position: 'absolute',
        left: 28,
        top: 19,
        width: 30,
        height: 21,
        padding: 0
    },
    crownCountStyle2Digit: {
        position: 'absolute',
        left: 23,
        top: 19,
        width: 30,
        height: 21,
        padding: 0
    }

});



export default ChampionTitle
