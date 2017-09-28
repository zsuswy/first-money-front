import {Component, HostBinding} from '@angular/core';
import {slideInDownAnimation} from '../../animations';

@Component({
    templateUrl: './personal-center.component.html',
    animations: [slideInDownAnimation],
})

export class PersonalCenterPageComponent {
    @HostBinding('@routeAnimation')
    routeAnimation = true;
    @HostBinding('style.display')
    display = 'block';
    @HostBinding('style.position')
    position = 'absolute';

}
