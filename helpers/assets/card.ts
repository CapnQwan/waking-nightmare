import { MonoBehaviour } from '../waking-nightmare/waking-nightmare_core/gameObject/behaviours/monoBehaviour';
import { Material } from '../waking-nightmare/waking-nightmare_core/rendering/classes/material';
import { generateCube } from '../waking-nightmare/waking-nightmare_core/rendering/classes/meshes/cube';
import { Shader } from '../waking-nightmare/waking-nightmare_core/rendering/classes/shader';
import { RendererComponent } from '../waking-nightmare/waking-nightmare_core/rendering/components/rendererComponent';
import { Vector3 } from '../waking-nightmare/waking-nightmare_core/utils/math/vectors/vector3';
import { time } from '../waking-nightmare/waking-nightmare_core/utils/time';
import { Input } from '../waking-nightmare/waking-nightmare_inputs/inputs';
import {
  getVertexShader,
  getFragmentShader,
} from '../webGL/webGLShadersHelper';
import { CardRank, CardSuit } from './constants/cards';
import cardFragmentShader from './shaders/cardFragmentShader.glsl';
import cardVertexShader from './shaders/cardVertexShader.glsl';

export class Card extends MonoBehaviour {
  rank: CardRank;
  suit: CardSuit;

  constructor(rank: CardRank, suit: CardSuit) {
    super({});

    this.rank = rank;
    this.suit = suit;
  }

  onAwake(): void {
    if (this.parent) {
      const cardShader = new Shader({
        vertexShader: getVertexShader(cardVertexShader),
        fragmentShader: getFragmentShader(cardFragmentShader),
      });
      const cardMaterial = new Material({ shader: cardShader });
      cardMaterial.bindTexture('uTexture', '/assets/1.png', 0);
      cardMaterial.setUniform('uTextureScale', new Float32Array([0.077, 0.25]));
      cardMaterial.setUniform(
        'uTextureOffset',
        new Float32Array([this.rank * 0.077, this.suit * 0.25])
      );

      if (this.transform) {
        this.transform.position.x = (this.rank - 7) * 1.6;
        this.transform.position.y = (this.suit * 1.56 - 2.34) * 1.6;
        this.transform.scale.x = 1.5;
        this.transform.scale.y = 1.5;
        this.transform.position.z = -10;
        /**
         * @todo Implement proper rotation
         * @note Also the current implementation of the rotatePitch method is incorrect
         * as it seems to use radians instead of degrees.
         */
        this.transform.rotation.rotatePitch(3.14);
      }

      this.parent.addComponent(
        new RendererComponent({
          mesh: generateCube(1, 1.56, 0.01),
          material: cardMaterial,
        })
      );
    }
  }

  onUpdate(): void {
    if (Input.isMouseButtonPressed(0) && this.transform) {
      this.transform.position.x += Input.mouseDelta.x * time.deltaTime;
      this.transform.position.y += Input.mouseDelta.y * time.deltaTime;

      this.transform.rotation.rotateRoll(Input.mouseDelta.y * time.deltaTime);
      this.transform.rotation.rotateYaw(-Input.mouseDelta.x * time.deltaTime);
    }
  }
}
