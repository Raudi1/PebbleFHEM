/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

//change IP, Port and the Name of the device you want to control depending on your setup.
var fhemIp = '192.168.0.101';
var fhemPort = '8083';
var deviceName = 'WifiLight_Martin';

//This are the actual fhem commands you want to associate with your buttons. The 1 after some commands is optional and means it changes gradually and not instantaneous.
var up = 'on 1'; 
var down = 'off 1';
var longUp = 'dimup';
var longDown = 'dimdown';
var longSelect = 'RGB FFFFFF 1'; //I changed the standard color in fhem, so this changes the color to white.

//This are the commands for other colors or whatever you like. You should also edit the menu entries further down.
var other = [
  'HSV 0,100,100 1',    //Red
  'HSV 120,100,100 1',  //Green
  'HSV 240,100,100 1',  //Blue
  'HSV 35,100,100 1'   //Yellow
]; 

//Normally you don't have to change anything here
var fhemUrl = 'http://' + fhemIp + ':' + fhemPort + '/fhem?cmd=';
var command = fhemUrl + 'set ' + deviceName +' ';

//Main Screen. It doesn't look good, but I'm too lazy to change it right now. 
var main = new UI.Card({
  title: 'Light Control',
  body: ''
});

//This function executes the command through ajax by opening an URL.
var execute = function(cmd) {
  ajax(
    {
      url: command + cmd
    }    
  );
};

//You shouldn't have to change anything here. To change the function of a button, edit the var at the top.
main.show();
main.on('click', 'up', function(e) {
  execute(up);
});
main.on('click', 'down', function(e) {
  execute(down);
});
main.on('longClick', 'up', function(e) {
  execute(longUp);
});
main.on('longClick', 'down', function(e) {
  execute(longDown);
});
main.on('longClick', 'select', function(e) {
  execute(longSelect);
});

//Edit this in adition to the var other at the top if you want to add, remove or change functions.
main.on('click', 'select', function(e) {
    var menu = new UI.Menu({
    sections: [{
      items: [
        {
        title: 'Rot',
        subtitle: ''
        },
        {
        title: 'Gruen',
        subtitle: ''
        },
        {
        title: 'Blau',
        subtitle: ''
        },
        {
        title: 'Gelb',
        subtitle: ''
        }
      ]
    }]
});
  menu.on('select', function(e) {
    execute(other[e.itemIndex]);
      
  });
  menu.show();
});
