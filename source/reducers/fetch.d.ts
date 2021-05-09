import {INITIAL_STATE} from './fetchReducer';

export interface LiveGameDocument {
    from: string,
    to: string,
    result: {
        winnerId: string | null,
        winnerNickname: string,
        loserId: string | null,
        loserNickname: string,
        winScore: number,
        loseScore: number
    },
    finished: boolean,
    accepted: boolean,
    id: string
}

export declare type FETCH_STATE = typeof INITIAL_STATE;