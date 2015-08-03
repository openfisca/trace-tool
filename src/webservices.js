/*
OpenFisca -- A versatile microsimulation software
By: OpenFisca Team <contact@openfisca.fr>

Copyright (C) 2011, 2012, 2013, 2014, 2015 OpenFisca Team
https://github.com/openfisca

This file is part of OpenFisca.

OpenFisca is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

OpenFisca is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


const debug = require("debug")("app:webservices")


// Fetch polyfill

function loadFetch() {
  if (!window.fetch) {
    require("whatwg-fetch")
  }
  return window.fetch
}
let fetch = loadFetch()


// Generic fetch functions

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const responseData = await response.json()
    const message = responseData.error && responseData.error.message ? responseData.error.message : response.statusText
    let error = new Error(message)
    error.response = response
    error.responseData = responseData
    error.data = responseData.error
    throw error
  }
}


function fetchJson(url, options) {
  return loggedFetch(url, options)
    .then(checkStatus)
    .then(parseJson)
}


function loggedFetch(url, ...args) {
  debug("About to fetch URL", url)
  return fetch(url, ...args)
}


function parseJson(response) {
  return response.json()
}


// API fetch functions

function calculate(apiBaseUrl, simulationData) {
  return fetchJson("http://localhost:8080/calculate-result.json")
  // return fetchJson(
  //   apiBaseUrl + "/api/1/calculate",
  //   {
  //     body: JSON.stringify(simulationData),
  //     credentials: "same-origin",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     method: "post",
  //   }
  // )
}


function fetchVariable(apiBaseUrl, name) {
  // TODO update to variables endpoint
  return fetchJson(apiBaseUrl + "/api/1/variables?name=" + name)
}


export default {calculate, fetchVariable}