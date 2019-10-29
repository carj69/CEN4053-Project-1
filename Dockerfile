FROM nginx:alpine

#Install dependencies
RUN apk update && apk add --virtual native-deps\
        g++ gcc libgcc libstdc++ linux-headers autoconf automake nasm python git npm nodejs && \
        npm install --quiet node-gyp -g
RUN git clone https://github.com/carj69/CEN4053-Project-1.git

WORKDIR /SEManagement2019/hotBurger

RUN npm intsall --production

EXPOSE 80

CMD ["node", "app.js"]

