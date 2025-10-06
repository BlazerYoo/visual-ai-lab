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

// research test script
function researchTestingScript() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  const a = sheet.getRange('E5').getValue();
  spreadsheet.toast(a);
}

// Push research content
function researchPushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  
  spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
  sheet.getRange('A6').setValue('WAITING...');
  sheet.getRange('A7').setValue('...');

  try {  
    spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
    sheet.getRange('A6').setValue('WAITING...');
    sheet.getRange('A7').setValue('...');
    sheet.getRange('A8').setValue('...');

    const research_html = getFinalHTML('RESEARCH').getContent();
    const bib_html = getFinalHTML('BIB').getContent();
    const commit_url = createCommitOnBranch(['research', 'bib'], [research_html, bib_html]);

    sheet.getRange('A6').setValue('SUCCESS');
    sheet.getRange('A7').setFormula(`=HYPERLINK("${commit_url}", "Research Commit Link")`);
    sheet.getRange('A8').setValue('');
  } catch (err) {
    sheet.getRange('A6').setValue('FAILED');
    sheet.getRange('A7').setValue(err);
    sheet.getRange('A8').setValue(getFunctionNameFromStack(err));
  }
}

// Get home content
function getResearchContent() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');

  const people_list = getPeopleList();
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();

  const papers = {};

  for (var i = 1; i < data.length; i++) {
    const title = data[i][1];
    let authors = data[i][2];
    const note = data[i][3];
    let conf_journal = data[i][4] !== '' ? data[i][4] : data[i][5];
    let conf_abbrev = data[i][6];
    const track = data[i][7];
    const workshop = data[i][8];
    const accepted_date = data[i][9];
    let year = data[i][10];
    const paper_link = data[i][11];
    const code_link = data[i][12];
    let additional_links = data[i][13];
    let cvml_key = data[i][14];
    let hci_key = data[i][15];
    let accountability_key = data[i][16];
    const phd_thesis = data[i][17];

    if (phd_thesis !== "") {
      conf_journal = ("PhD Thesis, " + conf_journal)
    }

    // process year
    // Logger.log(year);
    year = year.getFullYear();

    // process authors list and profile pictures
    authors = authors.split(", ");
    let authors_list = [];
    let profile_pics = []
    for (var j = 0; j < authors.length; j++) {
      if (j === authors.length - 2) {
        authors_list += authors[j] + " and ";
      }
      else if (j === authors.length - 1) {
        authors_list += authors[j];
      }
      else {
        authors_list += authors[j] + ", ";
      }

      author_j_alpha = authors[j].replaceAll("*", "");
      if (people_list.includes(author_j_alpha)) {
        profile_pics.push(getProfilePic(author_j_alpha));
      }
    }
    if (profile_pics.length == 1 && authors.length > 1) {
      profile_pics = [];
    }

    let has_author_note = false;
    if (note !== '') {
      has_author_note = true;
    }

    // process whole conference/journal name
    let confjourn_name = conf_journal;
    if (conf_abbrev === '') {
      if (conf_journal in CONF_TO_ABBREV) {
        conf_abbrev = CONF_TO_ABBREV[conf_journal];
        conf_abbrev = " (" + conf_abbrev;
        if (workshop !== '') {
          conf_abbrev += "W";
        } 
        conf_abbrev += ")";
      }
    }
    else {
      conf_abbrev = " (" + conf_abbrev;
      if (workshop !== '') {
        conf_abbrev += "W";
      } 
      conf_abbrev += ")";
    }
    confjourn_name += conf_abbrev;
    if (workshop !== '') {
      confjourn_name += (" " + workshop);
    }
    if (track !== '') {
      confjourn_name += ', ' + track + " Track";
    }
    confjourn_name += ", " + year + ".";

    // process links 
    let links = [];
    if (paper_link !== '') {
      links.push(['paper', paper_link])
    }
    if (code_link !== '') {
      links.push(['code', code_link])
    }
    if (additional_links !== '') {
      additional_links = additional_links.split("\n");
      for (var j = 0; j < additional_links.length; j++) {
        var [label, hyperlink] = additional_links[j].split(", ");
        links.push([label, hyperlink])
      }
    }
    //Logger.log(authors_list)
    const paperAbbrev = `${getFirstLastName(data[i][2].replaceAll("*", ""))}${year}${compressTitle(title)}`;
    links.push(['bibtex', `bib.html#${paperAbbrev}`])

    // process keyterms
    let cvml_keys = [];
    let hci_keys = [];
    let accountability_keys = [];
    let cv = "";
    let hci = "";
    let fair = "";
    if (cvml_key !== '') {
      cvml_keys = cvml_key.split(", ");
      cv = "cv";
    }
    if (hci_key !== '') {
      hci_keys = hci_key.split(", ");
      hci = "hci";
    }
    if (accountability_key !== '') {
      accountability_keys = accountability_key.split(", ");
      fair = "fair";
    }

    const paper = {
      title: title,
      authors_list: authors_list,
      has_author_note: has_author_note,
      note: note,
      confjourn_name: confjourn_name,
      profile_pics: profile_pics,
      links: links,
      cvml_keys: cvml_keys,
      hci_keys: hci_keys,
      accountability_keys: accountability_keys,
      tags: "m-3 sm:mx-5 text-xs sm:text-sm md:text-base mb-6 " + cv + " " + hci + " " + fair + " paper"
    };

    Logger.log(title);
    // if (title.search("Help") !== -1) {
    //   Logger.log(paper);
    // }
    
    if (year in papers) {
     papers[year].push(paper); 
    }
    else {
      papers[year] = [paper];
    }
  }

  const papers_list = [];
  for (let year in papers) {
    papers_list.push([year, papers[year]]);
  }

  papers_list.sort((a, b) => {return sortPaperByYear(a, b);});

  return papers_list; 
}




