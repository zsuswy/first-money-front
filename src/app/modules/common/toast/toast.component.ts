import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
    public isShow: boolean = false;

    @Input()
    public message: string = '';

    timeout_handler: any;

    constructor() {
    }

    public show() {
        console.log('show()');
        this.isShow = true;
        this.delayClose(2000);
    }

    ngOnInit() {
    }

    private delayClose(timespan: number) {
        let ng_this = this;
        this.timeout_handler = setTimeout(() => {
            ng_this.isShow = false;
        }, timespan);
    }
}
