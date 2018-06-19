module.exports = function () {

  this.colors = {
    black: "\x1b[30m",
      red: "\x1b[31m",
    green: "\x1b[32m",
   yellow: "\x1b[33m",
     blue: "\x1b[34m",
  magenta: "\x1b[35m",
     cyan: "\x1b[36m",
   normal: "\x1b[0m"
 };

 this.styles = {
        reset: "\x1b[0m",
       bright: "\x1b[1m",
          dim: "\x1b[2m",
   underscore: "\x1b[4m",
        blink: "\x1b[5m",
      reverse: "\x1b[7m",
       hidden: "\x1b[8m"
};

 this.print = function (output, color = this.colors.normal, style = this.styles.reset) {
   console.log("%s%s%s\x1b[0m", style, color, output);
 };

 return this;
};
