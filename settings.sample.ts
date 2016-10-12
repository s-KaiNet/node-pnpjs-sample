import * as spauth from 'node-sp-auth';

/* url to your web site */
export var siteUrl: string = 'https://sp2013dev/sites/dev';

/* url to subsite */
export var subSiteUrl: string = 'https://sp2013dev/sites/dev/subsite';

/* there can be any credential options supported by node-sp-auth: https://github.com/s-KaiNet/node-sp-auth#params */
export var creds: spauth.IAuthOptions = {
    username: 'administrator',
    domain: 'sp',
    password: '[pass]'
};
