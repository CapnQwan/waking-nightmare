import Canvas from '@/helpers/waking-nightmare/Rendering/Canvas';

class Time {
  startTime: number = performance.now();
  timeLastFrame: number | null = null;
  deltaTime: number = 0;
  frameCount: number = 0;
  pastFrames: Array<number> = [];
  maxFramesHistory: number = 10;
  time: number = 0;
  isPaused: boolean = false;
  pauseTime: number | null = null;

  private static instance: Time;

  private constructor(maxFramesHistory: number = 10) {
    if (Time.instance) {
      return Time.instance;
    }
    this.startTime = performance.now();
    this.maxFramesHistory = maxFramesHistory;
    Time.instance = this;
  }

  update() {
    const timeNow = performance.now();
    const timeLastFrame = this.timeLastFrame || this.startTime;
    const deltaTime = timeNow - timeLastFrame;
    this.time += deltaTime;
    this.timeLastFrame = timeNow;

    const currentFrameRate = 1000 / deltaTime;
    this.deltaTime = deltaTime * 0.001;
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

  renderPerformance(canvas: Canvas) {
    if (!canvas.ctx) {
      return;
    }

    this.update();
    canvas.ctx.font = '12px Arial';
    canvas.ctx.fillStyle = '#f2af13';
    const averageFrameRate = this.getAverageFrameRate();

    const xPos = (canvas.width - 100 * canvas.pixelRatio) / canvas.pixelRatio;
    const yPos = 50 / canvas.pixelRatio;

    canvas.renderText(`FPS: ${averageFrameRate}`, xPos, yPos);
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

  static getInstance(maxFramesHistory: number = 10): Time {
    if (!Time.instance) {
      Time.instance = new Time(maxFramesHistory);
    }
    return Time.instance;
  }
}

const time = Time.getInstance();
export default time;
