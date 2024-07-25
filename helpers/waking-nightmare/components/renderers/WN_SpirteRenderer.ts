import WN_RendererComponent from './WN_RendererComponent';

class WN_SpriteRenderer extends WN_RendererComponent {
  sprite: HTMLImageElement;
  width: number;
  height: number;

  constructor(spritePath: string) {
    super({});

    this.sprite = new Image();
    this.height = 0;
    this.width = 0;
    this.loadSprite(spritePath);
  }

  private async loadSprite(spritePath: string): Promise<void> {
    try {
      const response = await fetch(spritePath);
      if (!response.ok) {
        throw new Error('Failed to fetch sprite');
      }
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      console.log(blob);
      console.log(imageBitmap);

      this.width = imageBitmap.width;
      this.height = imageBitmap.height;
      //this.createRenderMaterial(imageBitmap);
      this.onSpriteLoaded();
    } catch (error) {
      console.error('Error loading sprite:', error);
    }
  }

  private onSpriteLoaded = (): void => {
  }
}

export default WN_SpriteRenderer;
