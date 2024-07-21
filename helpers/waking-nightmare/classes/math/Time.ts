import Renderer from "../../renderer/Renderer";

class Time {
  startTime: number;
  timeLastFrame: number | null = null;
  deltaTime: number = 0;
  frameCount: number = 0;
  pastFrames: Array<number> = [];
  maxFramesHistory: number = 10;
  time: number = 0;

  constructor() {
    this.startTime = Date.now();
  }

  update() {
    const timeNow = Date.now();
    const timeLastFrame = this.timeLastFrame || this.startTime;
    this.deltaTime = timeNow - timeLastFrame;
    this.time += this.deltaTime;
    this.timeLastFrame = timeNow;
    this.frameCount = Math.round(1000 / this.deltaTime);
    this.pastFrames.push(this.frameCount);
    if (this.pastFrames.length > this.maxFramesHistory) {
      this.pastFrames.shift();
    }
  }

  renderPerformance(Renderer: Renderer) {
    if (!Renderer.ctx) {
      return;
    }

    this.update();
    Renderer.ctx.font = '12px Arial';
    Renderer.ctx.fillStyle = '#f2af13';
    const totalFrameRate = this.pastFrames.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    const averageFrameRate = Math.round(totalFrameRate / this.maxFramesHistory);
    Renderer.renderText(averageFrameRate, Renderer.width - 100, 50);
  }
}

export default Time;
