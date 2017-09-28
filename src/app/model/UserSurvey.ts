/**
 *
 * */
export class UserSurvey {
    constructor(public id?: number,
                public userId?: number,
                public pUserId?: number,
                public orderId?: number,
                public status?: number,
                public surveyId?: number,
                public finishTime?: Date,
                public answer?: string,
                public result?: string,
                public className?: string,
                public isNeedSex?: number) {
    }
}
