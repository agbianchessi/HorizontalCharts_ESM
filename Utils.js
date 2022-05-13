/** 
 * @module Utils
 * @memberof module:horizontalcharts
 */


/**
 * Merge the properties of multiple objects into one.
 * 
 * @param {object} target The target object. What to apply the sources' properties to, which is returned after it is modified.
 * @param  {...object} objs The source object(s). Objects containing the properties you want to apply.
 * @returns The target object.
 */
export function merge(target, ...objs) {
    target = target ?? {};
    for (let i = 0; i < objs.length; i++) {
        for (let key in objs[i]) {
            if (objs[i].hasOwnProperty(key)) {
                if (typeof (objs[i][key]) === 'object') {
                    if (objs[i][key] instanceof Array) {
                        target[key] = objs[i][key].slice(); //shallow copy
                    } else {
                        target[key] = merge(target[key], objs[i][key]);
                    }
                } else {
                    target[key] = objs[i][key];
                }
            }
        }
    }
    return target;
}

/**
 * Resize a <code>canvas</code> element.
 *
 * @param {Canvas} canvas - The <code>canvas</code> element to resize.
 * @param {number} factor - Horizontal and vertical scaling factor.
 */
export function resizeCanvas(canvas, factor) {
    const width = canvas.clientWidth;
    const height = canvas.height;
    canvas.width = 0 | (width * factor);
    canvas.height = 0 | (height * factor);
    canvas.style.height = height + 'px';
    canvas.getContext("2d").scale(factor, factor);
}