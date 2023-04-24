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
        var b = mylib.newBucketFor(this.tail, null, contents);
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
        var t = this.tail, ret;
        if (!t) {
            return null; //just to be sure, could've returned t
        }
        ret = t.contents;
        this.tail = t.prev;
        this.tail.next = null;
        this.length--;
        mylib.recycleBucket(t);
        return ret;
    };
    DynaBuffer.prototype.unshift = function (contents) {
        var b = mylib.newBucketFor(null, this.head, contents);
        this.length ++;
        if (!this.head) {
            this.head = b;
            this.tail = b;
            return;
        }
        this.head.prev = b;
        this.head = b;

    };
    DynaBuffer.prototype.shift = function () {
        var h = this.head, ret;
        if (!h) {
            return null; //just to be sure, could've returned t
        }
        ret = h.contents;
        this.head = h.next;
        this.head.prev = null;
        this.length--;
        mylib.recycleBucket(h);
        return ret;
    };

    mylib.DynaBuffer = DynaBuffer;
}
module.exports = createDynaBuffer;