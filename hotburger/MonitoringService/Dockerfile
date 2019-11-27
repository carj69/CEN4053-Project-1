FROM nginx:alpine

# install node and git
RUN apk update && apk add nodejs && apk add git  && apk add npm

# clone the repository
# RUN git clone https://github.com/carj69/CEN4053-Project-1.git

RUN mkdir hotburger

COPY ./MonitoringService/monitoringApp.js ./hotburger/app.js
COPY ./MonitoringService/package.json/ ./hotburger/package.json/
WORKDIR ./hotburger

# install node modules
# RUN npm install

# Expose the port
EXPOSE 81

# Start the webserver.
CMD ["node","app.js"]