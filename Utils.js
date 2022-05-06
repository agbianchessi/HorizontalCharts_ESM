export function merge() {
    arguments[0] = arguments[0] || {};
    for (let i = 1; i < arguments.length; i++) {
        for (let key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                if (typeof (arguments[i][key]) === 'object') {
                    if (arguments[i][key] instanceof Array) {
                        arguments[0][key] = arguments[i][key];
                    } else {
                        arguments[0][key] = merge(arguments[0][key], arguments[i][key]);
                    }
                } else {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
    }
    return arguments[0];
}

export function resizeCanvas(canvas, factor) {
    const width = canvas.clientWidth;
    const height = canvas.height;
    canvas.width = 0 | (width * factor);
    canvas.height = 0 | (height * factor);
    canvas.style.height = height + 'px';
    canvas.getContext("2d").scale(factor, factor);
}