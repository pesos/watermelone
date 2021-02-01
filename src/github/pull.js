const { Octokit } = require('@octokit/core');

const octokit = new Octokit();

module.exports = async function get_pr(username) {
  const prs = await octokit.request('GET /search/issues', {
    q: 'is:pr+repo:pesos/members-list+author:' + username + '+is:merged'
  })

  const content = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
    owner: 'pesos',
    repo: 'members-list',
    pull_number: prs.data.items[0].number
  })

  var dets = []

  for (const info of content.data[0].patch.split(/\r\n|\r|\n/)) {
    if (info.startsWith('+') & info.substring(1) != '') {
      dets.push(info.substring(1));
    }
  }
  dets = dets.join('\n')
  var user_det = {}
  user_det.Name = dets.split('**SRN**')[0].split('**Name**')[1].split(':')[1].split('<br/>')[0].trim()
  user_det.SRN = dets.split('**SRN**')[1].split('**Link to Profile**')[0].split(':')[1].split('<br/>')[0].trim()
  user_det.Github = dets.split('**Link to Profile**')[1].split('**About Me**')[0].trim().substring(1).split('<br/>')[0].trim()
  user_det.about = dets.split('**About Me**')[1].split(':')[1].split('<br/>')[0].trim()

  return user_det;
};


