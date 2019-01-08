
import * as Snabbdom from 'snabbdom-pragma'
import { tap, scan, map, withLatestFrom, switchMap, combineLatest, startWith } from 'rxjs/operators'
import { action, getHook, update, setState, valueChange, setValue, patchChange, emit, on, } from './lib'
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Todo } from './Todo'

const dom = (props, children, { todoValue, todoUpdate, addTodo }) => {
  return <section>
    <input type="text"
      hook-init={() => { }}
      on-input={(e: any) => todoValue.next(e.target.value)} />
    <button on-click={function (e) {
      addTodo.next(e.target)
      // emit(props.addTodo, 'aksdkf')
      action('addTodo', e.target)
      // todo.elm.value = ""
    }}>Add</button>
    <button on-click={() => { }}>test</button>
    {props.items ? props.items.map(todo => <Todo item={todo} onUpdate={(e) => todoUpdate.next(e)}></Todo>) : null}
  </section >
}

function model(props, children) {
  const todoUpdate = new Subject()
  const addTodo = new Subject()
  const todoValue = new BehaviorSubject(null)

  const todoItems = addTodo.pipe(
    withLatestFrom(todoValue),
    map(res => res[1]),
    map((res: any) => {
      return { items: [{ title: res, id: new Date().getTime() }, ...props.items] }
    })
  )
  const output = { todoValue, todoUpdate, addTodo }
  // let view = dom(props, children, { todoValue, todoUpdate, addTodo })

  return [todoItems.pipe(
    map(newProps => Object.assign(props, newProps)),
    // scan((acc, newProps) => {
    //   console.log(acc)
    //   return update(acc, dom(newProps, children, { todoValue, todoUpdate, addTodo }))
    // }, view)
  ),
  { todoValue, todoUpdate, addTodo }]

  // return view
}

export const connect = (model, view) => {
  return (props, children) => {
    const [propStream, output] = model(props)
    const v = view(props, children, output)
    propStream.pipe(
      // startWith([props,output]),
      scan((acc, newProps) => {
        console.log(acc, newProps)
        debugger;
        return update(acc, view(newProps, children, output))
      }, v)
    ).subscribe()
    return v
  }
}

export const Todos = connect(model, dom)
// export const Todos = model
