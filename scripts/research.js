// Add research tags to papers
const cvBadge = document.createElement("div");
cvBadge.innerHTML = '<div class="badge badge-outline badge-warning" id="cv">computer vision, machine learning</div>';
const hciBadge = document.createElement("div");
hciBadge.innerHTML = '<div class="badge badge-outline badge-success" id="hci">human-computer interaction, cognitive science</div>';
const fairBadge = document.createElement("div");
fairBadge.innerHTML = '<div class="badge badge-outline badge-info" id="fair">fairness, accountability, and transparency</div>';

const cvPapers = document.querySelectorAll(".cv");
const hciPapers = document.querySelectorAll(".hci");
const fairPapers = document.querySelectorAll(".fair");
const allPapers = document.querySelectorAll(".cv, .hci, .fair");

cvPapers.forEach(cvPaper => {
    cvPaper.appendChild(cvBadge.cloneNode(true));
});

hciPapers.forEach(hciPaper => {
    hciPaper.appendChild(hciBadge.cloneNode(true));
});

fairPapers.forEach(fairPaper => {
    fairPaper.appendChild(fairBadge.cloneNode(true));
});


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