/**

String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function(prefix)
{
     if( this.indexOf(prefix) == 0 ) return true;
        return false;
}*/

String.prototype.trim = function() {
  return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))
}

String.prototype.startsWith = function(str) {
  return (this.match("^"+str)==str)
}

String.prototype.endsWith = function(str) {
  return (this.match(str+"$")==str)
}
