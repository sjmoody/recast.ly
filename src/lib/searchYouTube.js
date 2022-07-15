import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback) => {
  // TODO
  // Endpoint: https://app-hrsei-api.herokuapp.com/api/recastly/videos
  // Use jQuery to send a GET request to the search endpoint. This is the only time you should use jQuery in this sprint
  // Accept a callback function that is invoked with the videos array that is returned from hitting the endpoint
  // Accept an q string to search for
  let endpoint = 'https://app-hrsei-api.herokuapp.com/api/recastly/videos';
  // var url = Endpoint + query;
  $.get({
    url: endpoint,
    data: {q: query},
    success: callback
  });

};

export default searchYouTube;

