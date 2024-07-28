import Sprite from '@WN/classes/graphics/Sprite';
import WN_GameObject from '@WN/GameObjects/GameObject/WN_GameObject';
import WN_RendererComponent from './WN_RendererComponent';

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

  render = () => this.sprite.getImageData();
}

export default WN_SpriteRenderer;
