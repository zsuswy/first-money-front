/**
 *
 * */
export class UserScoreLog {
    constructor(public id?: number,
                public userId?: number,
                public score?: number,
                public type?: number,
                public scoreTime?: Date,
                public amount?: number) {
    }
}
