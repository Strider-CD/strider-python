
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
      enum: ['none', 'py.test', './setup.py test', 'make test'],
      default: 'py.test'
    }
  }
}
