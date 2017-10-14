import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tip-message',
    templateUrl: './tip-message.component.html',
    styleUrls: ['./tip-message.component.css']
})
export class TipMessageComponent implements OnInit {

    @Input()
    isShow: boolean = false;

    @Input()
    message: string;


    constructor() {
    }

    ngOnInit() {
    }


    closeTipMessage() {
        this.isShow = false;
    }
}
