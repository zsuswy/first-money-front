import {Component, HostBinding} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import {WxService} from '../../../services/wx-service.service';
import {Router} from '@angular/router';
import {WxBase} from '../../WxBase';

@Component({
    templateUrl: './personal-center.component.html',
    animations: [slideInDownAnimation],
})

export class PersonalCenterPageComponent extends WxBase {
    constructor(protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);
    }
}
