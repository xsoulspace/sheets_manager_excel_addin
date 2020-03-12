
export class MaintainerStatuses implements MatrixElementInterface.maintainerStatuses{

    constructor(
        public areSheetsHaveNumeration: boolean = false,
        public isNumerationBroken: boolean = false,
        public shouldWeRestoreNumeration: boolean = true
    ){ }

    resetToDefault(){
        this.areSheetsHaveNumeration = false
        this.isNumerationBroken = false
        this.shouldWeRestoreNumeration = true
    }
}