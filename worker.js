var detect = require('strider-detection-rules')
var fs = require('fs')
var path = require('path')

module.exports = {
  init: function (config, job, context, done) {
    var venvDir = path.join(context.baseDir, '.venv')
    done(null, {
      path: [path.join(__dirname, 'thirdparty'),
             path.join(venvDir, 'bin')],
      environment: 'virtualenv.py ' + venvDir,
      prepare: function (context, done) {
        if (fs.existsSync(path.join(context.dataDir, 'requirements.txt'))) {
          return context.cmd('pip install -r requirements.txt', function (err) {
            done(err, true)
          })
        }
        done(null, false)
      },
      test: (config && config.test !== 'none') ? config.test : undefined
    })
  },
  autodetect: {
    filename: 'requirements.txt',
    exists: true,
    language: 'python',
    framework: null
  }
}
