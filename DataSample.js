/** 
 * @module DataSample
 * @memberof module:horizontalcharts
 */

export default class DataSample {
	/**
	 * Initialises a new <code>DataSample</code>.
	 *
	 * @constructor
	 * @param {Object} data - An object with <code>DataSample</code> data.
	 * @param {number} data.ts - This <code>DataSample</code> timestamp (milliseconds since the Unix Epoch). 
	 * @param {string|CanvasPattern} data.color - The color or pattern of this <code>DataSample</code>.
	 * @param {number} [data.borderWidth=1] - The border width of this <code>DataSample</code>. 0 = no border line.
	 * @param {string} [data.borderColor="black"] - The border color of this <code>DataSample</code>.
	 * @param {number} [data.value=NaN] - The value of this <code>DataSample</code>.
	 * @param {string} [data.desc=""] - A short text describing this <code>DataSample</code>. 
	*/
	constructor(data) {
		this.ts = typeof data.ts === 'number' ? data.ts : Number.NaN;
		this.color = data.color;
		this.borderWidth = typeof data.borderWidth === 'number' ? data.borderWidth : 1;
		this.borderColor = typeof data.borderColor === 'string' ? data.borderColor : 'black';
		this.value = typeof data.value === 'number' ? data.value : Number.NaN;
		this.desc = typeof data.desc === 'string' ? data.desc : '';
		this.xStart = Number.NaN;
		this.xEnd = Number.NaN;
		this.path2D = null;
	}
}