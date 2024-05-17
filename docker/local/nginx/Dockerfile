  FROM nginx:1.25-perl

  RUN rm /etc/nginx/conf.d/default.conf

  COPY ./default.conf /etc/nginx/conf.d/default.conf
  
  PORT =1997
NODE_ENV=development
DB_NAME=invoice
MONGO_ROOT_USERNAME=bbcde7dbea59b176175d
MONGO_ROOT_PASSWORD=23ba7673d3f322453254e86a9f02ff6139065618619d02ec7233411228cf0f18