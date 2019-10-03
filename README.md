# simple-k8s-apps
a set of very simple apps made to test basic K8s cluster capabilities.
All apps have Helm Charts in the "charts" folder that allows to deploy them on a k8s cluster

Here is the list of the apps:
- One simple go app that repeatedly prints on the output to test logs capabilities and distributed logging
- One simple python app that exposes a web server on port 5000
- one simple node app that exposese a web server on port 8080
- An app made of two services communicating together through gRPC and exposing the result through a web server
