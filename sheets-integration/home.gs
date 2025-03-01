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

function getAcknowledgementsAwards() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('home');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  // Logger.log(data);

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
    const award_link = data[i][6];
    const award_date = data[i][7];

    // Break when no more awards
    if (name === '') {
      break
    }

    let is_link = false;
    if (award_link !== '') {
      is_link = true;
    }

    // Compile names
    let names_list = title === '' ? name : `${title} ${name}`;
    if (add_names !== '') {
      names_list += ", " + add_names;
    }
    
    // Extract year
    const year = award_date.getFullYear();
    const month = award_date.getMonth();
    
    // Create a award object
    const award = {
      name: name,
      names: names_list,
      award_name: award_name,
      title: award_name,
      subtitle: names_list,
      date: award_date,
      month: month,
      month_name: MONTHS[month],
      year: year,
      is_award: true,
      is_link: is_link,
      link: award_link
    };
    
    // Add the award object to the award array
    awards.push(award);
  }
  
  // Convert the papers array to JSON
  // const awardsJSON = JSON.stringify(awards, null, 2);

  return [acknowledgments, awards];
}

function getRecentPapers() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();

  const papers = [];

  var today = new Date();

  for (var i = 1; i < data.length; i++) {
    let title = data[i][1];
    let authors = data[i][2];
    const note = data[i][3];
    let conf_journal = data[i][4] !== '' ? data[i][4] : data[i][5];
    const conf_abbrev = data[i][6];
    let track = data[i][7];
    const workshop = data[i][8];
    const date = data[i][9];
    const paper_link = data[i][11];
    const phd_thesis = data[i][17];

    if (phd_thesis !== "") {
      conf_journal = ("PhD Thesis, " + conf_journal)
    }

    let is_link = false;
    if (paper_link !== '') {
      is_link = true;
    }

    // Logger.log(date);

    const year = date.getFullYear();
    const month = date.getMonth();

    const num_days_passed = Math.abs(date - today) / 1000 / 60 / 60 / 24;
    
    if (num_days_passed < 12 * 30) { // in last 12 months

      let authors_list = '';
      if (authors !== '') {
        authors = authors.split(", ");

        authors_list += authors[0];
        for (var j = 1; (j < authors.length) && (j < 3); j++) {
          authors_list += (", " + authors[j]);
        }

        if (authors.length > 3) {
          authors_list += ", et al."
        }

        if (note !== '') {
          authors_list += (" " + note); 
        }
      }

      let conference_name = '';
      if (conf_abbrev === '') {
        if (conf_journal in CONF_TO_ABBREV) {
          conference_name = CONF_TO_ABBREV[conf_journal];
        }
      }
      if (conference_name === '') {
        conference_name = conf_journal;
      }

      if (workshop !== '') {
        conference_name += (" " + workshop);
      }

      if (track !== '') {
        track = ', ' + track + " Track";
      }

      if (conference_name.toLowerCase().includes("arxiv")) {
        title = '"' + title + '" preprint out on arXiv ' + year + " " + track;
      }
      else if (conference_name.toLowerCase().includes("phd thesis")) {
        title = '"' + title + '" PhD Thesis complete ' + year + " " + track;
      }
      else {
        title = '"' + title + '" accepted to ' + conference_name + " " + year + " " + track;
      }

      
          
      const paper = {
        title: title,
        subtitle: authors_list,
        month: month,
        month_name: MONTHS[month],
        year: year,
        is_award: false,
        is_link: is_link,
        link: paper_link
      };

      papers.push(paper);
    }
  }

  return papers;
}
  
// Get home content
function getHomeAwardContent() {
  var [acknowledgments, awards] = getAcknowledgementsAwards();
  const papers = getRecentPapers();

  let home_timeline = [];
  const today = new Date();
  for (var i = 0; i < awards.length; i++) {
    const num_days_passed = Math.abs(awards[i].date - today) / 1000 / 60 / 60 / 24;
    
    if (num_days_passed < 12 * 30) {
      home_timeline.push(awards[i]);
    } 
  }
  for (var i = 0; i < papers.length; i++) {
    home_timeline.push(papers[i]);
  }

  home_timeline.sort((a, b) => {return sortTimeline(a, b);});

  Logger.log(home_timeline);

  return [acknowledgments, home_timeline];
}


