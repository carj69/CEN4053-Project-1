FROM nginx:alpine

# install node and git
RUN apk update && apk add nodejs && apk add git  && apk add npm

RUN mkdir hotBurger

COPY ./orderingApp.js ./hotBurger/app.js
COPY ./../package.json/ ./package.json/
WORKDIR ./hotBurger


# install node modules
RUN npm install

# Expose the port
EXPOSE 80

# Start the webserver.
CMD ["node","app.js"]
