// Push home content
function communityPushToGitHub() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('community');
  
  spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
  sheet.getRange('A6').setValue('WAITING...');
  sheet.getRange('A7').setValue('...');

  try {  
    Logger.log("1");
    spreadsheet.toast('Pushing to GitHub...', 'VISUAL_AI');
    sheet.getRange('A6').setValue('WAITING...');
    sheet.getRange('A7').setValue('...');
    sheet.getRange('A8').setValue('...');

    Logger.log("2");
    const html = getFinalHTML('COMMUNITY').getContent();
    Logger.log("2.1");
    const commit_url = createCommitOnBranch(['community'], [html]);

    Logger.log("3");
    sheet.getRange('A6').setValue('SUCCESS');
    sheet.getRange('A7').setFormula(`=HYPERLINK("${commit_url}", "Community Commit Link")`);
    sheet.getRange('A8').setValue('');
  } catch (err) {
    sheet.getRange('A6').setValue('FAILED');
    sheet.getRange('A7').setValue(err);
    sheet.getRange('A8').setValue(getFunctionNameFromStack(err));
  }
}

// Get home content
function getCommunityContent() {
  Logger.log("Started running.")
  const  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('community');
  
  // Get all the data in the sheet
  const data = sheet.getDataRange().getValues();
  
  // Initialize an array to hold the awards
  const workshops = [];
  
  // Skip headers and iterate row by row
  for (let i = 1; i < data.length; i++) {
    let name = data[i][1];
    const link = data[i][2];
    const venue_abbrev = data[i][3];
    const year = data[i][4];
    const photo = data[i][5];
    let people = data[i][6];
    let note = data[i][7];
    let full_organizers = data[i][8];

    // postprocess name
    name = name + " @ " + venue_abbrev + " " + year;

    let is_link = true;
    if (link === '') {
      is_link = false;
    }

    // postprocess photo
    let banner;
    if (photo === '') {
      banner = ["flex bg-orange-400 justify-center text-center items-center h-40 w-40 sm:h-80 sm:w-80",
      "flex justify-center items-center h-40 w-40 sm:h-80 sm:w-80",
      "text-sm sm:text-3xl font-mono font-bold text-center mx-5 p-2"];
      // banner = '<div class="flex bg-orange-400 justify-center text-center items-center h-40 w-40 sm:h-80 sm:w-80">' + name + '</div>'
    }
    else {
      banner = ["flex mix-blend-multiply bg-cover bg-[url('" + photo + "')] items-center h-40 w-40 sm:h-80 sm:w-80", 
      "flex bg-gradient-to-r from-orange-500/50 to-white/50 justify-center items-center h-40 w-40 sm:h-80 sm:w-80",
      "opacity-100 text-sm sm:text-3xl font-mono font-bold text-center bg-white mx-5 p-2"];
      // banner = `<div class="flex mix-blend-multiply bg-cover bg-[url('` + photo + `')] items-center h-40 w-40 sm:h-80 sm:w-80">
      //               <div
      //                   class="flex bg-gradient-to-r from-orange-500/50 to-white/50 justify-center items-center h-40 w-40 sm:h-80 sm:w-80">
      //                   <div class="opacity-100 text-sm sm:text-3xl font-code font-bold text-center bg-white mx-5 p-2">` + 
      //                       name + `</div></div></div>`
    }

    // postprocess people list
    if (people.length > 0) {
      people = people.split(", ");
    }
    Logger.log(people);
    profile_pics = []
    people_names = []
    for (let j = 0; j < people.length; j++) {
      profile_pics[j] = getProfilePic(people[j], "");
      let last_name_first_letter = people[j].split(" ");
      Logger.log(last_name_first_letter);
      last_name_first_letter = last_name_first_letter[last_name_first_letter.length - 1].substring(0, 1);
      people_names.push(people[j].split(" ")[0] + " " + last_name_first_letter + ".");
    }

    Logger.log(people_names);

    // postprocess note
    note_space_index = note.indexOf(" ")
    if (note_space_index !== -1) {
      note = [note.substring(0, note_space_index), note.substring(note_space_index + 1)];
    }

    // Logger.log(name.split(" "));
    // Logger.log(last_name_first_letter);

    // Create workshop representation
    const workshop = {
      banner: banner,
      link: link,
      is_link: is_link,
      name: name,
      profile_pics: profile_pics,
      people_names: people_names,
      note: note,
      organizers: full_organizers
    };

    Logger.log(full_organizers);

    workshops.unshift(workshop);
  }

  return workshops;
}
