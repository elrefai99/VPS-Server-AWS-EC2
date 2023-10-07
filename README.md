# Connection with VPS Server (AWS-EC2)

How to deploy nodejs app to AWS EC2 Ubuntu 22 Server with free SSL and Nginx reverse proxy

---
## Installation instructions
## connect with server

- In EC2 instance connect: you can choice your username ubuntu or as administrator ```(root)```
- In SSH instance connect: open terminal and write this command 
```bash
ssh -i <key.pem> ubuntu@<ip-address> -v
```

## First Configuration

### Update apt and this will take some seconds

```bash
sudo apt update && sudo apt upgrade
```
### Check GIT version
```bash
git --version
```

- if git version under ```2.42.0``` then you can update it by running 
```bash 
  apt install git 
```
### Install Node.js and npm
```bash
curl -sL https://deb.nodesource.com/setup_18.x | bash -
```
```bash
apt-get install -y nodejs
```

#### Check nodejs installed
```bash
node --version
```

#### Check npm installed

```bash
npm --version
```

### clone project from github to server
- for upload your project you can user clone the repository from github

```bash
git clone https://github.com/yourUsername/yourProject.git
```
### Test run project

- install package dependencies for your project
```bash
npm install
```
- test run
```bash
node index.js
```

- then you can take ip address and run it in your browser

### Make project still available running (Make sure everything working)

#### Install pm2

```bash
npm install -g pm2
```

#### Starting the app with pm2
```bash
pm2 start index.js
```

#### Saves the running processes, if not saved, pm2 will forget, the running apps on next boot
```bash
pm2 save
```

#### IMPORTANT: If you want pm2 to start on system boot
```bash
pm2 startup 
```

### Install Nginx web server
```bash
sudo apt install nginx
```
Delete the default config
```bash
rm /etc/nginx/sites-available/default
```
```bash
rm /etc/nginx/sites-enabled/default
```
#### Create new project config

```bash
sudo nano /etc/nginx/sites-available/project_name
```
Add the following to the location part of the server block
```bash
server {
    listen 80;
    server_name supdomain.domian.com;
    client_max_body_size 100M;

    location /api {

        proxy_pass http://127.0.0.1:9000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
   }
}
```
create site-available and site-enabled to let any change make in both
```bash
ln -s /etc/nginx/sites-available/project_name /etc/nginx/sites-enabled/project_name
```

Check NGINX config
```bash
sudo nginx -t
```
```bash
systemctl start nginx
```
Restart NGINX
```bash
sudo service nginx restart
```

You should now be able to visit your IP with no port (port 80) and see your app. Now let's add a domain
## Enjoy Your Nodejs server 😁
