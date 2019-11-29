import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { getPort } from 'portfinder';
import { clean } from '../commands/clean';
import { buildESModuleOutputs } from './build';
import { siteDevConfig } from '../config/webpack.site.dev';
import { genPackageEntry } from '../compiler/gen-package-entry';
import { genPacakgeStyle } from '../compiler/gen-package-style';
import { genSiteMobileShared } from '../compiler/gen-site-mobile-shared';
import { genSiteDesktopShared } from '../compiler/gen-site-desktop-shared';
import { genStyleDepsMap } from '../compiler/gen-style-deps-map';

function runWebpack() {
  const server = new WebpackDevServer(
    webpack(siteDevConfig),
    (siteDevConfig as any).devServer
  );

  getPort(
    {
      port: 8080
    },
    (err, port) => {
      if (err) {
        console.log(err);
        return;
      }

      server.listen(port, 'localhost', (err?: Error) => {
        if (err) {
          console.log(err);
        }
      });
    }
  );
}

export async function dev() {
  await clean();
  await buildESModuleOutputs();
  genStyleDepsMap();
  genPackageEntry();
  genPacakgeStyle();
  genSiteMobileShared();
  genSiteDesktopShared();
  runWebpack();
}
