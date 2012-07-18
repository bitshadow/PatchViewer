#!/usr/bin/env node
/*
 *  Copyright (C) 2011 Jignesh Kakadiya <jigneshhk1992@gmail.com>
 *  
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor,
 *  Boston, MA 02110-1301, USA.
*/

var sys = require("util")
    reader = require("./Reader"),
    util = require("./util")

var NL = "\n";

function Mapper() {

  /** Content of the patch file */
  this._data = "";

  /** Contains diff lines */
  this._lines = [];

};

/**
 * returns data from given file path supplied
 *
 * @param  path full path of patch file
 */
Mapper.prototype.getContent = function (path) {
  if (!path) {
    console.log("null path");
    return false;
  }

  return this._data = reader.Read(path);
};

/** Splits the data into lines and returns 
 *  list containg line wise patch
 *
 *  @param data content from file which will be 
 *  splitted into line array
 */
Mapper.prototype.splitData = function (data) {
  if (!data) {
    console.log("null data")
    return false;
  }

  var input = data.replace(/\r\n/g, '\n');
  lines = input.split('\n');

  return this.lines = lines;
};

/*
 * Function will display the data lines in
 * different colour styles.
 */
Mapper.prototype.display = function () {

  var d = this.getContent(process.argv[2]);
  var l = this.splitData(d);

  for(var i=0; i< lines.length ; i++)
  {
    //if(lines[i].startsWith("/\+/g"))
    switch(lines[i][0]) {

    case '#':
      sys.print(this.stylize(lines[i], 'blue') + NL);
      break;
    case 'd':
    case '+':
      sys.print(this.stylize(lines[i], 'green') + NL);
      break;
    case '-':
      sys.print(this.stylize(lines[i], 'red') + NL);
      break;
    case '@':
      sys.print(this.stylize(lines[i], 'yellow') + NL);
      break;
    default:
      sys.print(this.stylize(lines[i], 'white') + NL);
      break;
    }
  }
};

/**
 * Available colour schemes
 *
 * @param msg line on which style will be applied
 * @param style colour to apply on msg
 *
 * @return line with style applied
 */
Mapper.prototype.stylize = function (msg, style) {
  var styles = {
    'yellow'    : [33, 39],
    'green'     : [32, 39],
    'red'       : [31, 39],
    'white'     : [40, 39],
    'magenta'   : [35, 39],
    'blue'      : [34, 39],
    'black'     : [29, 39]
  };

  return '\033[' + styles[style][0] + 'm' + msg +
         '\033[' + styles[style][1] + 'm';

}


mapper = new Mapper();
mapper.display();

//TO DO
//function for max and min
