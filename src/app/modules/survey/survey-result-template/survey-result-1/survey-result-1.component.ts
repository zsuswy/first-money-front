import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';

@Component({
    selector: 'app-survey-result-1',
    templateUrl: './survey-result-1.component.html',
    styleUrls: ['./survey-result-1.component.css']
})
export class SurveyResult1Component implements OnInit {

    ngOnInit() {
    }

    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];

    pieColors = {
        domain: ['#ffc107', '#eefb3f', '#ffc107', '#eefb3f']
    };

    pieChartData = [
        {
            "name": "Germany",
            "value": 46
        },
        {
            "name": "USA",
            "value": 20
        }
    ];

    constructor() {
    }
}
