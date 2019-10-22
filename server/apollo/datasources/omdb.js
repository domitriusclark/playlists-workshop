const { RESTDataSource } = require("apollo-datasource-rest");

class OmdbAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = "http://www.omdbapi.com/?";
  }

  mediaReducer(media) {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      Ratings,
      MetaScore,
      imdbRating,
      imdbVotes,
      imdbID,
      Type,
      totalSeasons,
      Response
    } = media;
    return {
      title: Title,
      year: Year,
      rated: Rated,
      released: Released,
      runtime: Runtime,
      genre: Genre,
      director: Director,
      writer: Writer,
      actors: Actors,
      plot: Plot,
      language: Language,
      country: Country,
      awards: Awards,
      poster: Poster,
      source: Ratings.source,
      value: Ratings.value,
      metascore: MetaScore,
      imdbRating,
      imdbVotes,
      imdbID,
      type: Type,
      totalSeasons,
      response: Response
    };
  }

  async getMediaDetails(title) {
    const response = await this.get(
      `?t=${title.replace(" ", "+")}&apikey=${process.env.OMDB_KEY}`
    );

    return this.mediaReducer(response);
  }
}

module.exports = OmdbAPI;