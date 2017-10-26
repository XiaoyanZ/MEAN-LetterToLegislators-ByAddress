const express = require('express');
const router = express.Router();

var jsonQuery = require('json-query')
var google = require('googleapis');
var civicinfo = google.civicinfo('v2');
var base = require('../base');
var Lob = require('lob')(base.LOB_API_KEY);



/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.get('/google/civic', (req, res, next) => {
    civicinfo.representatives.representativeInfoByAddress({
      key: base.GOOGLE_API_KEY,
      address: req.query.address
    }, function(err, result){
      if(err) return next(err);
      var index = jsonQuery('offices[name=Governor].officialIndices',{data: result}).value[0];
      var official = jsonQuery('officials[' + index + ']:select',{
        data: result,
        locals: {
            select: function (input) {
              var output = {};
              output['name'] = input['name'];
              output['address_line1'] = input['address'][0]['line1'];
              output['address_line2'] = input['address'][0]['line2'];
              output['address_city'] = input['address'][0]['city'];
              output['address_state'] = input['address'][0]['state'];
              output['address_zip'] = input['address'][0]['zip'];
              return output;
            }
          }
        });
      res.send(official.value);
      
    })
});

router.post('/lob/letter', (req, res, next) => {
  Lob.letters.create({
    to: req.body.to,
    from: req.body.from,
    file: '<html style="padding-top: 3in; margin: .5in;">{{message}}</html>',
    merge_variables: {
      message: req.body.message
    },
    color: false
  }, function (err, result) {
    if(err) return next(err);
    res.send(result);
  });  
});



module.exports = router;

