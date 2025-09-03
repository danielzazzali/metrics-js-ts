// Valid ClassDeclaration
class Calculator {
    private fooAdvancedCalculator: AdvancedCalculator;
    protected barAdvancedCalculator: AdvancedCalculator;
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

// TODO: Cada clase debe hacer le new a la clase siguiente

// Valid ClassDeclaration
class AdvancedCalculator extends Calculator {
    private Calculator: AdvancedCalculator;
    foo () {
        this.Calculator = new AdvancedCalculator()
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

// Valid ClassDeclaration (Using identifier Foo as name of the class)
export default class FooClass {
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

// Valid ClassExpression
const Logger = class {
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

// Valid ClassExpression
const myCollection = {
    Printer: class {
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
}

// Valid ClassExpression
const object = {
    ['LiteralClassName']: class {
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
};


// Invalid ClassDeclaration
(() => { class NotCounted {} })()

// Invalid ClassDeclaration
class SuperCalculator extends class {} {}

// Invalid ClassExpression
const SuperCalc = class Hello extends class {} {};

// Invalid ClassExpression
(() => { const Ignore = class IgnoredClass extends class {} {} })()

