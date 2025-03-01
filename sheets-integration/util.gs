const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CONF_TO_ABBREV = {'Advances in Neural Information Processing Systems': 'NeurIPS',
  'International Conference on Machine Learning': 'ICML',
  'Proceedings of the Annual Meeting of the Cognitive Science Society': 'CogSci',
  'International Conference on Learning Representations': 'ICLR',
  'Transactions on Machine Learning Research': 'TMLR',
  'Neural Information Processing Systems': 'NeurIPS',
  'International Conference on Computer Vision': 'ICCV',
  'Computer Vision and Pattern Recognition': 'CVPR',
  'ACM Conference on Human Factors in Computing Systems': 'CHI',
  'Signal, Image and Video Processing': 'SIViP',
  'European Conference on Computer Vision': 'ECCV',
  'ACM Conference on Fairness, Accountability, and Transparency': 'FAccT',
  'Association for Computational Linguistics': 'ACL',
  'British Machine Vision Conference': 'BMVC',
  'Conference on Fairness, Accountability and Transparency': 'FAT*',
  'Winter Conference on Applications of Computer Vision': 'WACV',
  'International Journal of Computer Vision': 'IJCV',
  'Conference on Human Computation and Crowdsourcing': 'HCOMP',
  'Special Interest Group on Computer Science Education': 'SIGCSE',
  'International Conference on Robotics and Automation': 'ICRA'
  };

const JOURNALS = ['International Journal of Computer Vision', 'ReScience C', 'Foundation and Trends in Computer Graphics and Vision'];

function getFinalHTML(page) {
  return HtmlService
      .createTemplateFromFile(page)
      .evaluate();
}

function getProfilePic(name, postfix = "") {
  const pic = "assets/" + name.replaceAll(" ", "_").replaceAll(".", "").replaceAll("(", "").replaceAll(")", "").toLowerCase() + postfix + ".jpg";

  return pic;
}

function sortPaperByYear(a, b) {
  if (a[0] < b[0]) {
    return 1;
  }
  if (b[0] < a[0]) {
    return -1;
  }
  
  return 0;
}

function sortPaperByYearSimple(a, b) {
  if (a.year < b.year) {
    return 1;
  }
  if (b.year < a.year) {
    return -1;
  }
  
  return 0;
}

function sortTimeline(a, b) {
  if (a.year < b.year) {
    return 1;
  }
  if (b.year < a.year) {
    return -1;
  }
  if (a.month < b.month) {
    return 1;
  }
  if (b.month < a.month) {
    return -1;
  }

  return 0;
}

function sortAlumni(a, b) {
  if (a.sortyear < b.sortyear) {
    return 1;
  }
  if (b.sortyear < a.sortyear) {
    return -1;
  }
  if (a.last_name_first_letter > b.last_name_first_letter) {
    return 1;
  }
  if (b.last_name_first_letter > a.last_name_first_letter) {
    return -1;
  }
  return 0;
}

// sort in alphabetical order
function sortStr(a, b) {
  Logger.log(a, b);
  // if a is after b
  if (a > b) { 
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
}

function getFunctionNameFromStack(error) {
  // Parse the error stack to extract the function name
  const stackLines = error.stack.split("\n");
  if (stackLines.length > 1) {
    const functionLine = stackLines[1].trim(); // Typically the second line contains the function name
    const match = functionLine.match(/at (\S+)/);
    if (match && match[1]) {
      return match[1]; // Extracted function name
    }
  }
  return "Anonymous or global scope"; // Fallback if no function name is found
}