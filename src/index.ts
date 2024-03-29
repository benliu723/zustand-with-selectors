import {
    StateCreator,
    StoreApi,
    UseBoundStore,
    create as zustandCreate,
} from 'zustand';

export const withSelectors = <T extends object>(
    store: UseBoundStore<StoreApi<T>>
) => {
    const proxy = new Proxy(store, {
        apply() {
            return new Proxy(
                {},
                {
                    get(_target, prop) {
                        if (typeof prop === 'string') {
                            return store((state) => state[prop as keyof T]);
                        }
                        return Reflect.get(store(), prop);
                    },
                }
            );
        },
    });
    return proxy;
};

export const create = <T extends object>(initializer: StateCreator<T>) => {
    return withSelectors(zustandCreate<T>()(initializer));
};
