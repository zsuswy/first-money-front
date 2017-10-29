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

        // 遍历
        for (let i = 0; i < firstLevelDimension.length; i++) {
            let templateData = new TemplateDimensionData();
            templateData.dimension = (new SurveyDimension()).assignToSelf(firstLevelDimension[i]);
            templateData.dimensionScore = this.surveyResult.find(item => item.dimensionId == firstLevelDimension[i].id);
            templateData.sumData = [];

            console.log('-----');
            console.log(templateData.dimension);
            console.log(templateData.dimension.extraSettings);
            // 如果显示汇总图
            if (!(templateData.dimension.extraSettings.isShowSumChart == 2)) {
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

            // 如果显示子维度的图
            if (!(templateData.dimension.extraSettings.isShowSubChart == 2)) {
                templateData.subData = [];
                templateData.subDimensionList = this.dimensionList.filter(item => item.parentId == firstLevelDimension[i].id);
                templateData.subDimensionScoreList = this.surveyResult.filter(dimensionScore => templateData.subDimensionList.some(dimension => dimension.id == dimensionScore.dimensionId));

                let subBarChartData = [];
                for (let j = 0; j < templateData.subDimensionScoreList.length; j++) {
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
}
