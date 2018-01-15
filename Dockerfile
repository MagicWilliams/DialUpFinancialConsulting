FROM node:6

# Create app directory
RUN mkdir -p /usr/src/dufc
WORKDIR /usr/src/dufc

# Install app dependencies
COPY package.json /usr/src/dufc
RUN npm install

# Bundle app source
COPY . /usr/src/dialupsite

EXPOSE 80
CMD [“npm”, “start” ]

