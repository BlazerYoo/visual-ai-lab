document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const element = document.querySelector(`[data-title="${hash}"]`);
            element.scrollIntoView({ behavior: "smooth" });

            // Add the flashing effect
            element.classList.add("flash-border");

            // Remove the class after the animation completes
            setTimeout(() => {
                element.classList.remove("flash-border");
            }, 2000); // Match CSS animation duration
        }
    }, 500); // Allow the page to load before scrolling
});