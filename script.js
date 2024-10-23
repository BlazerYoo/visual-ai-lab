document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const contentDiv = document.getElementById("content");

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
  }

  // Load content based on the hash or default to "home"
  function loadContentFromHash() {
    const hash = window.location.hash.slice(1) || "home"; // Default to "home" if no hash

    loadContentFromFile(hash);

    // Load graphics script on home
    /*if (hash == "home") {
      function loadScript(url) {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.type = "module"
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      loadScript("graphic.js")
        .then(() => {
          console.log("Script loaded successfully.");
        })
        .catch((error) => {
          console.error("Error loading the script:", error);
        });
    }*/
  }

  // Initial content load based on URL hash
  loadContentFromHash();

  // Listen for hash changes
  window.addEventListener("hashchange", loadContentFromHash);
});
