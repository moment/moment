import { isDuration } from './constructor'

export var operandNotDurationErrorMessage = 'Operand is not a Moment Duration instance'

function withDurationOperand (operatorFunc) {
  var parentDur = this
  return function (operand) {
    if (!isDuration(operand)) {
      throw new Error(operandNotDurationErrorMessage)
    } else {
      return operatorFunc(parentDur, operand)
    }
  }
}

function _eq (durA, durB) {
  return durA.asMilliseconds() === durB.asMilliseconds()
}

function _gt (durA, durB) {
  return durA.asMilliseconds() > durB.asMilliseconds()
}

function _lt (durA, durB) {
  return durA.asMilliseconds() < durB.asMilliseconds()
}

function _gte (durA, durB) {
  return durA.gt(durB) || durA.eq(durB)
}

function _lte (durA, durB) {
  return durA.lt(durB) || durA.eq(durB)
}

export function eq (dur) {
  return withDurationOperand.call(this, _eq)(dur)
}

export function gt (dur) {
  return withDurationOperand.call(this, _gt)(dur)
}

export function lt (dur) {
  return withDurationOperand.call(this, _lt)(dur)
}

export function gte (dur) {
  return withDurationOperand.call(this, _gte)(dur)
}

export function lte (dur) {
  return withDurationOperand.call(this, _lte)(dur)
}