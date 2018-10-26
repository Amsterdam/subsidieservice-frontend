# Subsidy Frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production (Modern mode)
```
npm run build-modern
```

### Lints and fixes files
```
npm run lint
```

# Connection to backend API
## Local development
To set the endpoint of the API that should be used for feeding the application with data, simply modify the ```.env``` file with the base url of the api
Example configuration for sending requests to localhost/v1
```
VUE_APP_API_URL=v1
``` 

## Production configuration (and docker)
To set the API url for production builds, refer to the ```.env.production``` file


# Building the container
To build the docker container using docker-compose
```` docker-compose build ```

Running the container is as simple as 
``` docker-compose up -d```
This will get the nginx container running in dedatched mode (in the background) and by default port 8081 will be configured to serve the application.

# Reverse proxy and CORS
In order to avoid running into CORS issues, the local Vue server (using Vue cli) will proxy all requests that start with 'v1' to the API url
This can be configured in the ```vue.config.js``` file.

Please keep in mind that this mode is only available for local development with Vue CLI, the nginx server is not configured for reverse proxy to backend.

# Nginx configuration
The nginx configration can be found in ```nginx.conf``` file.
By default the nginx is configured to serve static files if the url matches an existing file and serves the index for all other requests.
Ex. GET /js/app.js  will serve the static file.
    GET /not-a-file  will serve the ```index.html``` in order to run the Vue Single Page Application

# Stub Data
To change a Real HTTP service to use fake data, simply go to the interface definition of the file
And change the default export from the real service to a fake one
For example in ```user.service.ts``` change
``` 
import httpUserService from './http-user.service';
export default httpUserService as UserService;
```
To:
``` 
import fakeUserService from './fake-user.service';
export default fakeUserService as UserService;
```
