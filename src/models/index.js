const ENGINE_DB = process.env.ENGINE_DB
const pathModels = (ENGINE_DB === 'nosql' ? "./nosql": "./mysql")
console.log('path', pathModels)
const models = {
    usersModel: require(`${pathModels}/users_models`),
    tracksModel: require(`${pathModels}/tracks_models`),
    storageModel: require(`${pathModels}/storage_models`)
}

module.exports = models
