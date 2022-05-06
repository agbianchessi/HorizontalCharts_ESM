import { merge } from './Utils.js';

export default class TimeSeries {

    /**
    * Initialises a new <code>TimeSeries</code> with optional data options.
    *
    * @constructor
    * @param {number} position - Unique, integer and strictly positive value, it sorts series on the graph from top to bottom.
    * @param {DefaultTimeSeriesOptions} [options] - <code>TimeSeries</code> options.
    * @memberof module:HorizontalCharts
    */
    constructor(position, options) {
        this.position = position;
        this.options = merge({}, TimeSeries.defaultTimeSeriesOptions, options);
        this.clear();
    }

    /**
     * @typedef {Object} DefaultTimeSeriesOptions - Contains default chart options.
     * @property {number} [barHeight=22] - The thickness of the bars.
     * @property {boolean} [showValues=true] - Enables the printing of data samples values inside bars.
     * @property {string} [labelText=""] - A short text describing this <code>TimeSeries</code>.
     * @property {boolean} [replaceValue=false] - If data sample <code>ts</code> has an exact match in the series, this flag controls whether it is replaced, or not.
     * @property {boolean} [disabled=false] - This flag controls wheter this timeseries is displayed or not.
       */
    static defaultTimeSeriesOptions = {
        barHeight: 25,
        showValues: true,
        labelText: "",
        replaceValue: false,
        disabled: false
    };

    /**
     * Clears all data from this <code>TimeSeries</code>.
     */
    clear() {
        this.data = [];
    };

    /**
     * Adds a new data sample to the <code>TimeSeries</code>, preserving chronological order.
     *
     * @param {DataSample} dataSample - The <code>DataSample</code> to add.
     */
    append(dataSample) {
        if (isNaN(dataSample.ts)) {
            // Add to the end of the array
            this.data.push(dataSample);
            return;
        }
        // Rewind until we hit an older x
        let i = this.data.length - 1;
        while (i >= 0 && this.data[i].ts > dataSample.ts) {
            i--;
        }
        if (i === -1) {
            // This new item is the oldest data
            this.data.splice(0, 0, dataSample);
        } else if (this.data.length > 0 && this.data[i].ts === dataSample.ts) {
            // Replace existing values in the array
            if (this.options.replaceValue)
                this.data[i] = dataSample;
        } else {
            //insert
            if (i < this.data.length - 1) {
                // Splice into the correct position to keep the ts's in order
                this.data.splice(i + 1, 0, dataSample);
            } else {
                // Add to the end of the array
                this.data.push(dataSample);
            }
        }
    };

    /**
     * Drops old data from the timeseries that can not be displayed into the <code>canvas</code>.
     * 
     * @param {number} canvasWidth - The canvas width.
     */
    dropOldData(canvasWidth) {
        let lengthSum = 0;
        for (let i = this.data.length - 1; i >= 0; i--) {
            if (isNaN(this.data[i].xEnd) || isNaN(this.data[i].xStart))
                break
            lengthSum += this.data[i].xEnd - this.data[i].xStart;
            if (lengthSum > canvasWidth) {
                this.data.splice(0, i + 1);
                break;
            }
        }
    };

}