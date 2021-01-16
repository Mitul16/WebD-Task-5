function f() {
    let t = performance.now() * 0.1;
    return (Math.sin(t - Math.cos(3 * t) * Math.sin(7 * t)) + Math.cos(t - Math.sin(t * 0.5)) + 3) / 5;
}

function g() {
    document.getElementById('error-text')
        .setAttribute('style', `color : rgba(255, 0, 0, ${f().toPrecision(2)});`);
}

setInterval(g, 100);
