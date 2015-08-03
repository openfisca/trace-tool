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


import {Component, PropTypes} from "react"

import {PureComponent} from "../decorators"


@PureComponent
export default class Value extends Component {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
  }
  format = () => {
    const {type, value} = this.props
    if (value === "") {
      return "\"\""
    } else {
      var formattedValue = value.toLocaleString("fr")
      if (type === "monetary") {
        formattedValue += " €"
      }
      return formattedValue
    }
  }
  render = () => {
    const {title} = this.props
    const formattedValue = this.format()
    return (
      <span title={title}>{formattedValue}</span>
    )
  }
}