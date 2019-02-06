const simpleGit = require('simple-git')()

simpleGit
  .add('content')
  .commit(`Updated: ${new Date().toLocaleString()}`)
  .push()
