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


// Polyfills, loaded at the very first.

require("babel-core/polyfill")

import hljs from "highlight.js/lib/highlight"
hljs.registerLanguage("python", require("highlight.js/lib/languages/python"))


import React from "react"

// import * as perf from "./perf"
import {IntlApp, intlData, polyfillIntl} from "./intl"


function renderApp() {
  // if (process.env.NODE_ENV === "development") {
  //   // Monkey-patch React.render and React.Component.prototype.setState to display Perf measurements.
  //   perf.monkeyPatch(React)
  // }
  const appMountNode = document.getElementById("app-mount-node")
  React.render(<IntlApp {...intlData} />, appMountNode)
}


polyfillIntl(renderApp)
