
module.exports = {
  config: {
    runtime: {
      type: String,
      default: '2.7'
    },
    test: {
      type: String,
      enum: ['none', 'py.test', 'python setup.py test', 'make test'],
      default: 'python setup.py test'
    },
    prepare: {
      type: String,
      default: 'pip install -r requirements.txt'
    }
  }
}
