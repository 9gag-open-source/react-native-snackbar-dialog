# react-native-snackbar-dialog

A React Native SnackBar component with configurable dialog.

## Installation

`yarn add react-native-snackbar-dialog`

## Usage

`import SnackBar from 'react-native-snackbar-dialog'`

A SnackBar that will disappear after 5 seconds with `onDismiss` callback.
```
<SnackBar
  onDismiss={() => { console.log('Good Bye!) }}
>
  Hello 9GAG
</SnackBar>
```

Render without auto disappearing.
```
<SnackBar isStatic>Hello 9GAG</SnackBar>
```

Explictly set the duration to disappear.
```
<SnackBar duration={8000}>Hello 9GAG</SnackBar>
```

An inline SnackBar.
```
<SnackBar
  confirmText='Reply'
  onConfirm={() => { console.log('Reply Confirm') }}
>
  Hello 9GAG
</SnackBar>
```

A dialog with separated row display.
```
<SnackBar
  confirmText='Reply'
  onConfirm={() => { console.log('Reply Confirm') }}
  cancelText='What is 9GAG?'
  onCancel={() => { console.log('9gag.com') }}
>
  Hello 9GAG
</SnackBar>
```

A SnackBar with confirgurable style.
```
<SnackBar
  style={{ marginBottom: 20 }}
  backgroundColor='white'
  buttonColor='blue'
  textColor='yellow'
/>