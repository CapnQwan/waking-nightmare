import Vector3 from "../math/Vector3";

class WN_Transform {
  position: Vector3 = Vector3.zero();
  scale: Vector3 = Vector3.one();
  rotation: Vector3 = Vector3.zero();
}

export default WN_Transform;
