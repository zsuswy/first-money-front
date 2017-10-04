import {SurveyQuestionOptionScore} from './SurveyQuestionOptionScore';

export class SurveyAnswer {
    constructor(public questionId?: number,
                public questionSeq?: number,
                public userSelection?: string,
                public questionContent?: string,
                public scoreList?: SurveyQuestionOptionScore[]) {
    }
}