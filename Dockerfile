# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:1.27-alpine
RUN printf '%s\n' \
  'server {' \
  '  listen 6005;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  location = / {' \
  '    return 302 /vesting/;' \
  '  }' \
  '  location /vesting/ {' \
  '    try_files $uri $uri/ /vesting/index.html;' \
  '  }' \
  '  location /vesting/assets/ {' \
  '    expires 1y;' \
  '    add_header Cache-Control "public, immutable";' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/vesting
EXPOSE 6005
CMD ["nginx", "-g", "daemon off;"]
