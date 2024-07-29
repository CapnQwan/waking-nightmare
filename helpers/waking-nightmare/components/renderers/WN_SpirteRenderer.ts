import Sprite from '@WN/classes/graphics/Sprite';
import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_RendererComponent from './WN_RendererComponent';
import Matrix4x4 from '@WN/classes/math/Matrix/Matrix4x4';
import WN_PixelBuffer from '@WN/Rendering/PixelBuffer/WN_PixelBuffer';

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

  render = (pixelBuffer: WN_PixelBuffer, viewMatrix: Matrix4x4) => {
    console.log(
      this.transform.position.x,
      this.transform.position.y,
      this.transform.position.z
    );
    console.log(viewMatrix);
    this.sprite.getImageData();
  };
}

export default WN_SpriteRenderer;
