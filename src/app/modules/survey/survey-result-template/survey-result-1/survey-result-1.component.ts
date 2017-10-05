import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';

@Component({
    selector: 'app-survey-result-1',
    templateUrl: './survey-result-1.component.html',
    styleUrls: ['./survey-result-1.component.css']
})
export class SurveyResult1Component implements OnInit {
    @Input() result: SurveyResultDimensionScore[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}
