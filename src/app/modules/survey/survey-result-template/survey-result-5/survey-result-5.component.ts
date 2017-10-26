import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';

@Component({
    selector: 'app-survey-result-5',
    templateUrl: './survey-result-5.component.html',
    styleUrls: ['./survey-result-5.component.css']
})
export class SurveyResult5Component implements OnInit {
    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];


    constructor() {
    }

    ngOnInit() {
    }

}
