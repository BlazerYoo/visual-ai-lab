function getFinalHTML(page) {
  return HtmlService
      .createTemplateFromFile(page)
      .evaluate();
}

function getProfilePic(name, postfix = "") {
  const pic = "assets/" + name.replaceAll(" ", "_").replaceAll(".", "").toLowerCase() + postfix + ".jpg";

  return pic;
}

function sortStr(a, b) {
  Logger.log(a, b);
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
}