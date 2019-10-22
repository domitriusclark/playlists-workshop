import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Dropdown from '../Dropdown';

const SEARCH_MEDIA = gql`
  query SearchMedia($title: String) {
    showOrMovieData(title: $title) {
      title
      plot
      poster
      imdbRating
      totalSeasons
    }
  }
`;

const MediaCard = ({ search }) => {
  const { data: mediaData, loading } = useQuery(SEARCH_MEDIA, {
    variables: {
      title: search
    }
  });

  if (loading) return <p>Loading...</p>;

  const renderSeasonCount = mediaData.showOrMovieData.totalSeasons !== null && <p><span>{mediaData.showOrMovieData.totalSeasons}</span> seasons</p>

  return (
    <div>
      <div>
        <img src={mediaData.showOrMovieData.poster} alt="Media poster" />
      </div>
      <div>
        <h1>{mediaData.showOrMovieData.title}</h1>
        <div>
          <div>
            <p><span>{mediaData.showOrMovieData.imdbRating}</span> of 10</p>
            {renderSeasonCount}
          </div>
          <div>
            <p>{mediaData.showOrMovieData.plot}</p>
            <Dropdown mediaData={mediaData} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MediaCard;