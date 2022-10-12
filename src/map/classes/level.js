import { Color } from './color'

/**
 * Class that represents a map level, used to add colors to it.
 */
export class Level {
  /**
   * @param {number} min defines the min level value.
   * @param {number} max defines the max level value.
   * @param {Color} color defines an object that represents the desired color.
   */
  constructor(min, max, color) {
    this.min = min
    this.max = max
    this.color = color
  }
}
