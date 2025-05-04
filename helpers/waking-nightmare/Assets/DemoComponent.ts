import { MonoBehaviour } from '../GameObjects/Component/Behaviours/MonoBehaviour';

export class DemoComponent extends MonoBehaviour {
  awake(): void {
    console.log('DemoComponent awake');
  }

  start(): void {
    console.log('DemoComponent start');
  }

  onUpdate(): void {
    console.log('DemoComponent update');
  }
}
