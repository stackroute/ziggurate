FROM mhart/alpine-node

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . .

RUN npm install

CMD ["npm" ,"start", "--production"]