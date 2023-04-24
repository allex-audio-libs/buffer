function createBucket (lib, mylib) {
    'use strict';

    var bucketLandfill = [];

    //single linked list => every bucket knows its previous or next
    //double linked list => every bucket knows both its previous and next

    //we're implementing a double linked list, after all
    function Bucket () {
        this.prev = null;
        this.next = null;
        this.contents = null;
    }
    Bucket.prototype.destroy = function () {
        this.contents = null;
        if (this.next) {
            this.next.destroy();
        }
        this.next = null;
        this.prev = null;
        bucketLandfill.push(this);
    };
    //mylib.Bucket = Bucket;

    function produceBucket () {
        var recycledbucket = bucketLandfill.pop();
        if (recycledbucket) {
            return recycledbucket;
        }
        return new Bucket();
    }
    function newBucketFor (prev, next, contents) {
        var bckt = produceBucket();
        bckt.prev = prev;
        bckt.next = next;
        bckt.contents = contents;
        return bckt;
    }
    mylib.newBucketFor = newBucketFor;

    function recycleBucket (bckt) {
        bckt.next = null;
        bckt.prev = null;
        bckt.destroy();
    }
    mylib.recycleBucket = recycleBucket;

    function produceBuckets (length, contents) {
        var intrmdt = [], i;
        for (i=0; i<length; i++) {
            intrmdt.push(newBucketFor(null, null, contents));
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