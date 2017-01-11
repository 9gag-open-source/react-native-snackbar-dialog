# react-native-snackbar-dialog

A React Native SnackBar component with configurable dialog. Pull Requests are welcomed.

[![Build Status][travis-badge]][travis]
[travis]: https://travis-ci.org/9gag-open-source/react-native-snackbar-dialog
[travis-badge]: https://img.shields.io/travis/9gag-open-source/react-native-snackbar-dialog.svg

## Why react-native-snackbar-dialog

- *In Control* - All done by React Native, without the need to link it manually
- *Flexible* - Using it as a popup message or a dialog, it is up to you
- *Time Saving* - Shipped together with Redux

## Preview

A SnackBar component that can display inline: <br />
![Inline Mode](./docs/inline.png)

And also can display as dialog: <br />
![Flat Mode](./docs/flat.png)

## Installation

```sh
yarn add react-native-snackbar-dialog
```

## Basic Usage

```javascript
import SnackBar from 'react-native-snackbar-dialog'
```

Render inline always shows SnackBar without any buttons.
```jsx
<SnackBar isStatic>
  Making the world happier
</SnackBar>
```

Controlling the show/hide logic with the `onAutoDismiss` callback with 8 seconds duration (default: 5 seconds).
```jsx
{
  this.props.showSnackBar && (
    <SnackBar duration={8000} onAutoDismiss={this.props.onSnackBarClose}>
      Making the world happier
    </SnackBar>
  )
}
```

An inline SnackBar with an action button.
```jsx
<SnackBar confirmText='Learn more' onConfirm={() => { console.log('Thank you') }}>
  Making the world happier
</SnackBar>
```

A SnackBar dialog with separated row action button display.
```jsx
<SnackBar
  confirmText='Learn more'
  onConfirm={() => { console.log('Thank you') }}
  cancelText='No thanks'
  onCancel={() => { console.log('Hope to see you again') }}
>
  Making the world happier
</SnackBar>
```

A SnackBar with confirgurable style.
```jsx
<SnackBar
  style={{ marginBottom: 20 }}
  backgroundColor='white'
  buttonColor='blue'
  textColor='yellow'
>
  Making the world happier
</SnackBar>
```

## Using with Redux

This library can be integrated with any Redux applications to handle messages to be displayed with proper order.

### Actions

- `SnackBar.actions.add(item)`
<br />If there isn't any items in the Store, it will show it immediately. Otherwise, it will enqueue and show it accordingly when the `dismiss` function is triggered.

- `SnackBar.actions.show(item)`
<br />Some operations like taking a screenshot require the message to show immediately. Using this method will not change the queue order.

- `SnackBar.actions.dismiss()`
<br />Adding this action to the props `onAutoDismiss` in root container tells Redux to dequeue the next item according to priority.
Or adding it manually to `onConfirm` and `onCancel` props action to control the flow of show/hide.

### Example

```jsx
import { View, Text } from 'react-native'
import SnackBar from 'react-native-snackbar-dialog'
import connect from 'react-redux'

function RootContainer ({ snack, addSnack, showSnack, dismissSnack }) {
  const inlineItem = {
    title: 'Making the world happier',
    confirmText: 'Learn more',
    onConfirm: () => {
      dismissSnack()
      console.log('Thank you')
    },
    duration: 10000
  }

  const dialogItem = {
    ...inlineItem,
    cancelText: 'No thanks',
    onCancel: () => {
      // Dispatching a new StackBar action when clicking cancel
      // Need not to use `dismissSnack` here since the `showSnack` will replace current active item
      showSnack(inlineItem)
    }
  }

  return (
    <View>
      <Text onPress={() => addSnack(inlineItem)}>Enqueue</Text>
      <Text onPress={() => showSnack(dialogItem)}>Show</Text>
      { snack && <SnackBar {...snack} onAutoDismiss={dismissSnack} /> }
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    snack: state.snackBar.current
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSnack: (item) => dispatch(SnackBar.actions.add(item)),
  showSnack: (item) => dispatch(SnackBar.actions.show(item)),
  dismissSnack: () => dispatch(SnackBar.actions.dismiss())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
```