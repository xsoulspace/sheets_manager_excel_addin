
export class MaintainerStatuses implements MatrixElementInterface.maintainerStatuses{
    default: MaintainerStatuses = {} as  MaintainerStatuses
    constructor(
        public areSheetsHaveNumeration: boolean = false,
        public isNumerationBroken: boolean = false,
        public shouldWeRestoreNumeration: boolean = true
    ){ 
        this.default.areSheetsHaveNumeration = areSheetsHaveNumeration
        this.default.isNumerationBroken = isNumerationBroken
        this.default.shouldWeRestoreNumeration = shouldWeRestoreNumeration

    }

    resetToDefault(){
        this.areSheetsHaveNumeration = this.default.areSheetsHaveNumeration
        this.isNumerationBroken = this.default.isNumerationBroken
        this.shouldWeRestoreNumeration = this.default.shouldWeRestoreNumeration
    }
}