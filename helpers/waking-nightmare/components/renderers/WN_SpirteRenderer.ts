import Sprite from '@WN/classes/graphics/Sprite';
import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_RendererComponent from './WN_RendererComponent';
import Matrix4x4 from '@WN/classes/math/Matrix/Matrix4x4';
import WN_PixelBuffer from '@WN/Rendering/PixelBuffer/WN_PixelBuffer';
import Vector3 from '../../classes/math/Vectors/Vector3';

type spriteRendererConstructor = {
  parent: WN_GameObject;
  sprite: Sprite;
};

class WN_SpriteRenderer extends WN_RendererComponent {
  sprite: Sprite;

  constructor({ parent, sprite }: spriteRendererConstructor) {
    super({ parent });
    this.sprite = sprite;
  }

  render = (pixelBuffer: WN_PixelBuffer, mvpMatrix: Matrix4x4) => {
    const transformedPosition = mvpMatrix.multiplyVector(new Vector3(
      this.transform.position.x,
      this.transform.position.y,
      this.transform.position.z
    ));

    if (this.sprite.width === undefined || this.sprite.height === undefined) {
      return;
    }

    const spriteWidth = this.sprite.width;
    const spriteHeight = this.sprite.height;

    for (let y = 0; y < spriteHeight; y++) {
      for (let x = 0; x < spriteWidth; x++) {
        const bufferX = Math.round(transformedPosition.x + x - spriteWidth / 2);
        const bufferY = Math.round(transformedPosition.y + y - spriteHeight / 2);

        const color = this.sprite.getPixel(x, y);

        const depth = transformedPosition.z;
        if (bufferX >= 0 && bufferX < pixelBuffer.width && bufferY >= 0 && bufferY < pixelBuffer.height) {
          const index = bufferY * pixelBuffer.width + bufferX;
          if (pixelBuffer.depth[index] === undefined || depth < pixelBuffer.depth[index]) {
            pixelBuffer.addPixel(bufferX, bufferY, color, depth);
          }
        }
      }
    }

    this.sprite.getImageData();
  };
}

export default WN_SpriteRenderer;
