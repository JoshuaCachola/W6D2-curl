const dash = require('dashdash');
const fetch = require('node-fetch');
const fs = require('fs');
const Headers = fetch.Headers;
// const http = require('http');

// fetch('.herokuapp.com/make?text')
//   // .then(res => {
//   //   // console.log(Headers);
//   //   // console.log(res.headers.raw());
//   //   console.log(res.body);
//   // });
//   .then(res => res.text())
//   .then(text => console.log(text))
//   // .then(fsPromise)
//   .catch(reason => console.log(reason));

const options = {
  allowUnknown: true,
  options: [{
    names: ['output', 'o'],
    type: 'string',
    help: 'file in which to store the fetched data'
  },
  {
    name: 'version',
    type: 'bool',
    help: 'Print tool version and exit.'
  },
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print this help and exit.'
  },
  {
    names: ['verbose', 'v'],
    type: 'arrayOfBool',
    help: 'Verbose output. Use multiple times for more verbose.'
  },
  {
    names: ['file', 'f'],
    type: 'string',
    help: 'File to process',
    helpArg: 'FILE'
  },
  {
    names: ['header', 'H'],
    type: 'string',
    help: 'Adding info to header'
  },
  {
    names: ['A'],
    type: 'string',
    help: 'Set the user agent header'
  },
  {
    names: ['e'],
    type: 'string',
    help: 'Set referer header'
  },
  {
    names: ['dump-header'],
    type: 'string',
    help: 'putting meta-data information in file'
  },
  {
    names: ['data', 'd'],
    type: 'string',
    help: 'data for body of fetch request'
  }
  ]
};

const parser = dash.createParser(options);

const opts = parser.parse(options);

console.log('Options are:', opts);

const output = opts.dump_header;
const url = opts._args[0];
const order = options._order;

for (let key in order) {
  order[key] = order[value];
}

// console.log(output, url);
const bodyObj = {
  body: 'string'
}
fetch(url, bodyObj)
  .then(res => {
    let headers = res['headers'];
    console.log(headers.get('content-length'));
    console.log(headers.get('content-type'));
    console.log(headers.get('server'));
    console.log(headers.get('date'));
    console.log(headers.get('via'));
    const obj = {
      'content-length': headers.get('content-length'),
      'content-type': headers.get('content-type'),
      'server': headers.get('sever'),
      'date': headers.get('date'),
      'via': headers.get('via'),
    }

    // const data = JSON.stringify(obj);
    return obj;

    // for (let key in res) {
    //   if (key === 'headers') {
    //     console.log(res[key]);
    //     let header = res[key];
    //     for (let keys in header) {
    //       console.log(keys);
    //       console.log(header[keys]);
    //     }
    //   }
    //   console.log(key);
    //   console.log(res[key]);
    // }
  })
  .then(data => {
    let str = '';
    for (let key in data) {
      str += key + ":" + data[key] + '\n';
    }
    fs.promises.writeFile(output, str)
  });
// .then(res => res.text())
// .then(text => fs.promises.writeFile(output, text))
// .catch(reason => console.log(reason));


// const option = {
//   hostname: 'https://artii.herokuapp.com/make?text=curl++this',
//   port: 443,
//   path: '',
//   method: 'GET'
// }
// const req = http.request(option, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   });
// });

// req.on('error', error => {
//   console.error(error)
// });

// req.end();

let myHeader = new Headers();
//console.log(myHeader.append('Accept', 'application / json'));
myHeader.append('Content-Type', 'application / json');
// console.log(myHeader);
// for (let key in myHeader) {
//   console.log(key);
//   console.log(myHeader.key);
// }
