function createBuffer (lib, mylib) {
    'use strict';

    var Bucket = mylib.Bucket;
    var BaseBuffer = mylib.BaseBuffer;

    function Buffer (length) {
        BaseBuffer.call(this);
        if (!lib.isNumber(length)) {
            throw new lib.Error('NO_LENGTH', this.constructor.name+' must receive a length (Number) in its constructor');
        }
        this.head = mylib.produceBuckets(length, this.defaultContents());
        this.length = length;
        this.tail = null;
        this.setTail();
    }
    lib.inherit(Buffer, BaseBuffer);
    Buffer.prototype.destroy = function () {
        BaseBuffer.prototype.destroy.call(this);
    };
    Buffer.prototype.defaultContents = function () {
    };
    Buffer.prototype.push = function (contents) {
        var newtail;
        this.tail.contents = contents;
        this.tail.next = this.head;
        this.tail.prev.next = null;
        this.head.prev = this.tail;
        newtail = this.tail.prev;
        this.head = this.tail;
        this.head.prev = null;
        this.tail = newtail;
    };



    function NumericBuffer (length) {
        Buffer.call(this, length);
    }
    lib.inherit(NumericBuffer, Buffer);
    NumericBuffer.prototype.defaultContents = function () {
        return 0;
    };

    mylib.Buffer = Buffer;
    mylib.NumericBuffer = NumericBuffer;
}
module.exports = createBuffer;