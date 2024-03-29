

describe('Test Buffer', function () {
    it('Load Lib', function () {
        return setGlobal('Lib', require('..')(execlib));
    });
    it('Make new Buffer', function () {
        this.timeout(1e7);
        return setGlobal('MyBuffer', new Lib.DynaBuffer());
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
    it('Pop one', function () {
        expect(MyBuffer.pop()).to.equal(100);
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
    it('Push 100 again', function () {
        MyBuffer.push(100);
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
    it('Shift one', function () {
        expect(MyBuffer.shift()).to.equal(5);
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
    it('Unshift 5 again', function () {
        MyBuffer.unshift(5);
    });
    it('For each console.log', function () {
        MyBuffer.forEach(console.log.bind(console));
    });
});