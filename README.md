# react-native-snackbar-dialog

A React Native SnackBar component with configurable dialog. Pull Requests are welcomed.

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Why react-native-snackbar-dialog?

- *Flexible* - Display as a popup message or a dialog
- *Controllable* - Everything is just JavaScript and React Native
- *Simple* - No configuration on the RootContainer and Redux

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
```javascript
SnackBar.show('Making the world happier', { isStatic: true })
```

Controlling the show/hide logic with the `onAutoDismiss` callback with 8 seconds duration (default: 5 seconds).
```javascript
SnackBar.show('Making the world happier', { duration: 8000 })
```

An inline SnackBar with an action button, triggering dismiss after confirm.
```javascript
SnackBar.show('Making the world happier', {
  confirmText: 'Learn more',
  onConfirm: () => {
    console.log('Thank you')
    SnackBar.dismiss()
  }
})
```

A SnackBar dialog with separated row action button display.
```javascript
SnackBar.show('Making the world happier', {
  confirmText: 'Learn more',
  id: 'CUSTOM_ID', // Custom ID to avoid duplicated items being added to the queue, which in turn to be shown multiple time
  tapToClose: true, // Default is false, if set, tapping on the SnackBar will dismiss it
  onConfirm: () => {
    console.log('Thank you')
    SnackBar.dismiss()
  },
  cancelText: 'No thanks',
  onCancel: () => {
    console.log('Hope to see you again')
    SnackBar.dismiss()
  }
})
```

A SnackBar with configurable style.
```javascript
SnackBar.show('Making the world happier', {
  style: { marginBottom: 20 },
  backgroundColor: 'white',
  buttonColor: 'blue',
  textColor: 'yellow'
})
```

A SnackBar at the top.
```javascript
SnackBar.show('Making the world happier', {
  position: 'top' // default to bottom
})
```

A SnackBar with nested actions. Always dismiss current SnackBar before showing a new one using the dismiss callback.
```javascript
SnackBar.add('Making the world happier', {
  confirmText: 'Learn more',
  onConfirm: () => {
    console.log('Thank you')
    SnackBar.dismiss(() => {
      SnackBar.show('Stay unstoppable!')
    })
  }
})
```

## Flow Control

This library handles messages order with peace of mind.
Calling these functions will show the message immediately if there is no active item.
Callback is optional, but it is suggested to use for flow control.

- `SnackBar.show(title, options, [callback])`
<br />Give highest priority to show among all Snack messages.

- `SnackBar.add(title, options, [callback])`
<br />Enqueue and show it one by one when calling the `dismiss` function.

- `SnackBar.dismiss([callback])`
<br />Control when and where to dismiss an active item, e.g. `onConfirm` and `onCancel` props action.

## Complete Example

```js
import React, { Component } from 'react'
import { Text } from 'react-native'
import SnackBar from 'react-native-snackbar-dialog'

export default class App extends Component {
  onPress = () => {
    SnackBar.show('Making the world happier', { isStatic: true })
  }

  render() {
    return (
      <Text
        style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }} onPress={this.onPress}
      >
        Open SnackBar
      </Text>
    )
  }
}
```