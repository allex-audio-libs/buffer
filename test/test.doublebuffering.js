_writingMethod = 'Int16BE';

_counter = 0;

function bufferReady (buf) {
    //console.log('full buffer ready', buf.length);
    _counter++;
}

describe('Test Double Buffering', function () {
    it('Load Lib', function () {
        return setGlobal('Lib', require('..')(execlib));
    });
    it('Make new DoubleBuffer without length should throw', function () {
        expect(function() { 
            return new Lib.DoubleNodeJSBuffer(); 
        }).to.throw(/must be a Number/);
    });
    it('Make new Buffer with string length should throw', function () {
        expect(function() { 
            return new Lib.DoubleNodeJSBuffer('5'); 
        }).to.throw(/must be a Number/);
    });
    it('Make new Buffer without a bufferreadyfunc should throw', function () {
        expect(function() { 
            return new Lib.DoubleNodeJSBuffer(5); 
        }).to.throw(/must be a Function/);
    });
    it('Make new Buffer', function () {
        this.timeout(1e7);
        return setGlobal('MyBuffer', new Lib.DoubleNodeJSBuffer(4, bufferReady));
    });
    it('Add 5', function () {
        _counter=0;
        MyBuffer.add(_writingMethod, 5);
    });
    it('Add 5 Again', function () {
        MyBuffer.add(_writingMethod, 5);
        expect(_counter).to.equal(1);
    });
    it('Add 5', function () {
        MyBuffer.add(_writingMethod, 5);
    });
    it('Add 5 Again', function () {
        MyBuffer.add(_writingMethod, 5);
        expect(_counter).to.equal(2);
    });
    it('Add 5', function () {
        MyBuffer.add(_writingMethod, 5);
    });
    it('Add 5 Again', function () {
        MyBuffer.add(_writingMethod, 5);
        expect(_counter).to.equal(3);
    });
});