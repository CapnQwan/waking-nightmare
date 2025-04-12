import Component from '@/helpers/waking-nightmare/GameObjects/Component/Component';

class RendererComponent extends Component {
  material: Material;

  constructor({ material }: {material?: Material}) {
    this.material = material ?? ;
  };

  render = () => {};
}

export default RendererComponent;
