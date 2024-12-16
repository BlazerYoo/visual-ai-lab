function getExpectedHeadOid() {
  const url = 'https://api.github.com/graphql';
  const ENV = env();
  const TOKEN = ENV['TOKEN'];
  const OWNER = ENV['OWNER'];
  const USER = ENV['USER'];
  const REPO = ENV['REPO'];
  const BRANCH = ENV['BRANCH'];
  var query = `
  {
    repository(owner: "${OWNER}", name: "${REPO}") {
      ref(qualifiedName: "refs/heads/${BRANCH}") {
        target {
          ... on Commit {
            oid
          }
        }
      }
    }
  }`;

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "bearer " + TOKEN
    },
    payload: JSON.stringify({ query: query }),
    muteHttpExceptions: true // Set to true to capture error responses
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  // Extract expected head OID
  const expectedHeadOid = jsonResponse.data.repository.ref.target.oid;

  Logger.log('Expected Head OID: ' + expectedHeadOid);
  return expectedHeadOid;
}

function createCommitOnBranch(page, html) {
  const expectedHeadOid = getExpectedHeadOid(); // Get expected head OID

  const url = 'https://api.github.com/graphql';
  const now = new Date();
  const ENV = env();
  const COMMIT_PREFIX = ENV[`${page.toUpperCase()}_COMMIT_PREFIX`];
  const TOKEN = ENV['TOKEN'];
  const OWNER = ENV['OWNER'];
  const USER = ENV['USER'];
  const REPO = ENV['REPO'];
  const BRANCH = ENV['BRANCH'];
  const payload = {
    query: `mutation ($input: CreateCommitOnBranchInput!) {
      createCommitOnBranch(input: $input) {
        commit {
          url
        }
      }
    }`,
    variables: {
      input: {
        branch: {
          repositoryNameWithOwner: `${OWNER}/${REPO}`,
          branchName: `${BRANCH}`
        },
        message: {
          headline: `${COMMIT_PREFIX} - Update ${page}.html - ${now}`
        },
        fileChanges: {
          additions: [{
            path: `${page}.html`,
            contents: Utilities.base64Encode(html) // Base64 encode the contents
          }]
        },
        expectedHeadOid: expectedHeadOid
      }
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'bearer ' + TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // Set to true to capture error responses
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());
  
  // Extract and log the commit URL
  const commitUrl = jsonResponse.data.createCommitOnBranch.commit.url;
  Logger.log('Commit URL: ' + commitUrl);
}
