/**
 * Created by sunwuyang on 17/7/29.
 */
export class SurveyResultDimensionScore {
    constructor(public dimensionId?: number,
                public dimensionName?: string,
                public score?: number,
                public dimensionDisplayName?: string,
                public title?: string,
                public comment?: string) {
    }
}
