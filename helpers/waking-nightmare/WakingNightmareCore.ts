import Sprite from './classes/graphics/Sprite';
import WN_Time from './classes/math/WN_Time';
import WN_SpriteRenderer from './components/renderers/WN_SpirteRenderer';
import WN_EntityManager from './EntityManager/WN_EntityManager';
import WN_GameObject from './GameObjects/GameObject/WN_GameObject';
import WN_Camera from './Rendering/WN_Camera';
import WN_Canvas from './Rendering/WN_Canvas';
import WN_Renderer from './Rendering/WN_Renderer';
import WN_SceneManager from './SceneManager/WN_SceneManager';

interface constructionProps {
  isDebugging?: boolean;
  scene?: Array<WN_GameObject>;
}

class WNCore {
  isDebugging: boolean;
  time: WN_Time;
  canvas: WN_Canvas;
  entityManager: WN_EntityManager;
  sceneManager: WN_SceneManager;
  renderer: WN_Renderer;

  constructor({ isDebugging = true, scene = [] }: constructionProps) {
    this.isDebugging = isDebugging;

    this.time = new WN_Time();
    this.canvas = new WN_Canvas();
    this.sceneManager = new WN_SceneManager({ core: this });
    this.entityManager = new WN_EntityManager();
    this.renderer = new WN_Renderer(this.entityManager);

    this.addTestingObjects();

    requestAnimationFrame(this.update);

    this.time.update();
  }

  update = () => {
    this.canvas.clearCanvas();
    this.renderer.render();

    if (this.isDebugging) {
      this.time.renderPerformance(this.canvas);
    }

    requestAnimationFrame(this.update);
  };

  addTestingObjects = () => {
    const baseGameObject = new WN_GameObject({
      id: 0,
      name: 'MainCamera',
      entityManager: this.entityManager,
    });

    const CameraComponent = new WN_Camera({
      parent: baseGameObject,
      output: this.canvas,
      fieldOfView: 45,
      near: 1,
      far: 100,
    });

    baseGameObject.addComponent(CameraComponent);
    this.entityManager.addEntity(baseGameObject);

    const spriteGameObject = new WN_GameObject({
      id: 1,
      name: 'Sprite',
      entityManager: this.entityManager,
    });
    const sprite = new Sprite({ spriteUrl: '/images/Enviroment Tile 1.png' });
    const spriteRenderer = new WN_SpriteRenderer({
      parent: spriteGameObject,
      sprite: sprite,
    });

    spriteGameObject.addComponent(spriteRenderer);
    this.entityManager.addEntity(spriteGameObject);
  };
}

export default WNCore;
