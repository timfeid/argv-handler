#!/usr/bin/env node

var Command = require('./lib/command')
  , Commands = require('./lib/commands')
  , commands = new Commands([
      new Command('user {user_id} {--opt|o= w at the eff : waaaat}', function () {
        console.log(this.argument('user_id'));
      })
    ])

commands.handle()