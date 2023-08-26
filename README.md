# Connection with VPS Server (AWS-EC2)

- first thing you must create instance in AWS-EC2 and connect with your VPS ip address, you can connect from ES2 instance connect in username ```root``` or for more secure way is using an SSH key.

---
## connect with server

- In EC2 instance connect: you can choice your username ubuntu or as administrator ```(root)```
- In SSH instance connect: open terminal and write this command 
```bash
ssh root@<server ip address>
```

## First Configuration

### Cleaning & Update apt and this will take some seconds

```bash
sudo apt clean all && sudo apt update && sudo apt upgrade
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
apt-get install -y nodejs
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
### Make project still available running

- there a good tool call [pm2](https://github.com/Unitech/pm2)
```bash
npm install -g pm2
```
- and then run your project
```bash
pm2 start index.js
```