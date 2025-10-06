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

function createCommitOnBranch(pages, htmls) {
  const expectedHeadOid = getExpectedHeadOid(); // Get expected head OID

  const url = 'https://api.github.com/graphql';
  const now = new Date();
  const ENV = env();
  const TOKEN = ENV['TOKEN'];
  const OWNER = ENV['OWNER'];
  const USER = ENV['USER'];
  const REPO = ENV['REPO'];
  const BRANCH = ENV['BRANCH'];

  // Dynamically form commit message + commit content
  let commit_prefix = '';
  let commit_suffix = ' - Update ';
  const fileChangeArr = []
  pages.forEach((page, index) => {
    const addition = {
      path: `${page}.html`,
      contents: Utilities.base64Encode(htmls[index]) // Base64 encode the contents      
    };
    fileChangeArr.push(addition);
    if (page === 'home') {
      const index_html = getFinalHTML('INDEX').getContent();
      const index_addition = {
        path: 'index.html',
        contents: Utilities.base64Encode(index_html) // Base64 encode the contents      
      };
      fileChangeArr.push(index_addition);
    }
    
    commit_prefix += ENV[`${page.toUpperCase()}_COMMIT_PREFIX`];
    commit_suffix += `${page}.html - `;
  });
  commit_suffix += `${now}`
  const commit_message = commit_prefix + commit_suffix;

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
          headline: commit_message
        },
        fileChanges: {
          additions: fileChangeArr
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
  //Logger.log('Commit URL: ' + commitUrl);
  return commitUrl;
}
