var detect = require('strider-detection-rules')
var path = require('path')

// We include a copy of the virtualenv script
var VIRTUAL_ENV_PY = path.join(__dirname, "thirdparty", "virtualenv.py")
// Virtual environment will be under this directory name in the project dir
var VIRTUAL_ENV_DIR = "venv"
// Command to create the virtual env
var VIRTUAL_ENV_CMD = "python " + VIRTUAL_ENV_PY + " " + VIRTUAL_ENV_DIR
var VIRTUAL_PYTHON = path.join(VIRTUAL_ENV_DIR, "bin", "python")
var VIRTUAL_PIP = path.join(VIRTUAL_ENV_DIR, "bin", "pip")
var CREATE_VIRTUAL_ENV = VIRTUAL_ENV_CMD + " && " + VIRTUAL_PIP + " install -r requirements.txt"

var RULES = [{
  filename:"manage.py",
  grep:/django/i,
  language:"python",
  framework:"django",
  prepare:CREATE_VIRTUAL_ENV,
  test:VIRTUAL_PYTHON + " manage.py test",
}, {
  filename:"setup.py",
  exists:true,
  language:"python",
  framework:null,
  prepare:CREATE_VIRTUAL_ENV,
  test:VIRTUAL_PYTHON + " setup.py test",
}]


module.exports = function(ctx, cb) {

  function doTest(ctx , cb){
    detect(RULES, "test", ctx, cb)
  }

  function doPrepare(ctx, cb) {
    detect(RULES, "prepare", ctx, cb)
  }

  ctx.addBuildHook({
    test: doTest,
    prepare: doPrepare,
  })

  console.log("strider-python extension loaded")
  cb(null, null)

}
