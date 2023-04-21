

describe('Test Buffer', function () {
    it('Load Lib', function () {
        return setGlobal('Lib', require('..')(execlib));
    });
    it('Make new Buffer without length should throw', function () {
        expect(function() { 
            return new Lib.Buffer(); 
        }).to.throw(/must receive/);
    });
    it('Make new Buffer with string length should throw', function () {
        expect(function() { 
            return new Lib.Buffer('5'); 
        }).to.throw(/must receive/);
    });
    it('Make new Buffer', function () {
        this.timeout(1e7);
        return setGlobal('MyBuffer', new Lib.NumericBuffer(10));
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
    it('Push 5', function () {
        MyBuffer.push(5);
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
    it('Push 10 times', function () {
        for (var i=0; i<10; i++) {
            MyBuffer.push((i+1)**2);
        }
    })
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
});