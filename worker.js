var path = require('path')

module.exports = {
  init: function (config, job, context, done) {
    var venvDir = path.join(context.dataDir, '.venv')
    done(null, {
      path: [path.join(__dirname, 'thirdparty'),
             path.join(venvDir, 'bin')],
      environment: 'virtualenv.py ' + venvDir,
      prepare: 'pip install -r requirements.txt',
      test: config.test !== 'none' ? config.test : undefined
    })
  },
  autodetect: {
    filename: 'requirements.txt',
    exists: true,
    language: 'python',
    framework: null
  }
}
