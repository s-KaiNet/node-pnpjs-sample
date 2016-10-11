# Sample for running `sp-pnp-js` (PnP-JS-Core) from nodejs environment

This sample contains minimal code required to run [`sp-pnp-js`](https://github.com/OfficeDev/PnP-JS-Core) from nodejs. Module [`node-sp-auth`](https://github.com/s-KaiNet/node-sp-auth) used as helper module for obtaining authentication headers and attaching to the http request.  

## How to run: 

1. Clone repository
2. Rename `settings.sample.ts` into `settings.ts`
3. Update `settings.ts` with appropriate values (credential in format, supported by `node-sp-auth`, for help please take a look at the [`credentialOptions param`](https://github.com/s-KaiNet/node-sp-auth#params))
4. `npm install`
5. `npm run build` 
6. You will see your web title taken with help for `sp-pnp-js` and `node-sp-auth` as authentication provider