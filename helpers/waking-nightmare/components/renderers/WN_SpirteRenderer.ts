import WN_RendererComponent from './WN_RendererComponent';

class WN_SpriteRenderer extends WN_RendererComponent {
  sprite: sprite;
  width: number;
  height: number;

  constructor(sprite: sprite) {
    super({});
    this.sprite = sprite;
    this.height = sprite.length;
    this.width = sprite[0].length;
  }
}

export default WN_SpriteRenderer;
