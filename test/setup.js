var assert = require('assert');

describe('Environment test', function(){

  it('It should not fail', function(){
    assert.equal(1,1);
  });

});


describe('loading JSON from server', function(){

  it('file exists and structure has `groups`', function(done){

    // arrange
    var validUrl = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';


    // act
    loadRemoteFile(validUrl, function(err, result){

      // assert
      assert.equal(err, null);
      //assert.equal(result.substr(0,13),"{\n  \"groups\":");
      assert.equal('groups' in result, true);
      done();

    });

  });

  it('file exists and structure has NO `groups`', function(done){

    // arrange
    var validUrl = 'http://katas.tddbin.com/katas/es6/language/__all__.json';


    // act
    loadRemoteFile(validUrl, function(err, result){

      // assert
      assert.equal(err, null);
      //assert.equal(result.substr(0,13),"{\n  \"groups\":");
      assert.deepEqual(result, {});
      done();

    });

  });

});


//var http = require('http');
import http from "http";

//var url = require('url');
import url from "url";

function loadRemoteFile(fileUrl, onLoaded) {

  var data = '';
  var options = url.parse(fileUrl);
  var request = http.request(options, function(res) {

    res.on('data', function(chunk) {data += chunk;});
    res.on('end', function() {
      var result = JSON.parse(data);

      if(("groups" in result)){
        onLoaded(null, result);
      }else{
        onLoaded(null, {});
      }

    });

  });
  request.on('error', function(e) { onLoaded(e); });
  request.end();
};
