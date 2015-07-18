# Timer with React

## `getInitialState`

This is called before our `render` function. The object that is returned is assigned to `this.state`, we can use it via `this.state.xxx`.

e.g.

```javascript
getInitialState () {
  return {
    xxx: xxx,
    yyy: yyy
  };
}
```

## `componentDidMount`

`componentDidMount` is called by react when the component has been rendered on the page. 

## `componentWillUnmount`

This method is called immediately before the component is removed form the page and destroyed.
