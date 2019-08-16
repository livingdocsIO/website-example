# website-example

Website Design for Livingdocs Design Store.

## Prerequisites
Node v8.x.x

## Getting Started

### First of all
```
npm install
```

### Running the website
Start the server for development:

```
ENVIRONMENT=local npm start
```

#### With Docker
```
docker build -t livingdocs/website .
docker run -p 8080:8080 -d livingdocs/website
```


### Creating a design build
```
npm run design:build
```

When the design build is targeting the editor, make sure to run:
```
DESIGN_TARGET=editor ENVIRONMENT=local npm run design:build
```

### Install Livingdocs Manager
```
npm install -g livingdocs-manager
```

### Publish the design
```
ldm publish design/dist/
```
