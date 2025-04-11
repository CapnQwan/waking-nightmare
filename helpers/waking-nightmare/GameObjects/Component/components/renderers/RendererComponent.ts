import Component from '@/helpers/waking-nightmare/GameObjects/Component/Component';
import PixelBuffer from '@/helpers/waking-nightmare/Rendering/PixelBuffer/PixelBuffer';
import Matrix4x4 from '@/helpers/waking-nightmare/utils/math/Matrix/Matrix4x4';

class RendererComponent extends Component {
  render = (pixelBuffer: PixelBuffer, viewMatrix: Matrix4x4) => {};
}

export default RendererComponent;
