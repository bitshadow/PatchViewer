var reader = require("./Reader"),
    util = require("./util");

function Mapper() {

  /** Content of the patch file */
  this._data = "";

  /** Maps to modified file locations in lines */
  this._locMap = [];

  /** Contains diff lines */
  this._lines = [];

  /** Total number of files modified */
  this._files = 0;
}

/** returns data from given file path supplied
 *
 *  @param  path full path of patch file
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
 */
Mapper.prototype.splitData = function (data) {
  if (!data) {
    console.log("null data")
    return false;
  }

  var input = data.replace(/\r\n/g, '\n');
  lines = input.split('\n');

  return this.lines = lines;
}

/** parse the content and generate the location 
 *  mappings for generated files
 *  @param input string content of file
 */
Mapper.prototype.generateMap = function (lines) {

  if (lines.length < 1) {
    console.log("empty location map");
    return this._locMap;
  }

  var locmap = [];
  var files = 0;
  for (var i = 0; i < lines.length; i++) {
    var change = lines[i].startsWith("diff");
      if (change) {
        files = files + 1;
        locmap.push(i);
      }
  }

  this._lines = lines;
  this._files = files;
  return this._locMap = locmap;
};

/** Read line which contains begins with '@@'.
 *  parse it and return parsed information in
 *  list.
 *  format :
 *  { o_s:'37', o_e:'17', m_s:'34', m_e:'15', func: 'abcFunc' }
 *
 *  origional file : changes starts at : 37
 *                           ends at   : 37 + (17-1) = 53
 *  modified file  : changes starts at : 34
 *                           ends at   : 49
 *
 *  @param line input from this.lines
 */
Mapper.prototype.getDetails = function (line) {

  var doublet = line.startsWith("@@");
  if(!doublet) {
    console.log("line does not contain doublet");
    return false;
  }

  var d = line.split(/@@\ ?/g);
  d.splice(0, 1);
  d[0] = d[0].replace(/\+/g,'');
  d[0] = d[0].replace(/\-/g,'');
  d[0] = d[0].replace(/,/g,' ');
  d[0] = d[0].split(' ');
  var l = d[0].length - 1;
  d[0].splice(l, 1)

  var obj = {
    o_start : d[0][0],
    o_end   : d[0][1],
    m_start : d[0][2],
    m_end   : d[0][3],
    func    : d[1]
  };

  return obj;
};

Mapper.prototype.display = function () {

  var d = this.getContent(process.argv[2]);
  var l = this.splitData(d);
  var map =  this.generateMap(l);

  for(var i= map[0]; i< lines.length ; i++)
  {
    var diff = this.isDiff(l[i]);
    if(diff) {
      console.log(l[i]);
      i = i+3;
    }

    var doublet = this.isDoublet(l[i]);
    if(doublet){
      var initi = i+1; // we will be back again for origional and modified
      var map = this.getDetails(l[i]);
      var oStart = parseInt(map.o_start);
      var oEnd = parseInt(map.o_end);
      var mStart = parseInt(map.m_start);
      var mEnd = parseInt(map.m_end);
      var func = map.func;
      console.log("Lines: "+ oStart + "-"+ (oStart+oEnd-1) + " "+ func);

    }
  }
};

Mapper.prototype.isDiff = function (line) {
  return line.startsWith("diff");
};

Mapper.prototype.isDoublet = function (line) {
  return line.startsWith("@@");
}

Mapper.prototype.add = function (a, b) {
  return a+b;
};

Mapper.prototype.getData = function () {
  return this.data;
};

Mapper.prototype.fileModified = function () {
  return this.files;
};

Mapper.prototype.getLines = function () {
  return this._lines;
};

Mapper.prototype.getLocMap = function () {
  return this._locMap;
};

mapper = new Mapper();
mapper.display();

//TO DO
//function for max and min
