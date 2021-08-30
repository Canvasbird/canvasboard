
# stage 1 (Build image)
FROM node as node

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build --prod


# for NGNIX
EXPOSE 80

# Switch to non root user
USER 1000

# stage 2 (Running the app (i.e for production))
FROM nginx:alpine
COPY --from=node /app/dist/canvasboard /usr/share/nginx/html
