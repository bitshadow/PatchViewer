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
  if (!path)
    return false;

  return this._data = reader.Read(path);
};

/** Splits the data into lines and returns 
 *  list containg line wise patch
 */
Mapper.prototype.splitData = function (data) {
  if (!data)
    return false;

  var input = data.replace(/\r\n/g, '\n');
  lines = input.split('\n');

  return this.lines = lines;
}

/** parse the content and generate the location 
 *  mappings for generated files
 *  @param input string content of file
 */
Mapper.prototype.generateMap = function (lines) {

  if (lines.length < 1)
    return this._locMap;

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
 *
 *  example : { o_s:'37', o_e:'17', m_s:'34', m_e:'15', func: 'abcFunc' }
 *  which can be read as
 *  origional file : changes starts at : 37
 *                           ends at   : 37 + (17-1) = 53
 *  modified file  : changes starts at : 34
 *                           ends at   : 49
 *
 *  @param line input from this.lines
 */
Mapper.prototype.getDetails = function (line) {

  var doublet = line.startsWith("@@");
  if(!doublet)
    return false;
  var d = line.split(/@@\ ?/g);
  d.splice(0,1);
  d[0] = d[0].replace(/\+/g,'');
  d[0] = d[0].replace(/\-/g,'');
  d[0] = d[0].replace(/,/g,' ');
  d[0] = d[0].split(' ');
  d[0].splice(4,1)

  var obj = {
    o_start : d[0][0],
    o_end   : d[0][1],
    m_start : d[0][2],
    m_end   : d[0][3],
    func    : d[1]
  };

  return obj;
};



Mapper.prototype.DisplayBlock

exports.Mapper = Mapper;

mapper = new Mapper()
data = mapper.getContent(process.argv[2]);
lines = mapper.splitData(data);
mapper.generateMap(lines);
d = mapper.getDetails(lines[27])
console.log(d)

