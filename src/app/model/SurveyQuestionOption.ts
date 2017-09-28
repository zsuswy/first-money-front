/**
 * Created by sunwuyang on 17/7/29.
 */
import {SurveyQuestionOptionScore} from './SurveyQuestionOptionScore';

export class SurveyQuestionOption {
    constructor(public seq?: number,
                public option?: string,
                public jumpTo?: number,
                public optionScoreList?: Array<SurveyQuestionOptionScore>) {
    }
}
