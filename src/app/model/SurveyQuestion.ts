import {SurveyQuestionOption} from './SurveyQuestionOption';

/**
 * Created by sunwuyang on 17/7/29.
 */
export class SurveyQuestion {
    constructor(public id?: number,
                public surveyId?: string,
                public seq?: number,
                public sex?: number,
                public title?: string,
                public type?: string,
                public questionContent?: string,
                public selectedOption?: string) {
    }
}
