/**
 *
 * */
export class UserSurvey {
    constructor(public id?: number,
                public userId?: number,
                public fromUserId?: number,
                public orderId?: number,
                public status?: number,
                public surveyId?: number,
                public finishTime?: Date,
                public answer?: string,
                public result?: string,
                public className?: string,
                public selectedSex?: number,
                public price?: number,
                public orgPrice?: number,
                public title?: string,
                public shortDescription?: string,
                public image?: string,) {
    }
}
