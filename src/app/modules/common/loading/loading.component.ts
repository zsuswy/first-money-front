import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    @Input()
    public isShowLoading: boolean = true;

    @Input()
    public message: string = '正在加载...';

    dt_start: number;
    dt_finish: number;

    timeout_handler: any;

    constructor() {
    }

    ngOnInit() {
    }

    @Output()
    public loadStart() {
        this.dt_start = (new Date()).valueOf();
        this.isShowLoading = true;
    }

    @Output()
    public loadComplete() {
        this.dt_finish = (new Date()).valueOf();

        // 有手动设置开始
        if (this.dt_start > 1) {
            // 计算时间差
            let span = this.dt_finish - this.dt_start;

            // 如果时间小于1毫秒
            if (span < 100) {
                this.delayClose(500); // 延迟一秒关闭
            } else {
                this.isShowLoading = false;
            }
        } else {
            this.delayClose(500); // 延迟0.5秒关闭
        }
        // 重置开始时间
        this.dt_start = 0;

    }

    private delayClose(timespan: number) {
        let ng_this = this;
        this.timeout_handler = setTimeout(() => {
            ng_this.isShowLoading = false;
        }, timespan);
    }
}
