function createBaseBuffer (lib, mylib) {
    'use strict';

    function BaseBuffer () {
        this.head = null;
        this.length = 0;
        this.tail = null;
        this.tailSetterer = tailSetter.bind(this);
    }
    BaseBuffer.prototype.destroy = function () {
        this.tailSetterer = null;
        this.tail = null;
        this.length = null;
        if (this.head) {
            this.head.destroy();
        }
        this.head = null;
    };
    BaseBuffer.prototype.setTail = function () {
        this.traverse(this.tailSetterer);
    };

    //Array method clones
    BaseBuffer.prototype.forEach = function (func) {
        this.traverse(func);
    };
    //endof Array method clones

    //for this method I would like noone to be capable of using
    //except the Buffer class
    BaseBuffer.prototype.traverse = function (func) {
        var currbucket = this.head, i=0;
        while (currbucket) {
            func(currbucket, i, this);
            i++;
            currbucket = currbucket.next;
        }
    };

    function tailSetter (elem, index, buffer) {
        this.tail = elem;
    };

    mylib.BaseBuffer = BaseBuffer;
}
module.exports = createBaseBuffer;