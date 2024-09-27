document.addEventListener('DOMContentLoaded', function() {
    const svgNS = "http://www.w3.org/2000/svg";
    const container = document.getElementById('background-container');

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('preserveAspectRatio', 'none'); // Ensure it covers the entire viewport

    for (let i = 0; i < 50; i++) {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', Math.random() * 1920);
        rect.setAttribute('y', Math.random() * 1080);
        rect.setAttribute('width', Math.random() * 100);
        rect.setAttribute('height', Math.random() * 100);
        rect.setAttribute('fill', `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`);
        svg.appendChild(rect);
    }

    container.appendChild(svg);

    function animate() {
        const rects = svg.querySelectorAll('rect');
        rects.forEach(rect => {
            rect.setAttribute('x', Math.random() * 1920);
            rect.setAttribute('y', Math.random() * 1080);
        });
        setTimeout(() => requestAnimationFrame(animate), 1000 / 12); // 5 times slower (12 FPS)
    }

    animate();
});