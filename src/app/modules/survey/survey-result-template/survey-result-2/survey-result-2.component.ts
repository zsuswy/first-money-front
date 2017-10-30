import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {ChartDataItem} from '../../../../model/ChartDataItem';
import * as shape from 'd3-shape';
import {Survey} from '../../../../model/Survey';
import {TemplateDimensionData} from '../../../../model/SurveyResult/TemplateDimensionData';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-survey-result-2',
    templateUrl: './survey-result-2.component.html',
    styleUrls: ['./survey-result-2.component.css']
})
export class SurveyResult2Component implements OnInit, OnChanges {
    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];

    @Input()
    survey: Survey = new Survey();

    colorSchema = {
        domain: ['#7ffbb1', '#e2e2e2']
    };

    /***/
    barChartData: ChartDataItem[] = [];

    /***/
    curveLinearClosed = shape.curveLinearClosed;

    /**
     * 把数据组织好，传递给模版
     * */
    templateDimensionDataList: TemplateDimensionData[] = [];

    radarData = [
        {
            "name": "France",
            "series": [
                {
                    "name": "能力",
                    "value": 77
                },
                {
                    "name": "态度",
                    "value": 52
                },
                {
                    "name": "运气",
                    "value": 87
                },
                {
                    "name": "勇气",
                    "value": 75
                },
                {
                    "name": "智慧",
                    "value": 45
                }
            ]
        }
    ];

    constructor(private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.surveyResult);
        this.parseData();
    }

    /**
     * 解析图表数据
     * */
    parseData() {
        if (this.surveyResult == null || this.dimensionList == null) {
            return;
        }

        // 第一层维度
        let firstLevelDimension = this.dimensionList.filter(item => item.parentId == null || item.parentId < 1);

        // 处理汇总维度的图表数据
        for (let i = 0; i < firstLevelDimension.length; i++) {
            let templateData = new TemplateDimensionData();
            templateData.dimension = (new SurveyDimension()).assignToSelf(firstLevelDimension[i]);
            templateData.dimensionScore = this.surveyResult.find(item => item.dimensionId == firstLevelDimension[i].id);
            templateData.sumData = [];

            console.log('-----');
            console.log(templateData.dimension);
            console.log(templateData.dimension.extraSettings);
            // 如果显示汇总图
            if (!(templateData.dimension.extraSettings.isShowSumChart == 0)) {
                let pieData = [];
                pieData.push({
                    'name': templateData.dimension.dimensionName,
                    'value': templateData.dimensionScore.score
                });

                pieData.push({
                    'name': '-',
                    'value': templateData.dimension.extraSettings.dimensionMaxValue - templateData.dimensionScore.score
                });

                console.log(templateData.dimension.extraSettings.sumChartType == 2);

                switch (Number(templateData.dimension.extraSettings.sumChartType)) {
                    case 1:
                        templateData.sumData = pieData;
                        break;
                    case 2: // 2-柱状图
                        let stackChartData = [{
                            "name": "",
                            "series": pieData
                        }];

                        templateData.sumData = stackChartData;
                        break;
                    default:
                        templateData.sumData = pieData;

                        break;
                }
            }

            // 处理子维度的图表数据
            if (!(templateData.dimension.extraSettings.isShowSubChart == 0)) {
                templateData.subData = [];
                templateData.subDimensionList = this.dimensionList.filter(item => item.parentId == firstLevelDimension[i].id);
                templateData.subDimensionScoreList = this.surveyResult.filter(dimensionScore => templateData.subDimensionList.some(dimension => dimension.id == dimensionScore.dimensionId));
                templateData.subDimensionScoreListForChart = templateData.subDimensionScoreList.slice();
                templateData.subDimensionScoreListForInfo = templateData.subDimensionScoreList.slice();

                // 根绝配置进行过滤
                // 设置了图表数据过滤
                if (templateData.dimension.extraSettings.subDimensionChartLimitType > 0) {
                    // 先排序
                    this.sortScoreList(templateData.subDimensionScoreListForChart, templateData.dimension.extraSettings.subDimensionChartLimitType);

                    // 再取Top
                    if (templateData.dimension.extraSettings.subDimensionChartLimitCnt > 0) {
                        templateData.subDimensionScoreListForChart = templateData.subDimensionScoreListForChart.slice(0, templateData.dimension.extraSettings.subDimensionChartLimitCnt);
                    }
                }

                // 设置了子维度描述信息过滤
                if (templateData.dimension.extraSettings.subDimensionInfoLimitType > 0) {
                    // 先排序
                    this.sortScoreList(templateData.subDimensionScoreListForInfo, templateData.dimension.extraSettings.subDimensionInfoLimitType);

                    console.log('=====++++++');
                    console.log(templateData.subDimensionScoreListForInfo);
                    // 再取Top
                    if (templateData.dimension.extraSettings.subDimensionInfoLimitCnt > 0) {
                        templateData.subDimensionScoreListForInfo = templateData.subDimensionScoreListForInfo.slice(0, templateData.dimension.extraSettings.subDimensionInfoLimitCnt);
                    }
                }

                console.log(templateData.subDimensionScoreList);

                let subBarChartData = [];
                for (let j = 0; j < templateData.subDimensionScoreListForChart.length; j++) {
                    subBarChartData.push({
                        'name': templateData.subDimensionScoreList[j].dimensionName,
                        'value': templateData.subDimensionScoreList[j].score
                    });
                }

                switch (Number(templateData.dimension.extraSettings.subChartType)) {
                    case 1:
                        templateData.subData = subBarChartData;
                        break;
                    case 2:
                        let subRadarChartData = [{
                            "name": "",
                            "series": subBarChartData
                        }];

                        templateData.subData = subRadarChartData;
                        break;
                    default:
                        templateData.subData = subBarChartData;
                        break;
                }
            }
            console.log(templateData.sumData);

            console.log(templateData.subData);
            this.templateDimensionDataList.push(templateData);
        }
    }

    private sortScoreList(scoreList: SurveyResultDimensionScore[], sortType: number) {
        scoreList.sort((item1, item2) => {
            let ret = item1.score > item2.score ? 1 : -1;
            if (sortType == 2) // 取分数大的
            {
                ret = 1 * ret;
            } else {
                ret = -1 * ret;
            }

            return ret;
        });
    }
}
