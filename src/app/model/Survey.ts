/**
 * Created by sunwuyang on 17/7/29.
 */
export class Survey {
    constructor(public id?: number,
                public title?: string,
                public description?: string,
                public shortDescription?: string,
                public createBy?: string,
                public createTime?: Date,
                public classId?: number,
                public status?: number,
                public questionCnt?: number,
                public estimateMinutes?: number,
                public price?: number,
                public orgPrice?: number,
                public image?: string,
                public isNeedSex?: number,
                public testedCnt?: number,
                public resultTemplate?: string,
                public isHot?: number,
                public isNew?: number,
                public isSuper?: number,
                public resultTemplateParam?: string) {
    }
}
