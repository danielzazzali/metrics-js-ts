import { fun1, fun2, fun3 } from './subdir/fileB'

function call1(): void {
    fun1()
}

const call2 = function (): void {
    fun2()
}

const call3 = (): void => {
    fun3()
}