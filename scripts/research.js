function researchFunc() {

    const allPapers = document.querySelectorAll(".cv, .hci, .fair");

    // Change style on research tag click
    const researchTabs = document.querySelectorAll(".research-filter");
    let researchTagSelected = false;

    researchTabs.forEach(researchTag => {
        researchTag.addEventListener('click', (event) => {

            researchTag.classList.toggle("badge-outline");

            const selectedTags = Array.from(document.querySelectorAll(".research-filter:not(.badge-outline)")).map(tag => tag.id);

            // Show all papers if no tags are selected
            if (selectedTags.length === 0) {
                allPapers.forEach(paper => {
                    paper.classList.remove("hidden");
                });
            }

            // Only show papers with selected tags
            else {
                // Hide all papers
                allPapers.forEach(paper => {
                    paper.classList.add("hidden");
                });

                const queryString = `.` + selectedTags.join(".");

                const selectedPapers = document.querySelectorAll(queryString);
                selectedPapers.forEach(paper => {
                    paper.classList.remove("hidden");
                });
            }
        });
    });
}