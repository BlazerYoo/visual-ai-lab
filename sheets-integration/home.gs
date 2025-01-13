// Push home content
function homeAwardPushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('home');
  
  try {  
    spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
    sheet.getRange('A6').setValue('WAITING...');
    sheet.getRange('A7').setValue('...');
    sheet.getRange('A8').setValue('...');

    const home_html = getFinalHTML('HOME').getContent();
    const awards_html = getFinalHTML('AWARDS').getContent();

    const commit_url = createCommitOnBranch(['home', 'awards'], [home_html, awards_html]);

    sheet.getRange('A6').setValue('SUCCESS');
    sheet.getRange('A7').setFormula(`=HYPERLINK("${commit_url}", "Home Commit Link")`);
    sheet.getRange('A8').setValue('');
  } catch (err) {
    sheet.getRange('A6').setValue('FAILED');
    sheet.getRange('A7').setValue(err);
    sheet.getRange('A8').setValue(getFunctionNameFromStack(err));
  }
}

// Get home content
function getHomeAwardContent() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('home');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  Logger.log(data);

  // Get acknowledgments
  const acknowledgments = data[1][1];

  // Initialize an array to hold the awards
  const awards = [];

  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    const title = data[i][2]
    const name = data[i][3];
    const add_names = data[i][4];
    const award_name = data[i][5];
    const award_date = data[i][6];

    // Break when no more awards
    if (name === '') {
      break
    }

    // Compile names
    let names_list = title === '' ? name : `${title} ${name}`;
    if (add_names !== '') {
      names_list += ", " + add_names;
    }
    
    // Extract year
    const year = award_date.getFullYear();
    
    // Create a award object
    const award = {
      name: name,
      names: names_list,
      award_name: award_name,
      year: year
    };
    
    // Add the award object to the award array
    awards.push(award);
  }
  
  // Convert the papers array to JSON
  // const awardsJSON = JSON.stringify(awards, null, 2);

  Logger.log(awards);
  return [acknowledgments, awards];
}