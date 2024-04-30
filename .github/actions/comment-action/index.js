const { GitHub, context } = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const tools = new Toolkit();

async function run() {
  try {
    const octokit = new GitHub(tools.inputs['github-token']);
    const { owner, repo } = context.repo;
    const issue_number = context.issue.number;

    const comment = {
      owner,
      repo,
      issue_number,
      body: 'This is a comment from your custom GitHub Action!'
    };

    await octokit.issues.createComment(comment);
    tools.log.success('Comment posted successfully!');
  } catch (error) {
    tools.log.error(`Failed to post comment: ${error.message}`);
    tools.exit.failure();
  }
}

run();
