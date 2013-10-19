var detect = require('strider-detection-rules')
var fs = require('fs')
var path = require('path')

module.exports = {
  init: function (config, job, context, done) {
    var venvDir = path.join(context.baseDir, '.venv')
    var test = undefined
    if (config && config.test !== 'none') {
      test = config.test
    }
    var defaultPrepare = "pip install -r requirements.txt"
    var prepare = defaultPrepare
    if (config && config.prepare) {
      prepare = config.prepare
    }
    done(null, {
      path: [path.join(__dirname, 'thirdparty'),
             path.join(venvDir, 'bin')],
      environment: 'virtualenv.py ' + venvDir,
      prepare: function (context, done) {
        if (prepare === defaultPrepare && !fs.existsSync(path.join(context.dataDir, 'requirements.txt'))) {
          // skip if default and no requirements.txt exists
          // we assume that if you're configuring your own, you'll ensure the file exists
          return done(null, true)
        }
        context.cmd(prepare, function (err) {
          done(err, true)
        })
      },
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
