import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import {installRouter} from 'pwa-helpers/router.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';
import store from '../store';
import {updateLocation, updateScreenSize, receivedLazyResources} from '../actions/app';

export const componentConfig = {
    properties: {
        path: {type: String}
    }
};

export function initComponent() {
    this.path = '/';
}

function loadLazyResources() {
    const lazyLoadComplete = store.getState().app.lazyResourcesLoaded;
    // load lazy resources after render
    if (!lazyLoadComplete) {
        requestAnimationFrame(async () => {
            await import('./common/sambal-footer.js');
            await import('./common/sambal-header.js');
            await import('./about-me.js');
            await import('./my-resume.js');
            store.dispatch(receivedLazyResources());
        });
    }
}

export function onStateChanged(state) {
    if (this.path !== state.app.route) {
        this.path = state.app.route;
    }
}

export function updated(changedProps) {
    /*
    if (changedProps.has('_path_')) {
        let route = null;
        if (this.routeMap.has(this._path_)) {
            route = this.routeMap.get(this._path_);
        }
        const meta = {
            title: (route && route.title) ? route.title : null,
            description: (route && route.description) ? route.description : null
        }
        updateMetadata(meta);
    }*/
}

export function firstUpdated() {
    installRouter(async (location) => {
        const locationPath = decodeURIComponent(location.pathname);
        console.log('location: ' + locationPath);
        store.dispatch(updateLocation(locationPath));
        loadLazyResources();
    });
    installMediaQueryWatcher('(max-width: <%=smallScreenSize%>px)', (matches) => store.dispatch(updateScreenSize(matches)));

    // Custom elements polyfill safe way to indicate an element has been upgraded.
    this.removeAttribute('unresolved');
}