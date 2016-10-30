var priorities = {};

export function addUnitPriority(unit, priority, getterSetter) {
    priorities[unit] = {priority: priority, getSet: getterSetter};
}

export function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({
            unit: u,
            value: unitsObj[u],
            priority: priorities[u].priority,
            getSet: priorities[u].getSet
        });
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}
