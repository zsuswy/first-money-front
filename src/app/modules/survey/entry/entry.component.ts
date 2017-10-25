import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

    constructor(protected route: ActivatedRoute, protected router: Router) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            if (params.has('path')) {
                this.router.navigate([params.get('path')], {queryParamsHandling: 'merge'});
            } else {
                this.router.navigate(['/home']);
            }
        });
    }
}
