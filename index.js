function createAudioBufferLib (execlib) {
    'use strict';

    var mylib = {};

    require('./buffercreator')(execlib.lib, mylib);
    require('./buffercombinercreator')(execlib.lib, mylib);
    require('./doublenodejsbuffercreator')(execlib.lib, mylib);

    return mylib;
}
module.exports = createAudioBufferLib;