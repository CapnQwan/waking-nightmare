import Vector3 from '@/helpers/waking-nightmare/utils/math/Vectors/Vector3';
import EntityManager from '../EntityManager';
import GameObject from '@/helpers/waking-nightmare/GameObjects/GameObject/GameObject';

class QuadrentManager {
  entityManager: EntityManager;
  quadrentDimensions: Vector3 = new Vector3(10, 10, 10);
  quadrentDepth: number = 100;
  quadrents: Array<Array<Array<Array<GameObject | null>>>>;

  constructor(entityManager: EntityManager, width = 0, height = 0) {
    this.entityManager = entityManager;

    const quadrentX = Math.ceil(width / this.quadrentDimensions.x);
    const quadrentY = Math.ceil(height / this.quadrentDimensions.y);

    this.quadrents = Array.from({ length: quadrentX }, () =>
      Array.from({ length: quadrentY }, () =>
        Array.from({ length: this.quadrentDepth }, () => [])
      )
    );
  }

  getXQuadrant = (
    x: number
  ): Array<Array<Array<GameObject | null>>> | null => {
    const quadrentX = Math.floor(x / this.quadrentDimensions.x);

    if (quadrentX < 0 || quadrentX >= this.quadrents.length) {
      return null;
    }
    return this.quadrents[quadrentX];
  };

  getYQuadrant = (
    x: number,
    y: number
  ): Array<Array<GameObject | null>> | null => {
    const xQuadrent = this.getXQuadrant(x);
    const quadrentY = Math.floor(y / this.quadrentDimensions.y);

    if (!xQuadrent || quadrentY < 0 || quadrentY >= xQuadrent.length) {
      return null;
    }

    return xQuadrent[quadrentY];
  };

  getZQuadrant = (
    x: number,
    y: number,
    z: number
  ): Array<GameObject | null> | null => {
    const yQuadrent = this.getYQuadrant(x, y);
    const quadrentZ = Math.floor(z / this.quadrentDimensions.z);

    if (!yQuadrent || quadrentZ < 0 || quadrentZ >= yQuadrent.length) {
      return null;
    }
    return yQuadrent[quadrentZ];
  };

  addObject = (gameObject: GameObject): void => {
    const position = gameObject.transform.position;
    const zQuadrent = this.getZQuadrant(position.x, position.y, position.z);
    if (zQuadrent) {
      zQuadrent.push(gameObject);
    }
  };
}

export default QuadrentManager;
