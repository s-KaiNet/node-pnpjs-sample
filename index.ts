import * as pnp from 'sp-pnp-js';
import * as spauth from 'node-sp-auth';
import * as _ from 'lodash';
import * as fetch from 'node-fetch';
import * as https from 'https';
import * as url from 'url';

import * as settings from './settings';

declare var global: any;

/* since sp-pnp-js uses window.fetch, we need to attach some global function from corresponding node-fetch module */
global.Headers = (<any>fetch).Headers;
global.Request = (<any>fetch).Request;
global.Response = (<any>fetch).Response;

/* override global fetch function with your own implementation */
global.fetch = (requestUrl: string, options: any) => {

    /* first get auth with help of node-sp-auth */
    return spauth.getAuth(requestUrl, settings.creds)
        .then((data: any) => {

            /* attach headers and options received from node-sp-auth */
            let headers: any = _.extend({}, data.headers);
            let fetchOptions: any = _.extend(options, data.options);
            fetchOptions.headers = headers;

            headers['Accept'] = 'application/json;odata=verbose';
            headers['Content-Type'] = 'application/json;odata=verbose';

            let isHttps: boolean = url.parse(requestUrl).protocol === 'https:';

            if (isHttps && !fetchOptions.agent) {
                /* bypassing ssl certificate errors (self signed, etc) for on-premise */
                fetchOptions.agent = new https.Agent({ rejectUnauthorized: false });
            }

            /* perform actual request with node-fetch */
            return fetch(requestUrl, fetchOptions);
        });
};

let web: pnp.Web = new pnp.Web(settings.siteUrl);

/* at this point we replaced global fetch with our version and can use pnp as is */
web.get()
    .then((data: any) => {
        console.log(`Your web title: ${data.Title}`);

        /* changing the web: */
        web = new pnp.Web(settings.subSiteUrl);

        return web.get();
    })
    .then((data: any) => {
        console.log(`Your sub web title: ${data.Title}`);
    })
    .catch((err: any) => {
        console.log(err);

        if (err.stack) {
            console.log(`StackTrace: ${err.stack}`);
        }
    });
