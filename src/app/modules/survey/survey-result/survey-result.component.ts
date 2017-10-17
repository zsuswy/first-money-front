import {Component, HostBinding, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import * as shape from 'd3-shape';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {Cookie} from '../../../util/Cookie';
import {LoadingComponent} from '../../common/loading/loading.component';
import {SurveyResultDimensionScore} from '../../../model/SurveyResultDimensionScore';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {SurveyDimension} from '../../../model/SurveyDimension';

@Component({
    templateUrl: './survey-result.component.html',
    animations: [slideInDownAnimation]
})
export class SurveyResultComponent extends WxBase {
    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    @HostBinding('@routeAnimation')
    routeAnimation = true;

    @HostBinding('style.display')
    display = 'block';

    @HostBinding('style.position')
    position = 'absolute';

    userSurveyId: number;
    userSurvey: UserSurvey;
    resultData: SurveyResultDimensionScore[];
    dimensionList: SurveyDimension[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    curveLinearClosed = shape.curveLinearClosed;

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


    barChartData = [
        {
            "name": "Germany",
            "value": 46
        },
        {
            "name": "USA",
            "value": 20
        },
        {
            "name": "France",
            "value": 88
        }
    ];

    radarData = [
        // {
        //     "name": "Germany",
        //     "series": [
        //         {
        //             "name": "能力",
        //             "value": 66
        //         },
        //         {
        //             "name": "态度",
        //             "value": 12
        //         },
        //         {
        //             "name": "运气",
        //             "value": 37
        //         },
        //         {
        //             "name": "勇气",
        //             "value": 15
        //         },
        //         {
        //             "name": "智慧",
        //             "value": 15
        //         }
        //     ]
        // },
        //
        // {
        //     "name": "USA",
        //     "series": [
        //         {
        //             "name": "能力",
        //             "value": 26
        //         },
        //         {
        //             "name": "态度",
        //             "value": 82
        //         },
        //         {
        //             "name": "运气",
        //             "value": 27
        //         },
        //         {
        //             "name": "勇气",
        //             "value": 45
        //         },
        //         {
        //             "name": "智慧",
        //             "value": 95
        //         }
        //     ]
        // },

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

    pieColors = {
        domain: ['#ffc107', '#eefb3f', '#ffc107', '#eefb3f']
    };


    constructor(protected surveyService: SurveyService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);
        route.paramMap.subscribe(params => {
            this.userSurveyId = Number(params.get('userSurveyId'));

            // 获取答题结果 和 维度设置
            this.surveyService.getUserSurvey(this.userSurveyId).subscribe(resp => {
                this.userSurvey = resp.data;
                this.loadComponent.loadComplete();

                // 将字符串转为JSON对象
                this.resultData = JSON.parse(this.userSurvey.result) as SurveyResultDimensionScore[];

                // 获取 维度设置
                let dimensionSearch = new ListSearchVo();
                dimensionSearch.page = null;
                dimensionSearch.params = {'surveyId': this.userSurvey.surveyId};

                this.surveyService.getSurveyDimensionList(dimensionSearch).subscribe(surveyResp => {
                    this.dimensionList = surveyResp.data.list;
                    console.log(this.resultData);
                    console.log(this.dimensionList);

                    this.prepareData();
                });
            });
        });
    }

    prepareData() {

    }

    onSelect(event) {
        console.log(event);
    }
}
