const assert = require('chai').assert;
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

describe('route: /signup', function() {
  let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

  beforeEach(function() {
      this.url = 'http://localhost:3000/signup';
  });

  it('should handle POST requests', async function() {
      const response = await axios.post(this.url, qs.stringify({'email':'kspanerio@gmail.com','password':'flames', 'confirmation':'04031998'}));
      assert.isBelow(response.status, 400);
  });

  it('should sign up successfully', async function() {
    const response = await axios.post( this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'flames', 'confirmation':'flames'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/profile');
  });

  it('should identify if email already in use', async function() {
    const response = await axios.post(this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'flames', 'confirmation':'flames'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/');

    /*const $ = cheerio.load(response.data);
    assert.equal($('h3#signupMsg').text(), 'Email is already in use.');*/
  });

  it('should identify passwords do not match', async function() {
    const response = await axios.post(this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'04031998', 'confirmation':'flames'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/');

   /* const $ = cheerio.load(response.data);
    assert.equal($('h3#signupMsg').text(), 'Passwords do not match.');*/
  });
});