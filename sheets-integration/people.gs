// Insert new award at top
// function homeAddAward() {
//   const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//   const sheet = spreadsheet.getSheetByName('home');
  
//   const lastRow = sheet.getLastRow();
//   const rangeDE = sheet.getRange(2, 4, lastRow - 1, 2);
//   const values = rangeDE.getValues();
//   sheet.getRange(3, 4, values.length, 2).setValues(values);
  
//   sheet.getRange('D2').setValue('[insert person here]');
//   sheet.getRange('E2').setValue('[insert award here]');
// }

// Push home content
function peoplePushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('people');
  
  spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
  sheet.getRange('A6').setValue('WAITING...');
  sheet.getRange('A7').setValue('...');

  const html = getFinalHTML('PEOPLE').getContent();

  createCommitOnBranch('people', html);

  sheet.getRange('A6').setValue('SUCCESS...');
}

// Get home content
function getPeopleContent() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('people');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // Initialize an array to hold the awards
  const senior_researchers = [];
  const postdocs = [];
  const phds = [];
  const masters = [];
  const undergrads = [];
  const assoc = [];
  
  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    const title = data[i][1];
    const name = data[i][2];
    const number = data[i][3];
    let link = data[i][4];
    const profilePic = getProfilePic(name, number);
    const position = data[i][6];
    const affiliation = data[i][7];

    const position_prefix = position.split(" ")[0];
    const position_suffix = position.substring(position_prefix.length)

    if (link === '') {
      link = " ";
    }

    let last_name_first_letter = name.split(" ");
    last_name_first_letter = last_name_first_letter[last_name_first_letter.length - 1].substring(0, 1);

    Logger.log(name.split(" "));
    Logger.log(last_name_first_letter);
    // Create person representation
    const person = {
      name: title + " " + name,
      last_name_first_letter: last_name_first_letter,
      number: number,
      link: link,
      profilePic: profilePic,
      position_prefix: position.split(" ")[0],
      position_suffix: position_suffix
    };

    if (affiliation === 'Associated member') {
      assoc.push(person);
    }
    else {
      if (position === 'Senior Researcher') {
        senior_researchers.push(person);
      }
      else if (position === 'Postdoc Scholar') {
        postdocs.push(person);
      }
      else if (position === 'Ph.D. Student') {
        phds.push(person);
      }
      else if (position === 'Master\'s Student') {
        masters.push(person);
      }
      else if (position === 'Undergraduate Student') {
        undergrads.push(person);
      }
    }
  }

  assoc.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  senior_researchers.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  postdocs.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  phds.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  masters.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  undergrads.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});

  return [senior_researchers, postdocs, phds, masters, undergrads, assoc];
}


