# stage 1 (Build image)

# pulling base image
FROM node:16 as node
# Setting the remote DIR to /app
WORKDIR /app
# COPY the current folder
COPY . .
# run npm i (install all the dependencies)
RUN npm install
# this will generate dist
RUN npm run build --prod

# stage 2 (Running the app (i.e for production))
FROM nginx:alpine
COPY --from=node /app/dist/canvasboard /usr/share/nginx/html