FROM nginx:alpine

# install node and git
RUN apk update && apk add nodejs && apk add git  && apk add npm

RUN mkdir hotBurger

COPY ./OrderingHarness/orderingServiceTest.js ./hotburger/app.js
COPY ./OrderingHarness/availability.json ./hotburger/availability.json
COPY ./MonitoringService/package.json/ ./hotburger/package.json/
WORKDIR ./hotBurger

RUN npm install --production

EXPOSE 82

CMD ["node","app.js"]