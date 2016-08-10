exports.getConstants = self => {
  try {
    return require(self.destinationPath('app/helpers/constants.json'))
  } catch (err) {
    return {}
  }
}
