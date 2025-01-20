document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const contentDiv = document.getElementById("content");

  // Per page JS scripts
  const researchScript = document.createElement("script");
  researchScript.src = "scripts/research.js";
  const jsScripts = [researchScript];

  // Function to load content from external HTML files
  function loadContentFromFile(tabName) {
    fetch(`${tabName}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Page not found");
        }
        return response.text();
      })
      .then((data) => {
        contentDiv.innerHTML = data;
        updateActiveTab(tabName);
      })
      .catch((error) => {
        contentDiv.innerHTML = "<p>Error loading content.</p>";
        console.error(error);
      });
  }

  // Function to update active tab
  function updateActiveTab(tabName) {
    tabs.forEach((tab) => tab.classList.remove("current-tab"));
    const activeTabs = document.querySelectorAll(`[href="#${tabName}"]`);
    activeTabs.forEach((tab) => tab.classList.add("current-tab"));
    
    jsScripts.forEach((script) => {
      const scriptSrc = script.getAttribute("src");
      if (scriptSrc === `scripts/${tabName}.js` && !document.head.contains(script)) {
        document.head.appendChild(script);
      } else if (scriptSrc !== `scripts/${tabName}.js` && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    });
  }

  // Load content based on the hash or default to "home"
  function loadContentFromHash() {
    const hash = window.location.hash.slice(1) || "home"; // Default to "home" if no hash

    loadContentFromFile(hash);
  }

  // Initial content load based on URL hash
  loadContentFromHash();

  // Listen for hash changes
  window.addEventListener("hashchange", loadContentFromHash);
});
