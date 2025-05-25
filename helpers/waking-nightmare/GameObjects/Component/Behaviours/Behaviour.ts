import { Component, IComponentConstructor } from '../Component';

/**
 * Interface for Behaviour constructor parameters
 * Extends the base component constructor interface
 */
export interface IBehaviourConstructor extends IComponentConstructor {
  /** Optional flag to set the initial enabled state */
  enabled?: boolean;
}

/**
 * Base class for all behaviour components
 * Provides enable/disable functionality for controlling component execution
 */
export class Behaviour extends Component {
  /** Internal enabled state of the behaviour */
  private _enabled: boolean = true;

  /**
   * Creates a new Behaviour instance
   * @param params - Construction parameters including optional enabled state
   */
  constructor(params: IBehaviourConstructor) {
    super(params);
    this._enabled = params.enabled ?? true;
  }

  /**
   * Gets the current enabled state of the behaviour
   * @returns Current enabled state
   */
  get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Sets the enabled state of the behaviour
   * @param value - New enabled state
   */
  set enabled(value: boolean) {
    this._enabled = value;
  }
}
