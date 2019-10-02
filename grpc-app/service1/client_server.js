/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('grpc');
var http = require('http');

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;


function main() {
  var grpcClient = new hello_proto.Greeter('grpc-server-service:50051',
    grpc.credentials.createInsecure());

  console.log("starting HTTP server")
  var handleRequest = function (request, response) {
    console.log('Received request for URL: ' + request.url);
    response.writeHead(200);

    if (request.url === '/'){
      grpcClient.sayHello({ name: 'you' }, function (err, grpcresponse) {

        console.log('grpc response received ', err, grpcresponse);
        response.end('Hello World! from ' + grpcresponse.message);
      });  
    } else {
      response.end('');
    }
  };
  var www = http.createServer(handleRequest);
  www.listen(8080);



}



main();
