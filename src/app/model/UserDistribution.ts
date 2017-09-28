/**
 * Created by sunwuyang on 17/7/30.
 */
export class UserDistribution {
    constructor(public id?: number,
                public fromUserId?: number,
                public toUserId?: number,
                public finishTime?: Date,
                public surveyId?: number,
                public userSurveyId?: number) {

    }
}
