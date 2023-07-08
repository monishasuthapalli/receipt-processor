FROM node:14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 7900
CMD ["npm", "start"]
