FROM nginx:alpine

# install node and git
RUN apk update && apk add nodejs && apk add git  && apk add npm

#clone the repository
RUN git clone https://github.com/carj69/CEN4053-Project-1.git

WORKDIR /OrderingService


# install node modules
RUN npm install

# Expose the port
EXPOSE 80

# Start the webserver.
CMD ["node","monitoringService.js"]