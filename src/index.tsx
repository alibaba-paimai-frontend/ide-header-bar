import { Instance } from 'mobx-state-tree';
import { initSuitsFromConfig } from 'ide-lib-engine';

export * from './HeaderBar/config';
export * from './HeaderBar/';

import { HeaderBarCurrying } from './HeaderBar/';
import { configHeaderBar } from './HeaderBar/config';

const {
    ComponentModel: HeaderBarModel,
    StoresModel: HeaderBarStoresModel,
    NormalComponent: HeaderBar,
    ComponentHOC: HeaderBarHOC,
    ComponentAddStore: HeaderBarAddStore,
    ComponentFactory: HeaderBarFactory
} = initSuitsFromConfig(HeaderBarCurrying,configHeaderBar);

export {
    HeaderBarModel,
    HeaderBarStoresModel,
    HeaderBar,
    HeaderBarHOC,
    HeaderBarAddStore,
    HeaderBarFactory
};

export interface IHeaderBarModel extends Instance<typeof HeaderBarModel> { }
