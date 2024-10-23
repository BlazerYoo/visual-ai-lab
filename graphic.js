import "./graphic.css";
import anime from "animejs/lib/anime.es.js";

const nodes = document.querySelectorAll(".node");
const container = document.getElementById("animation-container");

function createConnections() {
    nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
            if (i < j) {
                const connection = document.createElement("div");
                connection.classList.add("connection");
                container.appendChild(connection);
                updateConnection(connection, node, otherNode);
            }
        });
    });
}

function updateConnection(connection, start, end) {
    const rect1 = start.getBoundingClientRect();
    const rect2 = end.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;
    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

    connection.style.width = `${length}px`;
    connection.style.left = `${x1}px`;
    connection.style.top = `${y1}px`;
    connection.style.transform = `rotate(${angle}deg)`;
}

function animateNodes() {
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const scaleFactor = 0.8;
    anime({
        targets: ".node",
        translateX: () => anime.random(centerX - centerX * scaleFactor, centerX + centerX * scaleFactor),
        translateY: () => anime.random(centerY - centerY * scaleFactor, centerY + centerY * scaleFactor),
        scale: () => anime.random(0.8, 1.2),
        easing: "easeInOutQuad",
        duration: 3000,
        complete: animateNodes,
    });
}

function updateConnections() {
    const connections = document.querySelectorAll(".connection");
    connections.forEach((connection, index) => {
        const startNode = nodes[Math.floor(index / (nodes.length - 1))];
        const endNode = nodes[(index % (nodes.length - 1)) + 1];
        updateConnection(connection, startNode, endNode);
    });
}

function handleMouseMove(event) {
    const mouseX = event.clientX - container.getBoundingClientRect().left;
    const mouseY = event.clientY - container.getBoundingClientRect().top;

    nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const nodeX =
            rect.left + rect.width / 2 - container.getBoundingClientRect().left;
        const nodeY =
            rect.top + rect.height / 2 - container.getBoundingClientRect().top;

        const dx = mouseX - nodeX;
        const dy = mouseY - nodeY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 10;
            anime({
                targets: node,
                translateX: `+=${Math.cos(angle) * force}`,
                translateY: `+=${Math.sin(angle) * force}`,
                duration: 100,
                easing: "easeOutQuad",
            });
        }
    });
}

createConnections();
animateNodes();
setInterval(updateConnections, 10);
container.addEventListener("mousemove", handleMouseMove);

nodes.forEach((node) => {
    node.addEventListener("click", () => {
        anime({
            targets: node,
            scale: [1, 1.5, 1],
            rotate: "1turn",
            duration: 1000,
            easing: "easeInOutQuad",
        });
    });
});

