import WN_Component from '@WN/GameObjects/Component/WN_Component';
import WN_PixelBuffer from '@WN/Rendering/PixelBuffer/WN_PixelBuffer';
import Matrix4x4 from '@WN/classes/math/Matrix/Matrix4x4';

class WN_RendererComponent extends WN_Component {
  render = (pixelBuffer: WN_PixelBuffer, viewMatrix: Matrix4x4) => {};
}

export default WN_RendererComponent;
