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

let counter = 0;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  console.log('say hello message received ', call.request);
  callback(null, { message: 'I am Service 2. I have been called ' + counter++ + ' times'});
}

function sayHelloAgain(call, callback) {
  callback(null, { message: 'Hello again, ' + call.request.name })
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  console.log('Starting GRPC SErver !!!');
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, { sayHello: sayHello, sayHelloAgain: sayHelloAgain });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();


}

main();
