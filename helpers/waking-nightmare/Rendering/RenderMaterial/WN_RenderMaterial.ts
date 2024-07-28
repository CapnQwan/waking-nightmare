import WN_Color from '@WN/classes/math/WN_Color';
import WN_Random from '../../classes/math/WN_Random';

class WN_RenderMaterial {
  width: number;
  height: number;
  pixelBuffer: Array<Array<WN_Color>>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixelBuffer = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => WN_Random.randomColor())
    );
  }

  getImageData = (): ImageData => {
    const imageArray = new Uint8ClampedArray(this.width * this.height * 4);

    for (let y = 0, i = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++, i += 4) {
        const color = this.pixelBuffer[y][x].toRgbaArray();
        imageArray[i] = color[0];
        imageArray[i + 1] = color[1];
        imageArray[i + 2] = color[2];
        imageArray[i + 3] = color[3];
      }
    }

    return new ImageData(imageArray, this.width, this.height);
  };
}

export default WN_RenderMaterial;
