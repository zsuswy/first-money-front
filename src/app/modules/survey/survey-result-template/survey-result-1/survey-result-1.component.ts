import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {ChartDataItem} from '../../../../model/ChartDataItem';
import * as shape from 'd3-shape';

@Component({
    selector: 'app-survey-result-1',
    templateUrl: './survey-result-1.component.html',
    styleUrls: ['./survey-result-1.component.css']
})
export class SurveyResult1Component implements OnInit, OnChanges {

    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];


    barChartData: ChartDataItem[] = [];
    curveLinearClosed = shape.curveLinearClosed;

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

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.parseData();
    }

    parseData() {
        if (this.surveyResult == null || this.dimensionList == null) {
            return;
        }

        this.barChartData = this.surveyResult.map(item => {
            return {name: item.title || item.dimensionName, value: item.score};
        });

        console.log(this.barChartData);

    }

    ngOnInit() {
    }
}
