import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {ChartDataItem} from '../../../../model/ChartDataItem';

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
