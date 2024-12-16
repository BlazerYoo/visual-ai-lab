function pushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  
  spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
  sheet.getRange('A6').setValue('WAITING...');
  sheet.getRange('A7').setValue('...');

  // Extract json of papers
  const papers = JSON.parse(getPapers());

  // Create HTML
  const researchHTML = convertToHTML(papers);

  // Make pull request
  createCommitOnBranch(researchHTML);
}

function getPapers() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // Initialize an array to hold the papers
  const papers = [];
  
  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    const title = data[i][1]; // Column B
    const authors = data[i][2]; // Column C
    const conference = data[i][3]; // Column D

    // Check if any of the fields are empty
    if (title === '' || authors === '' || conference === '') {
      continue;
    }
    
    // Create a paper object
    const paper = {
      title: title,
      authors: authors,
      conference: conference
    };
    
    // Add the paper object to the papers array
    papers.push(paper);
  }
  
  // Convert the papers array to JSON
  const papersJSON = JSON.stringify(papers, null, 2);

  Logger.log(papersJSON);
  return papersJSON;
}

function convertToHTML(papers) {
  let researchHTML = '<div class="flex flex-wrap">';
  papers.forEach((paper) => {
    researchHTML += `
      <div class="m-5">
        <h1 class="font-bold">${paper['title']}</h1>
        <p>${paper['authors']}</p>
        <p class="italic">${paper['conference']}</p>
      </div>`;
  });
  researchHTML += '</div>';

  Logger.log(researchHTML);
  return researchHTML;
}


