import { Router } from '../routes';

export default (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replaceRoute(target);
  }
};
