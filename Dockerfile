FROM node:latest
RUN mkdir /home/nodelander
RUN chmod 755 /home/nodelander
COPY . /home/nodelander
WORKDIR /home/nodelander
RUN npm install
ENV NODE_ENV prod
ENV PORT 80
EXPOSE 80
CMD ["npm", "run", "prod"]