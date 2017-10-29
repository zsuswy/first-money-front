import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';
import {SurveyDimension} from '../../../../model/SurveyDimension';
import {Survey} from '../../../../model/Survey';
import {Config} from '../../../Config';
import {TemplateDimensionData} from '../../../../model/SurveyResult/TemplateDimensionData';

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

    @Input()
    surveyResult: SurveyResultDimensionScore[] = [];

    @Input()
    dimensionList: SurveyDimension[] = [];

    @Input()
    survey: Survey = new Survey();

    templateDimensionData: TemplateDimensionData = new TemplateDimensionData();


    colorSchema = {
        domain: ['#7ffbb1', '#e2e2e2']
    };

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
        this.templateDimensionData.dimension = (new SurveyDimension()).assignToSelf(defaultDimension);

        // this.chartType = this.dimension.extraSettings.sumChartType;

        this.templateDimensionData.dimensionScore = this.surveyResult[0];
        // this.dimensionResult = this.surveyResult[0];

        // 饼图和柱图的数据结构有一点不一样
        let pieChartData = [];
        let stackChartData = [{
            "name": "",
            "series": null
        }];

        pieChartData.push({
            'name': this.templateDimensionData.dimension.dimensionName,
            'value': this.templateDimensionData.dimensionScore.score
        });

        pieChartData.push({
            'name': '-',
            'value': this.templateDimensionData.dimension.extraSettings.dimensionMaxValue - this.templateDimensionData.dimensionScore.score
        });

        stackChartData[0].series = pieChartData;

        this.templateDimensionData.sumData = this.templateDimensionData.dimension.extraSettings.sumChartType == 2 ? stackChartData : pieChartData;
    }

    constructor() {
    }
}
