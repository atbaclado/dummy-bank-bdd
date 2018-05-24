const assert = require('chai').assert;
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

describe('route: /signin', function() {
  let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

  beforeEach(function() {
      this.url = 'http://localhost:3000/signin';
  });

  it('should handle POST requests', async function() {
      const response = await axios.post(this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'flames'}));
      assert.isBelow(response.status, 400);
  });

  it('should sign in successfully', async function() {
    const response = await axios.post( this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'flames'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/profile');
  });

  it('should identify incorrect email', async function() {
    const response = await axios.post(this.url, qs.stringify({'email':'kspanerio04@gmail.com','password':'flames'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/');
    /* const $ = cheerio.load(response.data);
     assert.equal($('h3#signinMsg').text(), 'Incorrect email.');*/
  });

  it('should identify incorrect password', async function() {
    const response = await axios.post(this.url, qs.stringify({'email':'atbaclado@gmail.com','password':'04031998'}));
    assert.equal(response.request.res.responseUrl, 'http://localhost:3000/');
    /* const $ = cheerio.load(response.data);
     assert.equal($('h3#signinMsg').text(), 'Incorrect password.');*/
  });
});