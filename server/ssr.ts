import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { join } from 'path';
import { readFileSync } from 'fs';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

export default function (app) {

  enableProdMode();

  const DIST_FOLDER = join(process.cwd(), 'dist');

  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
  } = require('../dist/server/main.bundle');

  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));

  app.set('view engine', 'html');
  app.set('views', join(DIST_FOLDER, 'public'));

  app.get('*', (req, res) => {
    res.render('index', { req });
  });
}
