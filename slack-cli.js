#!/usr/bin/env node

var program = require('commander');
var Slack = require('slack-node');
var config = require('./config');

program
	.option('-u, --username <username>','Username')
	.option('-m, --message <message>','Message')
	.option('-c, --channel <channel>','Channel')
	.parse(process.argv);
	
if (program.username) console.log('with username %s',program.username);
if (program.message) console.log('with message %s',program.message);
if (program.channel) console.log('with channel %s',program.channel);

slack = new Slack();
slack.setWebhook(config.webhookUri);

var payload = {};

payload.channel = program.channel;
payload.username = program.username;
payload.text = program.message;

if ( payload.channel && payload.username && payload.text ) { 
	slack.webhook(payload, function(err, response) {
		console.log(response);
		});
}
else program.help();