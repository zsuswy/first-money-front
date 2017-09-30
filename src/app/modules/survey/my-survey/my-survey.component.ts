import {AfterViewInit, Component, ElementRef, HostBinding, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';


@Component({
    templateUrl: './my-survey.component.html',
    animations: [slideInDownAnimation],
    styleUrls: ['./my-survey.component.css']
})
export class MySurveyPageComponent implements AfterViewInit {
    @HostBinding('@routeAnimation')
    routeAnimation = true;
    @HostBinding('style.display')
    display = 'block';
    @HostBinding('style.position')
    position = 'absolute';

    @ViewChild('tabContainer')
    tabContainer: ElementRef;

    ngAfterViewInit(): void {
    }
}
