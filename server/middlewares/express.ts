import { ExpressRequest } from '@sentry/node/dist/handlers'
import { Express } from 'express'

const _ = require('lodash');
const path = require('path');
const conf = require('dotenv').config().parsed;
const Env = require('./../config/env');
const Sentry = require('../config/sentry');
const config = require('server/orm/config/config.js')[Env.current];
const csurf = require('csurf');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');
const compress = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require('helmet');
const logger = require('morgan');

const sessionStore = new MySQLStore({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

module.exports = {
  compress: compress({
    filter: (req: any, res: any) => {
      return (/json|text|javascript|css|image\/svg\+xml|application\/x-font-ttf/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }),
  cors: cors({
    origin: 'http://localhost:8080',
    credentials: true
  }),
  helmet: helmet(), // secure apps by setting various HTTP headers
  loggerDev: logger('dev'),
  methodOverride: methodOverride(),
  sentryErrorHandler: Sentry.Handlers.errorHandler(),
  sentryRequestHandler: Sentry.Handlers.requestHandler(),
  sentryUnhandledRejection: (reason: string) => Sentry.captureMessage(reason),
  setLocals: (req: Express.Request, res: Express.Response, next) => {
    if (req.url.search('static') !== -1) return next();
    if (req.get('host') === 'purs.tk' && !req.originalUrl.includes('/-'))
    { return res.redirect(`https://pasteurscreens.tk${req.originalUrl}`); }
    res.locals.readOnly = req.session.readOnly ? 'lock' : 'unlock';
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.session = req.session || null;
    res.locals.csrfToken = req.csrfToken();
    res.locals.usingPurs = !!(req.get('host') === 'purs.tk');
    if (!Env.isTest && !Env.isStaging && !_.isNil(req.user)) {
      Sentry.configureScope((scope) => {
        scope.setUser(req.user);
      });
    }

    next();
  },
  session: session({
    secret: conf.SECRET,
    saveUninitialized: true,
    store: sessionStore,
    resave: true
  })
};