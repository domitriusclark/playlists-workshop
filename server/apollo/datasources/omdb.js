const { RESTDataSource } = require("apollo-datasource-rest");

// First we will need to define how we will handle the REST API with our RESTDataSource

class OmdbAPI extends RESTDataSource {

}

module.exports = OmdbAPI;