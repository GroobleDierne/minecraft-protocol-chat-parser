const features = require('./features.json')

const featureFromName = Object.fromEntries(features.map(obj => [obj.name, obj]))

module.exports = (name, protocolVersion) => {
    const feature = featureFromName[name]
    if (feature === undefined) throw new Error(`The feature ${feature} doesn't exist`)
  
    const from = feature.versions[0]
    const to = feature.versions[1] | protocolVersion
  
    return from <= protocolVersion && protocolVersion <= to
}