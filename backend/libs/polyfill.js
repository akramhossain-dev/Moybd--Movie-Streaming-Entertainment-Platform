import buffer from 'node:buffer';

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = function SlowBuffer() {};
  buffer.SlowBuffer.prototype = {};
}
