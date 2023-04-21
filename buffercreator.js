function createBuffer (lib, mylib) {
    'use strict';

    //single linked list => every bucket knows its previous or next
    //double linked list => every bucket knows both its previous and next

    //we're implementing a double linked list, after all

    function Bucket (prev, next, contents) {
        this.prev = prev;
        this.next = next;
        this.contents = contents;
    }
    Bucket.prototype.destroy = function () {
        this.contents = null;
        if (this.next) {
            this.next.destroy();
        }
        this.next = null;
        this.prev = null;
    };

    function produceBuckets (length, contents) {
        var intrmdt = [], i;
        for (i=0; i<length; i++) {
            intrmdt.push(new Bucket(null, null, contents));
        }
        for (i=1; i<length; i++) {
            intrmdt[i].prev = intrmdt[i-1];
        }
        for (i=0; i<length-1; i++) {
            intrmdt[i].next = intrmdt[i+1];
        }
        return intrmdt[0];
    }


    function Buffer (length) {
        if (!lib.isNumber(length)) {
            throw new lib.Error('NO_LENGTH', this.constructor.name+' must receive a length (Number) in its constructor');
        }
        this.head = produceBuckets(length, this.defaultContents());
        this.length = length;
        this.last = null;
        this.setLast();
    }
    Buffer.prototype.destroy = function () {
        if (this.head) {
            this.head.destroy();
        }
        this.head = null;
        this.length = null;
    };
    Buffer.prototype.defaultContents = function () {
    };
    Buffer.prototype.push = function (contents) {
        var newlast;
        this.last.contents = contents;
        this.last.next = this.head;
        this.last.prev.next = null;
        this.head.prev = this.last;
        newlast = this.last.prev;
        this.head = this.last;
        this.head.prev = null;
        this.last = newlast;
    };

    Buffer.prototype.setLast = function () {
        this.traverse(this.lastSetter.bind(this));
    };
    Buffer.prototype.lastSetter = function (elem, index, buffer) {
        this.last = elem;
    };

    //Array method clones
    Buffer.prototype.forEach = function (func) {
        this.traverse(func);
    };
    //endof Array method clones

    //for this method I would like noone to be capable of using
    //except the Buffer class
    Buffer.prototype.traverse = function (func) {
        var currbucket = this.head, i=0;
        while (currbucket) {
            func(currbucket, i, this);
            i++;
            currbucket = currbucket.next;
        }
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