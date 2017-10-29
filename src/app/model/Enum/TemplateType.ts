export enum TemplateType {
    /**
     * 只有一个维度，结果不需要显示图表
     */
    SINGLE_DIMENSION = 1,

    /**
     * 有一个默认维度，全部都是子维度
     * */
    MULTIPLE_WITH_SINGLE_FIRST_LEVEL = 2,


    /**
     * 没有默认维度，全部都是子维度
     * */
    MULTIPLE_WITH_NO_FIRST_LEVEL = 3,

}