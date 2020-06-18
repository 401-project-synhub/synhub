'use strict';

let GithubURL = 'https://github.com/login/oauth/authorize';

let options = {
  client_id: '35e8de24061ca19f4296',
  redirect_uri: 'http://localhost:3000/oauth',
  scope: 'read:user',
  state: 'asldfjdfs',
};

let QueryString = Object.keys(options).map((key) => {
  return `${key}=` + encodeURIComponent(options[key]);
}).join('&');

let authURL = `${GithubURL}?${QueryString}`;

let link = document.getElementById('GithubOauth');
link.setAttribute('href', authURL);