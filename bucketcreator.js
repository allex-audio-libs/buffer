function createBucket (lib, mylib) {
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

    mylib.Bucket = Bucket;

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
    mylib.produceBuckets = produceBuckets;
}
module.exports = createBucket;