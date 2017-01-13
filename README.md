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
import SnackBarManager from 'react-native-snackbar-dialog'
const SnackBar = new SnackBarManager()
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

A SnackBar with confirgurable style.
```javascript
SnackBar.show('Making the world happier', {
  style: { marginBottom: 20 },
  backgroundColor: 'white',
  buttonColor: 'blue',
  textColor: 'yellow'
})
```

## Flow Control

This library handles messages order with piece of mind.

- `SnackBar.show(title, options)`
<br />For some operations like taking a screenshot requires the message to show it immediately. Using this method to give highest order among all Snack message.

- `SnackBar.add(title, options)`
<br />Tt will show it immediately if there isn't any active Snack message. Otherwise, it will enqueue and show it one by one when calling the `dismiss` function.

- `SnackBar.dismiss()`
<br />Adding it manually to `onConfirm` and `onCancel` props action to control the flow of show / hide.
