'use strict';

const apiKey = 'kACfc5UKw9UWX7uzD7MDo0zfrXRg3cPH8bII6Hyq';
const apiUrl =  'https://developer.nps.gov/api/v1/parks?';

function watchForm() { //listen for input sumbission and call functions to update the DOM with results.
    $('form').submit(event => {
        event.preventDefault();

        const stateQuery = $('#states').val();
        const numResults = $('#js-results').val();
        
        getParks(stateQuery, numResults);
    });
}

function displayResults(responseJson) { //update the DOM with found parks
    $('#results-list').empty();
    
    for(let park of responseJson.data){
        $('#results-list').append(formatResult(park));
    }
    $('#results').removeClass('hidden');
}

function formatResult(park) {
    return `
    <li>
    <h3>${park.fullName}</h3>
    <p>${park.description}</p>
    <a href='${park.url}'>${park.url}</a>
    `;
}

function getParks(states, numberResults) { //make GET request to the nps api to get a list of parks in the queried states up to the number of requested results
    const url = apiUrl + `statecode=${states}&limit=${numberResults}&api_key=${apiKey}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

watchForm();
