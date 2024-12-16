// Push home content
function homePushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('home');
  
  spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
  sheet.getRange('A6').setValue('WAITING...');
  sheet.getRange('A7').setValue('...');

  const home_html = getFinalHTML('HOME').getContent();
  const awards_html = getFinalHTML('AWARDS').getContent();

  // Logger.log(home_html);

  createCommitOnBranch('home', home_html);
  createCommitOnBranch('awards', awards_html);

  sheet.getRange('A6').setValue('SUCCESS...');

}

// Get home content
function getHomeContent() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('home');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // 

  // Initialize an array to hold the awards
  const awards = [];

  const acknowledgments = data[1][1];
  
  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    const timestamp = data[i][2];
    const title = data[i][3]
    const name = data[i][4];
    const add_names = data[i][5];
    const award_name = data[i][6];
    const award_time = data[i][7];

    if (timestamp === '') {
      break
    }

    names_list = title + " " + name;
    if (add_names !== '') {
      names_list += ", " + add_names;
    }
    
    const year = award_time.getFullYear(); // year
    
    // Create a paper object
    const award = {
      name: name,
      names: names_list,
      award_name: award_name,
      year: year
    };
    
    // Add the paper object to the papers array
    awards.push(award);
  }
  
  // Convert the papers array to JSON
  // const awardsJSON = JSON.stringify(awards, null, 2);

  Logger.log(awards);
  return [acknowledgments, awards];
}


