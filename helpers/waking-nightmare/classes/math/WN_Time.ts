import WN_Canvas from "@WN/Rendering/WN_Canvas";

class WN_Time {
  startTime: number;
  timeLastFrame: number | null = null;
  deltaTime: number = 0;
  frameCount: number = 0;
  pastFrames: Array<number> = [];
  maxFramesHistory: number;
  time: number = 0;
  isPaused: boolean = false;
  pauseTime: number | null = null;

  constructor(maxFramesHistory: number = 10) {
    if (WN_Time.instance) {
      return WN_Time.instance;
    }
    this.startTime = performance.now();
    this.maxFramesHistory = maxFramesHistory;
    WN_Time.instance = this;
  }

  update() {
    const timeNow = performance.now();
    const timeLastFrame = this.timeLastFrame || this.startTime;
    this.deltaTime = timeNow - timeLastFrame;
    this.time += this.deltaTime;
    this.timeLastFrame = timeNow;

    const currentFrameRate = 1000 / this.deltaTime;
    this.pastFrames.push(currentFrameRate);
    if (this.pastFrames.length > this.maxFramesHistory) {
      this.pastFrames.shift();
    }
  }

  getAverageFrameRate(): number {
    const totalFrameRate = this.pastFrames.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return Math.round(totalFrameRate / this.pastFrames.length);
  }

  renderPerformance(canvas: WN_Canvas) {
    if (!canvas.ctx) {
      return;
    }

    this.update();
    canvas.ctx.font = '12px Arial';
    canvas.ctx.fillStyle = '#f2af13';
    const averageFrameRate = this.getAverageFrameRate();
    canvas.renderText(`FPS: ${averageFrameRate}`, canvas.width - 100, 50);
  }

  clearFrameHistory() {
    this.pastFrames = [];
  }

  getElapsedTime(): number {
    return this.time;
  }

  pause() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pauseTime = performance.now();
    }
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      const timePaused =
        performance.now() - (this.pauseTime || performance.now());
      this.startTime += timePaused;
      if (this.timeLastFrame !== null) {
        this.timeLastFrame += timePaused;
      }
      this.pauseTime = null;
    }
  }

  getFrameTimeVariance(): number {
    const mean = this.getAverageFrameRate();
    const variance =
      this.pastFrames.reduce(
        (acc, frameRate) => acc + Math.pow(frameRate - mean, 2),
        0
      ) / this.pastFrames.length;
    return Math.sqrt(variance);
  }

  setMaxFramesHistory(size: number) {
    this.maxFramesHistory = size;
    if (this.pastFrames.length > size) {
      this.pastFrames.splice(0, this.pastFrames.length - size);
    }
  }
}

const time = new WN_Time();
Object.freeze(time); // To prevent modifications
export default time;
