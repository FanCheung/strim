const Todos = (props, children) => {
  let todo = {}
  const addTodo = new Subject()
  // props.items = []
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={res => todo = res}
        on-input={(e: any) => fire('todo')(e.target.value)} />

      <button on-click={function (e) {
        // controlled from
        addTodo.next(todo.elm.value)
        // uncontroled form
        console.log(todo.elm.value)
        todo.elm.value = ""
      }}>Add</button>
      {props.items.map(todo =>
        <Todo item={todo}>{children}</Todo>
      )}
    </section>

  const view = dom(props, children)

  const doUpdate = (currentVNode, props, children) => tap(() => {
    currentVNode = update(currentVNode, dom(props, children))
    return currentVNode
  })

  // of({props,children}),

  addTodo.pipe(
    map(todo => {
      props.items.push(todo)
      return props
    }),
    // map(todos => Object.assign(props, { todos })),
    // attach(props,children,value)
    doUpdate(view, props)
  ).subscribe()

  return view
}