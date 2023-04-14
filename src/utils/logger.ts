import Debug from 'debug';

const debug = Debug('iexec-data-protector-builder');

const getLogger = (namespace: string) => debug.extend(namespace);

export { getLogger };
