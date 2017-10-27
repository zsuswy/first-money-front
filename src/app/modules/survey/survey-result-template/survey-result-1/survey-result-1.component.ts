import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {Survey} from '../../../../model/Survey';
import {Config} from '../../../Config';

@Component({
    selector: 'app-survey-result-1',
    templateUrl: './survey-result-1.component.html',
    styleUrls: ['./survey-result-1.component.css']
})
/**
 * 只有一个维度的模版
 * */
export class SurveyResult1Component implements OnInit, OnChanges {
    ngOnInit() {
    }

    showChart: Boolean = true;

    // options
    xAxisLabel = 'Country';
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];

    @Input()
    survey: Survey = new Survey();

    dimension: SurveyDimension = new SurveyDimension();
    dimensionResult: SurveyResultDimensionScore = new SurveyResultDimensionScore();
    chartType: number = 0;

    pieColors = {
        domain: ['#7ffbb1', '#e2e2e2']
    };

    pieChartData = [];
    stackChartData = [{
        "name": "",
        "series": null
    }];

    ngOnChanges(changes: SimpleChanges): void {
        this.prepareData();
    }

    prepareData() {
        let defaultDimension = this.dimensionList.find(item => (item.parentId == null || item.parentId == 0));
        if (defaultDimension == null) {
            Config.log('维度信息异常');
            return;
        }

        // 序列化，继承TypeScript对象的相关操作
        this.dimension.assignToSelf(defaultDimension);

        this.chartType = this.dimension.extraSettings.sumChartType;

        this.dimensionResult = this.surveyResult[0];

        // 是否需要显示图表
        this.showChart = !(this.dimension.extraSettings.isShowSumChart == 2);

        console.log(this.dimensionResult);

        this.pieChartData.push({'name': this.dimensionResult.dimensionName, 'value': this.dimensionResult.score});

        this.pieChartData.push({
            'name': '-',
            'value': this.dimension.extraSettings.dimensionMaxValue - this.dimensionResult.score
        });

        this.stackChartData[0].series = this.pieChartData;
        console.log(this.pieChartData);

    }

    constructor() {
    }
}
