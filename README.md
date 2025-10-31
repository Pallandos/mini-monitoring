# Mini-monitoring

## Usage

You can run commands for `node` on local :

```bash
npm install         # install dependecies 
npm build           # build application
npm clean           # remove all compiled files      
npm start           # start server   
npm test            # run tests          
```

###  Docker build

You can use `docker build` to build the image before running it or juste do :

    make

and it will build the image

### Docker run

Once builded, you can run the container with the following command :

    docker run -p 3000:3000 mini-monitoring:latest --name mini-monitoring

## Access the API

The API can be accessed on port 3000 on the following endpoint :

    /api/v1/system-info