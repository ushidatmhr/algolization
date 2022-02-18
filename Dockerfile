FROM node:lts

RUN apt-get update
RUN npm install -g firebase-tools
RUN echo "alias ll='ls -la --color'" >> /root/.bashrc
