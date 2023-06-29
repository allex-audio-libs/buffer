function createDoubleNodeJSBuffer (lib, mylib) {
    'use strict';

    var _writers = {
        'Int16BE': {
            checker: 'isNumber',
            size: 2
        },
        'Int16LE': {
            checker: 'isNumber',
            size: 2
        },
        'UInt16BE': {
            checker: 'isNumber',
            size: 2
        },
        'UInt16LE': {
            checker: 'isNumber',
            size: 2
        },
        'DoubleLE': {
            checker: 'isNumber',
            size: 8
        },
        'DoubleBE': {
            checker: 'isNumber',
            size: 8
        },
        'FloatLE': {
            checker: 'isNumber',
            size: 4
        },
        'FloatBE': {
            checker: 'isNumber',
            size: 4
        }
    }

    function DoubleNodeJSBuffer (size, bufferreadyfunc) { //the problem is that size has to fit written thingies exactly
        if (!(lib.isNumber(size) && size>0)) {
            throw new lib.Error('NOT_A_NUMBER', 'size provided in constructor must be a Number');
        }
        if (!lib.isFunction(bufferreadyfunc)) {
            throw new lib.Error('NOT_A_FUNCTION', 'bufferreadyfunc provided in constructor must be a Function');
        }
        this.buffers = [
            Buffer.allocUnsafe(size),
            Buffer.allocUnsafe(size)
        ];
        this.activeBuffer = 0;
        this.cursor = 0;
        this.bufferReadyFunc = bufferreadyfunc;
        
        this.lastswitch = 0;
        this.dur = 0;
        this.speed = 0;
    }
    DoubleNodeJSBuffer.prototype.destroy = function () {
        this.bufferReadyFunc = null;
        this.cursor = null;
        this.activeBuffer = null;
        this.buffers = null;
    };

    DoubleNodeJSBuffer.prototype.add = function (writername, thingy) {
        var writerobj, buf;
        if (!this.buffers) {
            return;
        }
        writerobj = _writers[writername];
        if (!writerobj) {
            throw new lib.Error('UNSUPPORTED_WRITER_NAME', writername+' is an unsupported writername');
        }
        if (lib.isFunction(lib[writerobj.checker])) {
            if (!lib[writerobj.checker](thingy)) {
                throw new lib.Error('TYPE_MISMATCH', thingy+' '+writerobj.checker+' NOT');
            }
        }
        buf = this.buffers[this.activeBuffer];
        this.checkSize(buf, writername.size); //will throw if cannot fit
        this.cursor = buf['write'+writername](thingy, this.cursor);
        if (this.cursor >= buf.length) {
            this.swapBuffers();
        }
    };

    DoubleNodeJSBuffer.prototype.checkSize = function (buf, size) {
        if (size > buf.length-this.cursor) {
            throw new lib.Error('WONT_FIT', 'Thingy will not fit into buffer, '+buf.length-this.cursor+' remaining bytes will not fit '+size+' bytes.');
        }
    };

    DoubleNodeJSBuffer.prototype.swapBuffers = function () {
        var buf = this.buffers[this.activeBuffer];
        this.activeBuffer = (this.activeBuffer+1)%2;
        this.cursor = 0;
        this.bufferReadyFunc(buf);
        if (this.lastswitch>0) {
            this.dur = Date.now()-this.lastswitch;
            this.speed = buf.length/(this.dur);
        }
        this.lastswitch = Date.now();
    };

    mylib.DoubleNodeJSBuffer = DoubleNodeJSBuffer;
}
module.exports = createDoubleNodeJSBuffer