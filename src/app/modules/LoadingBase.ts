import {ElementRef, ViewChild} from '@angular/core';

export class LoadingBase {
    @ViewChild("loading")
    protected loading: ElementRef;

    protected loadStart() {
        this.loading.nativeElement.style.display = 'block';
    }

    protected loadComplete() {
        this.loading.nativeElement.style.display = 'none';

    }
}