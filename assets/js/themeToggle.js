document.addEventListener('DOMContentLoaded', () => {
    const { to } = gsap;

    document.querySelectorAll('.day-night').forEach(dayNight => {
        const toggle = dayNight.querySelector('.toggle');
        const svgLine = dayNight.querySelector('.line');
        
        // Proxy para actualizar dinámicamente la línea SVG
        const svgLineProxy = new Proxy({ y: 18 }, {
            set(target, key, value) {
                target[key] = value;
                if (target.y !== null) {
                    svgLine.innerHTML = generatePath(target.y, 0.1925);
                }
                return true;
            }
        });

        // Evento de clic en el botón de toggle
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (dayNight.classList.contains('animate')) return;

            dayNight.classList.add('animate');
            const isNight = dayNight.classList.contains('night');

            // Animación principal
            to(dayNight, {
                keyframes: [
                    { [isNight ? '--moon-y' : '--sun-y']: '-4px', duration: 0.25 },
                    { [isNight ? '--moon-y' : '--sun-y']: '60px', duration: 0.2 },
                    {
                        [isNight ? '--sun-y' : '--moon-y']: '-4px',
                        duration: 0.25,
                        delay: 0.275,
                        onStart() {
                            to(dayNight, {
                                '--new-percent': '100%',
                                '--line': isNight ? 'var(--day-line)' : 'var(--night-line)',
                                duration: 0.5
                            });
                        }
                    },
                    {
                        [isNight ? '--sun-y' : '--moon-y']: '0px',
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                        clearProps: true,
                        onComplete() {
                            dayNight.classList.toggle('night');
                            dayNight.classList.remove('animate');
                        }
                    }
                ]
            });

            // Animación de la línea SVG
            to(svgLineProxy, {
                keyframes: [
                    { y: 24, delay: 0.25, duration: 0.2 },
                    { y: 12, duration: 0.2 },
                    { y: 24, duration: 0.25 },
                    { y: 18, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
                ]
            });
        });
    });

    // Genera un punto de control para suavizar la curva de la línea SVG
    function getControlPoint(current, prev, next, reverse, smoothing) {
        const p = prev || current;
        const n = next || current;
        const o = {
            length: Math.hypot(n[0] - p[0], n[1] - p[1]),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0])
        };
        const angle = o.angle + (reverse ? Math.PI : 0);
        const length = o.length * smoothing;
        return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
    }

    // Genera un segmento de la curva SVG
    function getPathSegment(point, i, points, smoothing) {
        const cps = getControlPoint(points[i - 1], points[i - 2], point, false, smoothing);
        const cpe = getControlPoint(point, points[i - 1], points[i + 1], true, smoothing);
        return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    }

    // Genera la ruta completa de la curva SVG
    function generatePath(update, smoothing) {
        const points = [
            [4, 18],
            [26, update],
            [48, 18]
        ];
        return `<path d="${points.reduce((path, point, i, arr) => 
            i === 0 ? `M ${point[0]},${point[1]}` : `${path} ${getPathSegment(point, i, arr, smoothing)}`, '')}" />`;
    }
});
