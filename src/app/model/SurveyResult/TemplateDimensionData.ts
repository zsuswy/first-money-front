import {SurveyDimensionExtraSettings} from '../SurveyDimensionExtraSettings';
import {SurveyDimension} from '../SurveyDimension';
import {SurveyResultDimensionScore} from '../SurveyResultDimensionScore';

/**
 * 传递给模版的数据
 * */
export class TemplateDimensionData {
    constructor(public sumData?: any,                                               // 汇总图表数据
                public subData?: any,                                               // 子维度图表数据
                public dimension?: SurveyDimension,                                 // 汇总维度
                public dimensionScore?: SurveyResultDimensionScore,                 // 汇总维度的得分
                public subDimensionList?: SurveyDimension[],                        // 子维度
                public subDimensionScoreList?: SurveyResultDimensionScore[]         // 子维度的得分
    ) {
    };
}