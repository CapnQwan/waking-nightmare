import Sprite from '@WN/classes/graphics/Sprite';
import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';
import WN_RendererComponent from './RendererComponent';
import Matrix4x4 from '@/helpers/waking-nightmare/utils/math/Matrix/Matrix4x4';
import PixelBuffer from '@/helpers/waking-nightmare/Rendering/PixelBuffer/PixelBuffer';

type spriteRendererConstructor = {
  parent: GameObject;
  sprite: Sprite;
};

class WN_SpriteRenderer extends WN_RendererComponent {
  sprite: Sprite;

  constructor({ parent, sprite }: spriteRendererConstructor) {
    super({ parent });
    this.sprite = sprite;
  }

  render = (pixelBuffer: PixelBuffer, mvpMatrix: Matrix4x4) => {
    if (
      !this.sprite.hasSpriteLoaded ||
      this.sprite.width === undefined ||
      this.sprite.height === undefined
    ) {
      return;
    }

    const worldPosition = this.transform.position;

    const spriteWidth = this.sprite.width;
    const spriteHeight = this.sprite.height;

    for (let y = 0; y < spriteHeight; y++) {
      for (let x = 0; x < spriteWidth; x++) {
        const bufferX = Math.round(worldPosition.x + x - spriteWidth / 2);
        const bufferY = Math.round(worldPosition.y + y - spriteHeight / 2);

        const color = this.sprite.getPixel(x, y);

        const depth = worldPosition.z;
        if (
          bufferX >= 0 &&
          bufferX < pixelBuffer.width &&
          bufferY >= 0 &&
          bufferY < pixelBuffer.height
        ) {
          const index = bufferY * pixelBuffer.width + bufferX * 4;
          if (
            pixelBuffer.depth[index] === undefined ||
            depth < pixelBuffer.depth[index]
          ) {
            pixelBuffer.addPixel(bufferX, bufferY, color, depth);
          }
        }
      }
    }
  };
}

export default WN_SpriteRenderer;
