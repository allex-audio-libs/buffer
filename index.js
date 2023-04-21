function createAudioBufferLib (execlib) {
    'use strict';

    var mylib = {};

    require('./bucketcreator')(execlib.lib, mylib);
    require('./basebuffercreator')(execlib.lib, mylib);
    require('./buffercreator')(execlib.lib, mylib);
    require('./buffercombinercreator')(execlib.lib, mylib);
    require('./doublenodejsbuffercreator')(execlib.lib, mylib);

    require('./dynabuffercreator')(execlib.lib, mylib);
    return mylib;
}
module.exports = createAudioBufferLib;