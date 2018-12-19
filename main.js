/** @jsx html */
import { html } from 'snabbdom-jsx';
 const snabbdom=require('snabbdom');
import h from 'snabbdom/h';
import { Subject, Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
const update = (oldNode,newNode) => {
  oldNode = patch(oldNode, newNode)
  return oldNode
}
// var vnode = h('div#container.two.classes', { on: { click: someFn } }, [
//   h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
//   ' and this is just normal text',
//   h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
// ]);

let count = 0
const Btn = (props) => {
  console.log(props)
  return <button on-click={() => props.action.next(++count)}>Submit</button>
}


function Field(res) {
  // update parent from here
  const input = new Subject()
  const dom = (value) => <div key={1} hook={
    { postpatch: (old, vnode) => { console.log(vnode) } }
  }>
    <label>{value}</label>
    <input key={2} type="text"  id="kdkd" placeholder={res} on={{ input: (e) => input.next(e.target.value) }} />
  </div >
  let old = dom('')
  console.log('kkfkf',old)
  return input.pipe(
    map(res => {
      console.log(old)
      old = update(old, dom(res))
      return old
    }),
    startWith(old))
}

const render = (ob) => {
  let res
  ob.subscribe((e) => res = e)
  return res
}

function Form(state) {
  const action = { click: new Subject() }
  let dom = (num) => <div>
    <h1>title+{Math.random()}</h1>
    {/* {[1, 2, 3].map(e => render(Field(num)))} */}
{render(Field(num))}
    <Btn fa="sdf" action={action.click} />
  </div>
  return action.click.pipe(map(res => {
    return dom(res)
  }), startWith(dom('')))
  // return this.dom
}



var oldNode = document.getElementById('placeholder')
Form().subscribe(view => {
 console.log('kup') 
  update(oldNode,view)
})

// patch(document.getElementById('placeholder'), )