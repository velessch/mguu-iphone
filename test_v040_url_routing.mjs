import fs from 'node:fs';
import vm from 'node:vm';

const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
const start=app.indexOf("const APP_VERSION='0.40 Web · Vercel';");
const end=app.indexOf("const K_SELECTED_GROUP=");
if(start<0||end<=start)throw new Error('URL routing block not found');
const block=app.slice(start,end);
const context={
  URL,
  window:{location:new URL('https://mguu-iphone-b9ui.vercel.app/'),__dummy:true},
  globalThis:null,
};
context.globalThis=context;
vm.createContext(context);
vm.runInContext(block+`\nvar ratingGroup={id:'000000230',name:'24ГМУ-СКР11.1'};\nglobalThis.__urlTest={normalizePortalSourceUrl,toPortalProxyUrl,RATING_URL,PORTAL_ORIGIN};`,context);
const t=context.__urlTest;
function eq(actual,expected,label){if(actual!==expected)throw new Error(`${label}\nexpected: ${expected}\nactual:   ${actual}`);}

eq(t.RATING_URL,'https://portal.mguu.ru/student/rating.php','rating source URL must match Android portal origin');

eq(
  t.normalizePortalSourceUrl('/student/personalrating.php?sem=0&userid=000097470&year=000000015'),
  'https://portal.mguu.ru/student/personalrating.php?sem=0&userid=000097470&year=000000015',
  'root-relative personalrating must resolve against portal'
);
eq(
  t.normalizePortalSourceUrl('https://mguu-iphone-b9ui.vercel.app/student/personalrating.php?sem=0&userid=000097470&year=000000015'),
  'https://portal.mguu.ru/student/personalrating.php?sem=0&userid=000097470&year=000000015',
  'legacy same-origin personalrating must migrate to portal'
);
eq(
  t.normalizePortalSourceUrl('https://mguu-iphone-b9ui.vercel.app/portal/student/detailed.php?userid=000097470&year=000000015&sem=0&__mguu_groupid=old'),
  'https://portal.mguu.ru/student/detailed.php?userid=000097470&year=000000015&sem=0',
  'proxy URL must convert back to canonical portal URL and strip internal params'
);
const personalProxy=new URL(t.toPortalProxyUrl('/student/personalrating.php?sem=0&userid=000097470&year=000000015'));
eq(personalProxy.origin,'https://mguu-iphone-b9ui.vercel.app','personalrating transport origin');
eq(personalProxy.pathname,'/portal/student/personalrating.php','personalrating transport path');
eq(personalProxy.searchParams.get('userid'),'000097470','personalrating userid preserved');
eq(personalProxy.searchParams.get('__mguu_groupid'),'000000230','rating group context attached');
const detailedProxy=new URL(t.toPortalProxyUrl('https://portal.mguu.ru/student/detailed.php?userid=000097470&year=000000015&sem=0'));
eq(detailedProxy.pathname,'/portal/student/detailed.php','detailed transport path');
eq(detailedProxy.searchParams.get('__mguu_groupid'),'000000230','detailed group context attached');

if(!app.includes('url:sourceUrl,transportUrl:r.url||transportUrl'))throw new Error('fetchRatingResponse does not preserve canonical portal source URL');
if(!app.includes("const K_PORTAL_URL_MIGRATION_V039='mguu_v039_portal_urls_migrated';"))throw new Error('saved URL migration marker missing');
if(!app.includes('migrateRatingPortalUrlsV039();'))throw new Error('saved URL migration is not executed');
if(!app.includes("url=normalizePortalSourceUrl(url,RATING_URL);selectedBook="))throw new Error('new selected books are not canonicalized');

const vercel=JSON.parse(fs.readFileSync(new URL('./vercel.json',import.meta.url),'utf8'));
if(!vercel.rewrites.some(r=>r.source==='/student/:path*'&&r.destination==='/api/backend?route=portal/student/:path*'))throw new Error('legacy /student Vercel compatibility rewrite missing');

console.log('v0.40 Android-parity portal URL routing test: OK');
