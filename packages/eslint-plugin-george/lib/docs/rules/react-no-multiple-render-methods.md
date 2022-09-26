# Disallow multiple render methods in React components. (react-no-multiple-render-methods)

As a React component grows to render many elements, it is tempting to split the render method into multiple “sub-render” methods. While this may seem like an improvement in readability, the component's state, props, and class methods are still shared, making it difficult to identify which are used by each additional render method. The entire class becomes objectively more complicated, and it would be more effective to break those additional elements into entirely new components instead.

Another benefit to this approach is in testing. Anything that is substantial enough to warrant its own render method (or component) should be fully tested. By having `Foo` be its own functional component, its functionality can easily be unit tested with very little setup. When it comes to integration testing within `MyComponent` or higher up the tree, `Foo` can easily be asserted on by selecting the component itself as opposed to relying on inappropriate things like `className` or `ref`, or brittle things like relative position.

Others reasons for eliminating subrenders:
- Subrenders are a marionette pattern. Not React.
- Subrenders promote large containers with multiple responsibilities, that are harder to reason about. 
- Component composition is a central pattern in React. Subrenders go against this.
- Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Subrenders are not reusable, not independant, and coupled to the container.
- React is abandoning Class components in favor of Hooks, except for edge cases. Subrenders will make any refactoring more difficult, because the subrenders will have to be extracted into separate components.

## Rule Details

This rule disallows any `renderFoo` methods on a class.

Examples of **incorrect** code for this rule:


```ts
class MyComponent extends React.Component {
  renderFoo() {
    return (
      <div>
        {this.state.bar}
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderFoo()}
      </div>
    )
  }
}
```

Examples of **correct** code for this rule:

```ts
import Foo from './components/Foo';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <Foo bar={this.state.bar} />
      </div>
    )
  }
}
```

## When Not To Use It

If you do not want to restrict render methods on React class components, you can safely disable this rule.
