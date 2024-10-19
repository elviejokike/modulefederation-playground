
    export type RemoteKeys = 'fed_provider/button';
    type PackageType<T> = T extends 'fed_provider/button' ? typeof import('fed_provider/button') :any;