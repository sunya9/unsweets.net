const simpleGit = require('simple-git')()

simpleGit
  .add('source')
  .commit(`Updated: ${new Date().toLocaleString()}`)
  .push()
