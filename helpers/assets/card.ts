import { MonoBehaviour } from '../waking-nightmare_core/gameObject/behaviours/monoBehaviour';
import { Material } from '../waking-nightmare_core/rendering/classes/material';
import { generateCube } from '../waking-nightmare_core/rendering/classes/meshes/cube';
import { Shader } from '../waking-nightmare_core/rendering/classes/shader';
import { RendererComponent } from '../waking-nightmare_core/rendering/components/rendererComponent';
import { Vector3 } from '../waking-nightmare_core/utils/math/vectors/vector3';
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
      cardMaterial.setUniform('uTextureOffset', new Float32Array([0.0, 0.0]));

      if (this.transform) {
        this.transform.position.z = -10;
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
    // Custom behavior for the card can be implemented here
  }
}
