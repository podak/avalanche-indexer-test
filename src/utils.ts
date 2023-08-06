export function overwriteFromEnv(config: {[key: string]: any}): void {
    Object.keys(config).forEach((k) => {
        const cast = fromString(typeof config[k], process.env[k]);
        config[k] = cast !== undefined
            ? cast
            : config[k];
    });
}

function fromString(type: any, override: string): any {
    switch (type) {
        case 'boolean':
            override = override.toLowerCase();
            if (override === 'true' || override === 'yes' || override === '1') {
                return true;
            } else if (override === 'false' || override === 'no' || override === '0') {
                return false;
            }
            return undefined;

        case 'number':
            const num = parseFloat(override);
            if (isNaN(num)) {
                return undefined;
            }
            return num;

        case 'string':
            return override;

        default:
            return undefined;
    }
}