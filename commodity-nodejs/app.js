import Koa from 'koa';
import serve from 'koa-static';
import convert from 'koa-convert';
import json from 'koa-json';
import path from 'path';
import bodyparser from 'koa-bodyparser';
import historyApiFallback from 'koa-history-api-fallback'
import logger from 'koa-logger';
import routes from './routes';

const app = new Koa()

app.use(convert.compose(
  logger(),
  bodyparser(),
  json()
))

routes(app)

app.use(convert.compose(
  historyApiFallback(),
  serve(path.resolve('public'))
))

routes(app)

export default app
