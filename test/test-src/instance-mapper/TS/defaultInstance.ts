import { AdvancedCalculator } from './instances'

export default class {
    private fooAdvancedCalculator: AdvancedCalculator;
    private barAdvancedCalculator: AdvancedCalculator;
    foo () {
        this.fooAdvancedCalculator = new AdvancedCalculator()
        const fooAdvCalc = new AdvancedCalculator()
        let fooTempAdvCalc = new AdvancedCalculator()
    }

    bar = () => {
        this.barAdvancedCalculator = new AdvancedCalculator()
        const barAdvCalc = new AdvancedCalculator()
        let barTempAdvCalc = new AdvancedCalculator()
    }
    baz = function () {
        this.bazAdvancedCalculator = new AdvancedCalculator()
        const bazAdvCalc = new AdvancedCalculator()
        let bazTempAdvCalc = new AdvancedCalculator()
    }
    dummy = 1
}