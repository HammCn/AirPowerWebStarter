const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;
    const issue_number = github.context.issue.number;

    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: 'This is a comment from your custom GitHub Action!'
    });

    console.log(`Comment created: ${response.data.html_url}`);
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

run();
