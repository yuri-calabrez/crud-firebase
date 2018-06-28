'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FB_API_KEY: '""',
  FB_AUTH_DOMAIN: '""',
  FB_DATABASE_URL: '""',
  FB_PROJECT_ID: '""',
  FB_STORAGE_BUCKET: '""',
  FB_MESSAGING_SENDER_ID: '""'
})
