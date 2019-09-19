FROM node:10-alpine
ADD https://github.com/just-containers/s6-overlay/releases/download/v1.22.0.0/s6-overlay-amd64.tar.gz /tmp/
RUN tar xzf /tmp/s6-overlay-amd64.tar.gz -C /
COPY ./rootfs /
ENTRYPOINT [ "/init" ]
ENV S6_KEEP_ENV 1
ENV S6_SERVICES_GRACETIME 60000
WORKDIR /code
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./app.js ./app.js
RUN npm i
