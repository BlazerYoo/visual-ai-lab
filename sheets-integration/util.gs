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