import {
    StateCreator,
    StoreApi,
    UseBoundStore,
    create as zustandCreate,
} from 'zustand';

export type WithSelectors<T> = {
    use: <Keys extends keyof T>(keys: Keys[]) => { [K in Keys]: T[K] };
} & UseBoundStore<StoreApi<T>>;

export const createSelectors = <T>(store: UseBoundStore<StoreApi<T>>) => {
    const storeIn = store as WithSelectors<T>;
    const use: WithSelectors<T>['use'] = (keys) => {
        const newState = {} as Pick<T, (typeof keys)[number]>;
        for (const key of keys) {
            newState[key] = store((state) => state[key]);
        }
        return newState;
    };
    storeIn.use = use;
    return storeIn;
};

export const create = <T>(initializer: StateCreator<T>) => {
    return createSelectors(zustandCreate<T>()(initializer));
};
