const { Octokit } = require('@octokit/core');

const octokit = new Octokit();

module.exports = async function verify(username){
	return await octokit.request('GET /users/{username}', {
  		username: username
		})
	.catch(error => {
    	return error
  })
}

