import { emit } from './lib'
// import { Subject, Observable } from 'rxjs'
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




const render = (ob) => {
  let res
  ob.subscribe((e) => res = e)
  return res
}



var oldNode = document.getElementById('placeholder')

patch(oldNode as HTMLElement, <Todos
  a="kfk" items={[]} dataset={{ action: 'reset' }} ></Todos>)

