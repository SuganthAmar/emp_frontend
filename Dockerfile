FROM node:18-alpine
WORKDIR /react-app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
