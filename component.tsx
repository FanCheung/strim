// import { Subject, Observable } from 'rxjs'
// import { map, startWith } from 'rxjs/operators'
import { html } from 'snabbdom-jsx';
import * as Snabbdom from 'snabbdom-pragma'

/* @jsx html */
html.createElement = html
import * as snabbdom from 'snabbdom';

var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);

class MyComp {

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
console.log(html('div', null, []))
console.log(<div>kdsakfk</div>)
// alert('kdfk')
