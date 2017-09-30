import {Component, HostBinding} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import * as shape from 'd3-shape';

@Component({
    templateUrl: './survey-result.component.html',
    animations: [slideInDownAnimation]
})
export class SurveyResultComponent {
    @HostBinding('@routeAnimation')
    routeAnimation = true;
    @HostBinding('style.display')
    display = 'block';
    @HostBinding('style.position')
    position = 'absolute';

    public visible: boolean;
    public show2: boolean;

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    curveLinearClosed = shape.curveLinearClosed;

    single2 = [
        {
            "name": "Germany",
            "value": 46
        },
        {
            "name": "USA",
            "value": 20
        }
    ];


    single = [
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
                    "value":52
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


    constructor() {
        this.visible = false;
        this.show2 = false;
    }


    onSelect(event) {
        console.log(event);
    }
}
