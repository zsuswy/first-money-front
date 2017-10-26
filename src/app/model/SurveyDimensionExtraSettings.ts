export class SurveyDimensionExtraSettings {
    constructor(public isShowSumChart?: number,        // 是否显示汇总图
                public isShowSubChart?: number,        // 是否显示维度的图
                public sumChartType?: number,           // 汇总图类型
                public sumChartTitle?: string,          // 汇总图标题
                public sumChartFootScript?: string,     // 汇总图注脚
                public subChartType?: number,           // 子维度图类型
                public subChartTitle?: string,          // 子维度图标题
                public subChartFootScript?: string,     // 子维度图注脚
                public subDimensionLimitCnt?: number    // 显示几个子维度
    ) {
    }
}
