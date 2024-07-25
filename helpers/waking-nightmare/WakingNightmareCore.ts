import WN_Time from './classes/math/WN_Time';
import WN_SpriteRenderer from './components/renderers/WN_SpirteRenderer';
import WN_GameObject from './GameObjects/GameObject/WN_GameObject';
import Canvas from './Rendering/Canvas';
import RenderMaterial from './Rendering/RenderMaterial/RenderMaterial';
import SceneManager from './SceneManager/SceneManager';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<WN_GameObject>;
}

class WNCore {
  isDebugging: boolean;
  time: WN_Time;
  canvas: Canvas;
  sceneManager: SceneManager;
  spriteRenderer: WN_SpriteRenderer;
  renderMat: RenderMaterial;

  constructor({ isDebugging = true, scene = [] }: constructionProps) {
    this.isDebugging = isDebugging;

    this.time = new WN_Time();
    this.canvas = new Canvas();
    this.sceneManager = new SceneManager({ core: this });

    this.renderMat = new RenderMaterial(200, 200);
    this.spriteRenderer = new WN_SpriteRenderer('/images/Enviroment Tile 1.png')

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.canvas.clearCanvas();

    this.renderMat = new RenderMaterial(200, 200);
    this.canvas.renderImageData(this.renderMat.getImageData());

    if (this.isDebugging) {
      this.time.renderPerformance(this.canvas);
    }

    requestAnimationFrame(this.update);
  };
}

export default WNCore;
