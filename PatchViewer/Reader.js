var fs = require("fs"),
    util = require("./util");

/** Module Reader contains file utilities */
var Reader = module.exports = {
  version: [0],

  isFile : function(path) {
    try {
      return fs.statSync(path).isFile();
    }
    catch (error) {
      return false;
    }
  },

  /** See if its with valid extension */
  isPatchFile : function (path) {
    var isPatch = isFile(path) && path.endsWith(".patch")
    return isPatch;
  },

  /** Read content from file syncronusly */
  Read: function(path) {
     if(!this.isFile(path))
         return null;
     //console.log(path);
     try {
       var data = fs.readFileSync(path,'utf8');
     }
     catch (error) {
       console.error("Could not open "+ path);
       process.exit(1);
    }

    return data.toString();
  },

};


