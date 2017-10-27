import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {Survey} from '../../../../model/Survey';

@Component({
    selector: 'app-survey-result-3',
    templateUrl: './survey-result-3.component.html',
    styleUrls: ['./survey-result-3.component.css']
})
export class SurveyResult3Component implements OnInit {

    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];

    @Input()
    survey: Survey = new Survey();

    constructor() {
    }

    ngOnInit() {
    }

}
