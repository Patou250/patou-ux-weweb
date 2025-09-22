import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"55e784c0-4014-4fb0-a0f4-ecafd4cbbcf7","homePageId":"2b01358b-1987-4e95-aa09-ccb9f66dc5fa","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"pages":[{"id":"2b01358b-1987-4e95-aa09-ccb9f66dc5fa","linkId":"2b01358b-1987-4e95-aa09-ccb9f66dc5fa","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"1547f472-b827-4ff1-841b-add5f6f6c15a","sectionTitle":"Child Player Main","linkId":"60073a77-1d9e-449a-924c-3cb22cb904a2"},{"uid":"b228d57b-9817-4076-aca2-e02c301f830d","sectionTitle":"Public Header","linkId":"d5dc8452-d9f5-4041-aba4-2930f63bcbf0"},{"uid":"ba4df7c8-adcf-4249-8d35-cfab12cb55e8","sectionTitle":"Signup Main Container","linkId":"1b1d296e-edb2-43c6-bb44-1b2b0b9688ea"},{"uid":"2c1ae75c-c4f9-46c2-8607-e9eb3d525588","sectionTitle":"Dashboard Main Content","linkId":"3d42ce2a-0605-4ff1-89e3-96d37546ea56"},{"uid":"a3cfb15c-a106-4551-a078-076c206eb8f6","sectionTitle":"Login Main Container","linkId":"e72c9548-4d95-4b88-87aa-a52b0647b77a"},{"uid":"b9322f85-7767-43fb-bd3a-38351680bda3","sectionTitle":"Main Container","linkId":"47fc0067-be67-4c7a-b78a-2eff2e3fd98f"},{"uid":"ffd57ce8-a85c-49a2-a536-d4021bac0bc7","sectionTitle":"Public Footer","linkId":"7b09f672-0499-4457-aadf-6badbce26411"},{"uid":"129b9fba-cb66-4921-8ddb-ef75019d6b1e","sectionTitle":"Public Header","linkId":"1f5ba4a7-71ac-4848-9b5e-80cd2a8b07d5"},{"uid":"3c34898c-5b9c-4954-a932-1b1a6d5b0cc0","sectionTitle":"Main Content","linkId":"676dceda-89e5-411c-814c-c90c971e1491"},{"uid":"8ccc89b8-1fda-42e6-a074-25ccf671b190","sectionTitle":"Public Footer","linkId":"8fb1918b-a022-4ee0-a37d-1a520f99ecf1"},{"uid":"467a515a-21d1-4533-80c4-b47b0b5df668","sectionTitle":"Footer Section","linkId":"4771a057-6caf-4b71-a4e8-39bebb75c28f"},{"uid":"70605cf6-01ab-493a-ab8e-856321c4e0a7","sectionTitle":"CTA Section","linkId":"6fbea3ca-47d4-4f18-964f-a06e065a6afa"},{"uid":"3b00f9f7-8b78-44c0-936d-6d370a5bf8bb","sectionTitle":"Benefits Section","linkId":"f03b1ef5-cc9d-4cf9-a7e4-eb487d490b44"},{"uid":"4ef64ee4-c2a0-4551-a79b-236830883f09","sectionTitle":"Pillars Section","linkId":"d4e63d39-bc0c-456d-aedb-957e4d0ca8c9"},{"uid":"18e24268-a8dc-41be-b4d4-e1097a151b8a","sectionTitle":"Features Section","linkId":"bd201635-ca08-4700-80ab-98017b793ed2"},{"uid":"708db811-f4d0-468e-bf4b-d4f9d751a238","sectionTitle":"Hero Section","linkId":"ad3ace1e-5456-4a9c-bf09-f07e5522be4e"},{"uid":"a3b538af-5afd-4395-818c-0fc3cccd5de2","sectionTitle":"Trust Indicators Section","linkId":"f308dc1a-0977-4de0-8d19-fc893d28953d"},{"uid":"5becb742-b92e-4757-807d-dab04c781275","sectionTitle":"Mobile Navigation Bar","linkId":"b5a3d5ac-bd9b-49e1-8126-93a5e0fb75ae"},{"uid":"476ff17d-8a49-4fe5-a71e-49344099e4ac","sectionTitle":"Desktop Sidebar","linkId":"adca8033-613e-464e-9e3f-9ec02cd6fa06"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 3;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
