
// import { map, startWith } from 'rxjs/operators'
import { html } from 'snabbdom-jsx';
import * as Snabbdom from 'snabbdom-pragma'

/* @jsx html */
html.createElement = html
import * as snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class'
import propsModule from 'snabbdom/modules/props'
import styleModule from 'snabbdom/modules/style'
import eventlistenersModule from 'snabbdom/modules/eventlisteners'
import { Subject, Observable, ObjectUnsubscribedError, Notification, of } from 'rxjs'
import { tap, pluck, filter, map, startWith, materialize } from 'rxjs/operators'

const patch = snabbdom.init([classModule, propsModule, styleModule, eventlistenersModule])
import h from 'snabbdom/h'

export function emit(subject, value) {
  if (subject)
    subject.next(value)
  return subject
}

export function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false
    }
  });
};

export const update = (oldNode, newNode) => {
  oldNode = patch(oldNode, newNode)
  return oldNode
}

export function patchChange(currentVNode, dom, props, children) {
  return tap(() => {
    currentVNode = update(currentVNode, dom(props, children))
    return currentVNode
  })
}

function filterAction(value) { return filter(({ action }) => action === value) }

export const onStateChange = (value) => state.pipe(filterAction(value), map((res: any) => ({ [value]: res.data })))

export const onAction = (value) => state.pipe(filterAction(value), map((res: any) => ({ [value]: res.data })))

const state = new Subject()

export const setState = (a, data) => {
  state.next({ action: a, data })
  return state
}

const attachRef = (dest) => (src) => {
  dest = src
  return dest
}
