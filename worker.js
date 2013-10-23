var detect = require('strider-detection-rules')
var fs = require('fs')
var path = require('path')

function shellCommand(command) {
  if (!command || !command.replace(/#[^\n]*/g, '').trim().length) return
  return {
    command: 'sh',
    args: ['-x', '-c', command]
  }
}

module.exports = {
  init: function (config, job, context, done) {
    var venvDir = path.join(context.baseDir, '.venv')
    var test = undefined
    if (config && config.test !== 'none') {
      test = config.test
    }
    var defaultPrepare = function (context, done) {
        if (!fs.existsSync(path.join(context.dataDir, 'requirements.txt'))) {
          // skip if default and no requirements.txt exists
          // we assume that if you're configuring your own, you'll ensure the file exists
          return done(null, true)
        }
        context.cmd("pip install -r requirements.txt", function (err) {
          done(err, true)
        })
    }
    var prepare = defaultPrepare
    if (config && config.prepare) {
      prepare = shellCommand(config.prepare)
    }
    done(null, {
      path: [path.join(__dirname, 'thirdparty'),
             path.join(venvDir, 'bin')],
      environment: 'virtualenv.py ' + venvDir,
      prepare: prepare,
      test: test
    })
  },
  autodetect: {
    filename: 'requirements.txt',
    exists: true,
    language: 'python',
    framework: null
  }
}
