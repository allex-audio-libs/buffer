function createDynaBuffer (lib, mylib) {
    'use strict';

    var BaseBuffer = mylib.BaseBuffer;

    function DynaBuffer () {
        BaseBuffer.call(this);
    }
    lib.inherit(DynaBuffer, BaseBuffer);
    DynaBuffer.prototype.destroy = function () {
        BaseBuffer.prototype.destroy.call(this);
    };

    DynaBuffer.prototype.push = function (contents) {
        var b = new mylib.Bucket(this.head, null, contents);
        this.length ++;
        if (!this.head) {
            this.head = b;
            this.tail = b;
            return;
        }
        this.tail.next = b;
        this.tail = b;
    };
    DynaBuffer.prototype.pop = function () {

    };
    DynaBuffer.prototype.unshift = function (contents) {

    };
    DynaBuffer.prototype.shift = function () {

    };

    mylib.DynaBuffer = DynaBuffer;
}
module.exports = createDynaBuffer;