
module.exports = {
  config: {
    /* we don't support this yet
    runtime: {
      type: String,
      enum: ['2.6', '2.7', '3.3', 'whatever']
    },
    */
    test: {
      type: String,
      enum: ['none', 'py.test', 'python setup.py test', 'make test'],
      default: 'python setup.py test'
    }
  }
}
