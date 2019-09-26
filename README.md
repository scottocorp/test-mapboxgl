test-mapboxgl
===============
This is a quick and hacky port to jsx/js of the [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) [demos](http://alex3165.github.io/react-mapbox-gl/demos) which are written in typescript. 

# Setup
Clone this repo and install it's dependencies
```
git clone git@github.com:scottocorp/test-mapboxgl.git
cd test-mapboxgl
npm install
```
Create a file in the top level directory called `.env` and copy the contents of `.env.template` into it. For now, assign the value `development` to `NODE_ENV` and your mapbox key to `MAPBOX_KEY` 
# Developing
```
npm run dev
```
Then browse localhost:3002