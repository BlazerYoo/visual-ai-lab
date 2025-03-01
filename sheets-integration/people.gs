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

  try {  
    spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
    sheet.getRange('A6').setValue('WAITING...');
    sheet.getRange('A7').setValue('...');
    sheet.getRange('A8').setValue('...');

    const html = getFinalHTML('PEOPLE').getContent();
    const commit_url = createCommitOnBranch(['people'], [html]);

    sheet.getRange('A6').setValue('SUCCESS');
    sheet.getRange('A7').setFormula(`=HYPERLINK("${commit_url}", "People Commit Link")`);
    sheet.getRange('A8').setValue('');
  } catch (err) {
    sheet.getRange('A6').setValue('FAILED');
    sheet.getRange('A7').setValue(err);
    sheet.getRange('A8').setValue(getFunctionNameFromStack(err));
  }
}

// get full list of people
function getPeopleList() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('people_list');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  const people_list = [];

  for (let i = 0; i < data.length; i++) { 
    const name = data[i][0];
    people_list.push(name);
  }

  return people_list;
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
  const postdoc_alumni = [];
  const phd_alumni = [];
  const masters_alumni = [];
  const undergrad_alumni = [];
  const highschool_alumni = [];
  
  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    const title = data[i][1];
    const name = data[i][2];
    const number = data[i][3];
    let link = data[i][4];
    const profilePic = getProfilePic(name, number);
    const position = data[i][6];
    const affiliation = data[i][7];

    const alumni_note = data[i][8];
    const alumni_degree = data[i][9];
    const alumni_gradyear = data[i][10];
    const alumni_italics = data[i][11];
    let alumni_nonitalics = data[i][12];

    const position_prefix = position.split(" ")[0];
    const position_suffix = position.substring(position_prefix.length)

    let is_link = true;
    if (link === '') {
      is_link = false;
    }
    
    let last_name_first_letter = name.split(" ");
    last_name_first_letter = last_name_first_letter[last_name_first_letter.length - 1].substring(0, 1);

    let person, alumni_sortyear;
    if (affiliation === "Alumni") {
      if (alumni_gradyear.indexOf("-") !== -1) {
        alumni_sortyear = alumni_gradyear.split("-");
        alumni_sortyear = alumni_sortyear[alumni_sortyear.length - 1];
      }
      else {
        alumni_sortyear = alumni_gradyear;
      }

      if (alumni_nonitalics.length > 0) {
        if (alumni_nonitalics.substring(0,1) === "(" ) { // BOOKMARK - GET first 
          alumni_nonitalics = " " + alumni_nonitalics;
        }
        else {
          alumni_nonitalics = ", " + alumni_nonitalics;
        }
      }
      
      person = {
        name: title + " " + name,
        last_name_first_letter: last_name_first_letter,
        note: alumni_note,
        degree: alumni_degree,
        year: alumni_gradyear,
        italics: alumni_italics,
        nonitalics: alumni_nonitalics,
        sortyear: alumni_sortyear,
        is_link: is_link,
        link: link
      };
    }
    else {
      person = {
      name: title + " " + name,
      last_name_first_letter: last_name_first_letter,
      number: number,
      link: link,
      is_link: is_link,
      profilePic: profilePic,
      position_prefix: position.split(" ")[0],
      position_suffix: position_suffix
      };
    }

    // Logger.log(name.split(" "));
    // Logger.log(last_name_first_letter);
    // Create person representation
    
    if (affiliation === 'Associated member') {
      assoc.push(person);
    }
    else {
      if (position === 'Senior Researcher') {
        senior_researchers.push(person);
      }
      else if (position === 'Postdoctoral Scholar') {
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
      else if (affiliation === 'Alumni') {
        if (alumni_degree === 'POSTDOC') {
          postdoc_alumni.push(person);
        }
        else if (alumni_degree === 'PH.D. DEGREE') {
          phd_alumni.push(person);
        }
        else if (alumni_degree === "MASTER'S THESIS") {
          masters_alumni.push(person);
        }
        else if (alumni_degree === 'UNDERGRADUATE SENIOR THESIS') {
          undergrad_alumni.push(person);
        }
        else if (alumni_degree === 'HIGH SCHOOL SUMMER INTERN') {
          highschool_alumni.push(person);
        }
      }
    }
  }


  assoc.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  senior_researchers.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  postdocs.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  phds.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  masters.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  undergrads.sort((a, b) => {return sortStr(a.last_name_first_letter, b.last_name_first_letter);});
  postdoc_alumni.sort((a, b) => {return sortAlumni(a, b);});
  phd_alumni.sort((a, b) => {return sortAlumni(a, b);});
  masters_alumni.sort((a, b) => {return sortAlumni(a, b);});
  undergrad_alumni.sort((a, b) => {return sortAlumni(a, b);});
  highschool_alumni.sort((a, b) => {return sortAlumni(a, b);});

  return [senior_researchers, postdocs, phds, masters, undergrads, assoc, postdoc_alumni, phd_alumni, masters_alumni, undergrad_alumni, highschool_alumni];
}


