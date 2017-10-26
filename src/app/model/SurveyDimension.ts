/**
 *
 * */

export class SurveyDimension {
    private subDimensionList: SurveyDimension[];

    constructor(public id?: number,
                public parentId?: number,
                public surveyId?: number,
                public seq?: number,
                public dimensionName?: string,
                public autoCalculateType?: number,
                public proxySubDimensionId?: number,
                public description?: string,
                public isFirstLevel?: boolean,
                public params?: string) {
        if (this.description == null) {
            this.description = '';
        }

    }
}
