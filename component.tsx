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
import { Subject, Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

const patch = snabbdom.init([ // Init patch function with chosen modules
  classModule, propsModule, styleModule, eventlistenersModule
]);

import h from 'snabbdom/h'

class Component {

  vDom
  constructor() {

  }
  // events streams
  on() { }

  render() {
    this.view('asdkf')
  }

  view(props) {
    this.vDom = <button on-click={props}></button>;
    return this.vDom
  }

  getService() {

  }

  input() {

  }

  destroy() {

  }
}



const render = (ob) => {
  let res
  ob.subscribe((e) => res = e)
  return res
}

const update = (oldNode, newNode) => {
  // oldNode = patch(oldNode, newNode)
  return oldNode
}

var oldNode = document.getElementById('placeholder')
// update(oldNode, <div>kdfjksf</div>)

console.log(h('div', {}, []))
console.log(<div>kdsakfk</div>)
// alert('kdfk')




function Field(props, children) {
  // update parent from here
  const input = new Subject()

  const dom = (value) => <div key={1} hook={
    { postpatch: (old, vnode) => { console.log(vnode) } }
  }>
    <label>{value}</label>
    <input key={2} type="text" id="kdkd" on={{ input: (e) => input.next(e.target.value) }} />
  </div >

  const old = dom(props)
  console.log('kkfkf', old)

  input.pipe(
    map(res => {
      console.log(old)
      old = update(old, dom(res))
      return old
    })
  ).subscribe()


  return old
}