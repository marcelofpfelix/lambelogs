const http = require('http');
const prettyjson = require('prettyjson');

const env = process.env.NODE_ENV || "development";
//const conf = require(path.resolve(__dirname, "conf", env));


const hostname = '127.0.0.1';
const port = 30000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello Node JS Server Response');

  res.end('Hello Worldy\n');
});

server.listen(port, hostname, () => {

  str = `{:webserver=>{:services=>{:dns=>{'service_name'=>'dns',"lengths"=>[:a, :b, :c],3.14=>"pi",:disable_basic_auth=>true}},"cron"=>{"auto_purge"=>false,"notify_failures"=>false},"mailer"=>{"imap"=>{"host"=>"10.10.10.10","port"=>193}}}}`;


  s = rubyhash2json(str);

  str = JSON.parse(str);
  console.log(JSON.stringify(str));
  console.log("%j", str);
  console.dir(str, { depth: null, colors: true })

});


function rubyhash2json(str) {

  //console.log(s);
  console.log(str);

    // replace symbol {:symbol=> to {"symbol"=>
  str = str.replace(/(([{,]\s*)[:]([^>\s\[\]]+)|([{,]\s*)([0-9]+\.?[0-9]*))\s*=>/g, '$2$4"$3$5"=>');
  console.log(`  1##########################################`);
  console.log(str);
  // replace {,'a' to {,"a"
  str = str.replace(/([{,]\s*)'(.+?)'\s*=>/g, '$1"$2"=>');
  console.log(`  7##########################################`);
  console.log(str);
  // replace =>'a' to :"a"
  str = str.replace(/=>\s*'([^,}\s]+\s*)'/g, '=> "$1"');
  console.log(`  8##########################################`);
  console.log(str);
    // replace value {"symbol"=>:value to {"symbol"=>"value"
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>\s*:([^,}\s]+\s*)/g, '$1$2=>"$3"');
  console.log(`  3##########################################`);
  console.log(str);
    // replace array [:a, :b] to ["a","b"]
  str = str.replace(/([\[,]\s*):([^,\]\s]+)/g, '$1"$2"');
  console.log(`  4##########################################`);
  console.log(str);
    // replace nil to null
  str = str.replace(/=>nil/g, '=>null');
  console.log(`  5##########################################`);
  console.log(str);
    // replace => to :
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>/g, "$1$2:");
  console.log(`  6##########################################`);
  console.log(str);

  return str;
}

function pretty(str,res) {

  var data = {
    username: 'rafeca',
    url: 'https://github.com/rafeca',
    twitter_account: 'https://twitter.com/rafeca',
    projects: ['prettyprint', 'connfu']
  };

  var options = {
    noColor: true
  };

  console.log(prettyjson.render(data, options));
  res.write(prettyjson.render(res, options));
}
