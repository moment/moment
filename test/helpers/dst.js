import moment from '../../src/moment';

export function isNearSpringDST() {
    return (
        moment().subtract(1, 'day').utcOffset() !==
        moment().add(1, 'day').utcOffset()
    );
}
