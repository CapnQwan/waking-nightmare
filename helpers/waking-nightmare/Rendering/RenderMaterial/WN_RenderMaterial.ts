import WN_Color from '@WN/classes/math/WN_Color';
import WN_Random from '@WN/classes/math/WN_Random';
import WN_PixelBuffer from '../PixelBuffer/WN_PixelBuffer';

class WN_RenderMaterial {
  width: number;
  height: number;
  pixelBuffer: WN_PixelBuffer;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixelBuffer = new WN_PixelBuffer({ width, height });
  }

  getImageData = (): ImageData => {
    return new ImageData(this.pixelBuffer.buffer, this.width, this.height);
  };

  loadPixelBuffer = (pixelBuffer: WN_PixelBuffer) => {
    this.pixelBuffer = pixelBuffer;
  };
}

export default WN_RenderMaterial;
