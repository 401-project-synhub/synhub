'use strict';
let GithubURL = 'https://github.com/login/oauth/authorize';

let options1 = {
  client_id: '12b0bde50779ac5c63c0',
  redirect_uri: 'http://localhost:4000/oauth',
  scope: 'read:user',
  // state: 'asldfjdfs',
};

console.log('hello from the gh oauth');

let QueryString = Object.keys(options1).map((key) => {
  return `${key}=` + encodeURIComponent(options1[key]);
}).join('&');

let authURL = `${GithubURL}?${QueryString}`;

let link1 = document.getElementById('GithubOauth');
link1.setAttribute('href', authURL);