var relayr = require('relayr');
var yo = require('yohoho')('[your yo account key here]');
var request = require('request');

//connect to relayr pubnub cloud
var relayrKeys = {
  app_id: '[your relayr app id here]',
  dev_id: '[your device id here]',
  token:  '[your token here]'
};
relayr.connect(relayrKeys);

var tsMachineAvailable = -1;

relayr.listen(function(err,data)
{
  //fires for every sensor event
  if (err)
  {
      console.log("Oh No!", err)
  }
  else
  {
    if (tsMachineAvailable !== -1)
    {
      console.log(Math.round(((tsMachineAvailable + 1000 * 60) - data.ts) / 1000)
      + ' seconds to go before sending a Yo');
    }

    //console.log(data);
    if (data.ts < tsMachineAvailable) return;

    //if something nearby, clear the "machine available" timespan and return
    if (data.prox > 150)
    {
      if (tsMachineAvailable !== -1)
      {
        tsMachineAvailable = -1;
        console.log('player detected, resetting Yo timer to 60 seconds')
      }
      return;
    }

    //...so, nothing nearby
    if (tsMachineAvailable === -1) tsMachineAvailable = data.ts;


    //if nothing nearby for more than one minute, send a Yo
    if (data.ts - tsMachineAvailable > 1000 * 60)
    {
      //TODO: pop user from Azure WaitingList and send "Yo" to this user
      //FORNOW: sends "Yo" to all followers
      console.log('sending Yo...');
      yo.yoAll(function (err, success) { });

      //now wait for 3 minutes before checking again
      tsMachineAvailable = data.ts + 1000 * 60 * 3;
    }
  }
});
