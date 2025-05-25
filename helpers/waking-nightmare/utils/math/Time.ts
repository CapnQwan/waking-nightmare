/**
 * Time management class implementing the Singleton pattern.
 * Handles frame timing, pausing, and performance metrics for game/animation loops.
 */
class Time {
  /** Time when the instance was created */
  startTime: number = performance.now();
  /** Timestamp of the last frame, null on first frame */
  timeLastFrame: number | null = null;
  /** Time elapsed between current and previous frame in seconds */
  deltaTime: number = 0;
  /** Total number of frames processed */
  frameCount: number = 0;
  /** Array storing recent frame rates for averaging */
  pastFrames: Array<number> = [];
  /** Maximum number of frame rates to keep in history */
  maxFramesHistory: number = 10;
  /** Total elapsed time in seconds */
  time: number = 0;
  /** Flag indicating if time tracking is paused */
  isPaused: boolean = false;
  /** Timestamp when pause was initiated */
  pauseTime: number | null = null;

  /** Singleton instance */
  private static instance: Time;

  /**
   * Creates or returns the existing Time instance (Singleton pattern)
   */
  constructor() {
    if (Time.instance) {
      return Time.instance;
    }
    this.startTime = performance.now();
    Time.instance = this;
  }

  /**
   * Updates time-related metrics for the current frame.
   * Should be called once per frame in the main loop.
   */
  update() {
    const timeNow = performance.now();
    const timeLastFrame = this.timeLastFrame || this.startTime;
    const deltaTime = timeNow - timeLastFrame;

    this.timeLastFrame = timeNow;

    const currentFrameRate = 1000 / deltaTime;
    this.deltaTime = deltaTime * 0.001; // Convert to seconds
    this.time += this.deltaTime;
    this.pastFrames.push(currentFrameRate);
    if (this.pastFrames.length > this.maxFramesHistory) {
      this.pastFrames.shift();
    }
  }

  /**
   * Calculates the average frame rate over the recorded history.
   * @returns The average frame rate rounded to the nearest integer
   */
  getAverageFrameRate(): number {
    const totalFrameRate = this.pastFrames.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return Math.round(totalFrameRate / this.pastFrames.length);
  }

  /**
   * Clears the frame rate history
   */
  clearFrameHistory() {
    this.pastFrames = [];
  }

  /**
   * Returns the total elapsed time since start
   * @returns Total time in seconds
   */
  getElapsedTime(): number {
    return this.time;
  }

  /**
   * Pauses time tracking if not already paused
   */
  pause() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pauseTime = performance.now();
    }
  }

  /**
   * Resumes time tracking if paused, adjusting timestamps
   * to account for the pause duration
   */
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

  /**
   * Calculates the standard deviation of frame rates
   * to measure frame time stability
   * @returns The frame rate variance (standard deviation)
   */
  getFrameTimeVariance(): number {
    const mean = this.getAverageFrameRate();
    const variance =
      this.pastFrames.reduce(
        (acc, frameRate) => acc + Math.pow(frameRate - mean, 2),
        0
      ) / this.pastFrames.length;
    return Math.sqrt(variance);
  }

  /**
   * Sets the maximum number of frames to keep in history
   * @param size New maximum size for frame history
   */
  setMaxFramesHistory(size: number) {
    this.maxFramesHistory = size;
    if (this.pastFrames.length > size) {
      this.pastFrames.splice(0, this.pastFrames.length - size);
    }
  }

  /**
   * Gets the singleton instance of Time
   * @returns The Time instance
   */
  static getInstance(): Time {
    if (!Time.instance) {
      Time.instance = new Time();
    }
    return Time.instance;
  }
}

export const time = Time.getInstance();
