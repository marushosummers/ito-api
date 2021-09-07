FROM openjdk:slim

RUN set -ex \
    && apt-get update \
    && apt-get install -y curl wget lsof\
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install -y nodejs \
    && apt remove cmdtest \
    && apt remove yarn \
    && wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn \
    && npm install -g firebase-tools

WORKDIR /usr/src/app

COPY ./functions/package.json ./functions/.

