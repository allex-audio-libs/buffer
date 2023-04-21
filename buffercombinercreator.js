function createBufferCombiner (lib, mylib) {
    'use strict';

    var myinternallib = {};

    function isUsableBuffer (thingy) {
        return (
            thingy &&
            thingy instanceof (mylib.Buffer) &&
            thingy.head
        );
    }

    function forEach (b1, b2, func) {
        var b1c, b2c; //currents for b1 and b2
        if (!lib.isFunction(func)) {
            return;
        }
        if (!(isUsableBuffer(b1) && isUsableBuffer(b2))) {
            return;
        }
        b1c = b1.head;
        b2c = b2.head;
        while (b1c && b2c) {
            func(b1c.contents, b2c.contents);
            b1c = b1c.next;
            b2c = b2c.next;
        }
    };
    myinternallib.forEach = forEach;

    function reduce (b1, b2, func, seed) {
        var b1c, b2c; //currents for b1 and b2
        var res = seed;
        if (!lib.isFunction(func)) {
            return res;
        }
        if (!(isUsableBuffer(b1) && isUsableBuffer(b2))) {
            return res;
        }
        b1c = b1.head;
        b2c = b2.head;
        while (b1c && b2c) {
            res = func(res, b1c.contents, b2c.contents);
            b1c = b1c.next;
            b2c = b2c.next;
        }
        return res;
    };
    myinternallib.reduce = reduce;

    function reduceWithGarbage (b1, b2, func, seed) {
        var reduceobj, ret;
        if (!lib.isFunction(func)) {
            return seed;
        }
        reduceobj = {
            func: func,
            result: seed
        };
        forEach(b1, b2, internalReducer.bind(null, reduceobj));
        ret = reduceobj.result;
        reduceobj = null;
        return ret;
    }
    myinternallib.reduceWithGarbage = reduceWithGarbage;

    myinternallib.multiply = function (b1, b2) {
        return reduce(b1, b2, function (res, e1, e2) {
            return res+(e1*e2);
        }, 0);
    }

    function internalReducer (reduceobj, e1, e2) {
        reduceobj.result = reduceobj.func(reduceobj.result, e1, e2);
    }

    mylib.BufferCombiner = myinternallib;
}
module.exports = createBufferCombiner;