// Get research content
function getResearchContentData() {
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('research');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // Initialize an array to hold the papers
  const papers = [];
  
  // Skip headers and iterate row by row
  for (let i = data.length - 1; i >= 1; i--) {
    const title = data[i][1];
    let authors = data[i][2];
    const conf_journ = data[i][4] !== '' ? data[i][4] : data[i][5];
    const conf_or_journ = data[i][4] !== '' ? 'conference' : 'journal';
    const abbrev = data[i][6];
    const track = data[i][7];
    const workshop = data[i][8];
    const year = data[i][10];
    const phd_thesis = data[i][17];

    let is_phd_thesis = false;
    if (phd_thesis !== "") {
      is_phd_thesis = true;
    }

    // Break when no more papers
    if (title === '') {
      break;
    }
    
    authors = authors.replaceAll("*", "");
    
    // Create a paper object
    const paper = {
      title: title,
      authors: authors,
      conf_journ: conf_journ,
      conf_or_journ: conf_or_journ,
      abbrev: abbrev,
      track: track,
      workshop: workshop,
      year: year.getFullYear(),
      is_phd_thesis: is_phd_thesis
    };
    
    // Add the paper object to the papers array
    papers.push(paper);
  }

  papers.sort((a, b) => {return sortPaperByYearSimple(a, b);});
  
  // Convert the papers array to JSON
  // const papersJSON = JSON.stringify(papers, null, 2);

  //Logger.log(papersJSON);
  return papers;
}

// Extract first author last name
function getFirstLastName(authors) {
  return authors.toLowerCase().split(',')[0].split(' ').at(-1)
}

// Compress title
function compressTitle(title) {
   // Split by spaces (multiple spaces included)
  const words = title.split(/\s+/);

  // Take first four words
  const NUM_WORDS_TO_TAKE = 1;
  const firstFewWords = words.slice(0, NUM_WORDS_TO_TAKE).join(' ');

  // Remove spaces, punctuation, and convert to lowercase
  const compressed = firstFewWords
    .toLowerCase()
    .replace(/[^\w]|_/g, '');

  return compressed
}

// 
function convertToBibTeX(papers) {
  let visualai_bib = '<pre>';

  for (const conf in CONF_TO_ABBREV) {
    visualai_bib += `@string{${CONF_TO_ABBREV[conf].toLowerCase()} = "${conf} (${CONF_TO_ABBREV[conf]})"}\n`;
  }

  let preprint_BibTeX = '';
  let published_BibTeX = '';
  
  papers.forEach((paper) => {
    const paperAbbrev = `${getFirstLastName(paper.authors)}${paper.year}${compressTitle(paper.title)}`;

    if (paper.conf_journ.toLowerCase().includes('arxiv')) {
      preprint_BibTeX += `
<pre data-title="${paperAbbrev}">
@article{${paperAbbrev},
  author={${paper.authors.replaceAll(',', ' and')}},
  title={{${paper.title}}},
  journal={${paper.conf_journ}},
  year={${paper.year}}
}
</pre>
`;
    } else if (paper.is_phd_thesis) {
      published_BibTeX += `
<pre data-title="${paperAbbrev}">
@phdthesis{${paperAbbrev},
  title={{${paper.title}}},
  author={${paper.authors.replaceAll(',', ' and')}},
  school={${paper.conf_journ}},
  year={${paper.year}}
}
</pre>
`;
    } else {
      if (paper.conf_or_journ === 'conference') {
        let booktitle = `${paper.conf_journ}${paper.abbrev !== '' ? ` (${paper.abbrev})` : (CONF_TO_ABBREV[paper.conf_journ] !== undefined ? ` (${CONF_TO_ABBREV[paper.conf_journ]})` : '')}`;
        booktitle += `${paper.track !== '' ? `, ${paper.track} Track` : ''}`;
        booktitle += `${paper.workshop !== '' ? ` ${paper.workshop}` : ''}`;
        published_BibTeX += `
<pre data-title="${paperAbbrev}">
@inproceedings{${paperAbbrev},
  title={{${paper.title}}},
  author={${paper.authors.replaceAll(',', ' and')}},
  booktitle={${booktitle}},
  year={${paper.year}}
}
</pre>
`;
      } else {
        published_BibTeX += `
<pre data-title="${paperAbbrev}">
@article{${paperAbbrev},
  title={{${paper.title}}},
  author={${paper.authors.replaceAll(',', ' and')}},
  journal={${paper.conf_journ}${paper.abbrev !== '' ? ` (${paper.abbrev})` : (CONF_TO_ABBREV[paper.conf_journ] !== undefined ? ` (${CONF_TO_ABBREV[paper.conf_journ]})` : '')}},
  year={${paper.year}}
}
</pre>
`;
      }
    }
  });

  visualai_bib += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% selected preprints
%%%%%%%%%%%%%%%%%%%%%%%%%%%</pre>${preprint_BibTeX}
<pre>%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% published
%%%%%%%%%%%%%%%%%%%%%%%%%%%</pre>${published_BibTeX}
`;

  // Logger.log(visualai_bib);
  return visualai_bib;
}

