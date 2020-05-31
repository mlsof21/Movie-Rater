import express from 'express';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UserRoutes } from './users/users.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3001;
const routes: any = [];

app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
routes.push(new UserRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send(`Hello World! The server is up and running at port ${port}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);

  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()} this is test`);
  });
});

export default app;
