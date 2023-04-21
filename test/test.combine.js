function fillWithConsecutiveNumbers (buff, start, step) {
    var curr = buff.head, val;
    val = start;
    while (curr) {
        curr.contents = val;
        val += step;
        curr = curr.next;
    }
}

describe('Test Buffer Combination', function () {
    it('Load Lib', function () {
        return setGlobal('Lib', require('..')(execlib));
    });
    it('Create Buffer1', function () {
        return setGlobal('B1', new Lib.NumericBuffer(10));
    });
    it('Create Buffer2', function () {
        return setGlobal('B2', new Lib.NumericBuffer(15));
    });
    it('Combine forEach', function () {
        return Lib.BufferCombiner.forEach(B1, B2, console.log.bind(console));
    });
    it('Fill Buffers with consecutive numbers', function() {
        fillWithConsecutiveNumbers(B1, 1, 1);
        fillWithConsecutiveNumbers(B2, 1, 1);
    });
    it('Combine forEach', function () {
        return Lib.BufferCombiner.forEach(B1, B2, console.log.bind(console));
    });
    it('Reduce with multplication', function () {
        var result = Lib.BufferCombiner.reduce(B1, B2, function (res, e1, e2) {
            return res+(e1*e2);
        }, 0);
        expect(result).to.equal(385);
    });
    it('ReduceWithGarbage with multplication', function () {
        var result = Lib.BufferCombiner.reduceWithGarbage(B1, B2, function (res, e1, e2) {
            return res+(e1*e2);
        }, 0);
        expect(result).to.equal(385);
    });
    it('Multiply', function () {
        var result = Lib.BufferCombiner.multiply(B1, B2);
        expect(result).to.equal(385);
    });
});