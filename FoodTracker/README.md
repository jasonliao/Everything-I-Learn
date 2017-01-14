# Start Developing  iOS Apps (Swift)
#swift

先跟着苹果开发者网站的 [FoodTracker](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/index.html#//apple_ref/doc/uid/TP40015214-CH2-SW1) 这个 Demo 来学习一些简单的控件使用和 Xcode 的使用方法。

## Build a Basic UI
这一节主要关于 Xcode 的一些使用，例如在 storyboard 中组件的拖拽、模拟器的使用等等，最重要的就是如何采用自适应布局来适应不同大小的终端

### Adopt Auto Layout

* stack view - 对多个 UI 组件的包裹
* constraints - 相对于上一层级的限制

Stack view 可以把选中的组件包裹在一起来统一处理，可以设置他们是行分布还是列分布。然后再为这个 stack view 设置 constraints 就可以了。设置 constraints 的时候要注意几点：

1. 设置 spacing 的时候一定要把那条红色的“工”字线点亮，不然会不起作用
2. Update Frames 要选择 Items of New Constraints，这样 IB 就会自动刷新了
3. 点击下面的 Add x Constraints 按钮，对应的是上面你点击了多少条红色的“工”字线

当然了，除了可以为 stack view 设置 constraints 之外，还可以为某一个单独的组件设置 constraints

在 FoodTracker 这个例子中，我们把 TextLabel、TextField 和 Button 包裹在了一个 stack view 里面，这个 stack view 是下属于 view，也就是我们能看到视窗的整个区域。然后对它设置上为 20，左右都为 0 的 constraints，也就是说，不管视窗有多大，我们的 stack view 都是距离上方 20，并且占满了整个宽度。

然后我们再对 TextField 这个组件单独设置了左右边为 0 的 constraints，因为 TextField 是相对于 stack view 的，所以 TextField 的宽度也始终占满 stack view。那么就实现了，不管视窗多大的情况下，TextField 都会占满整个宽度的效果。

![](Start%20Developing%20%20iOS%20Apps%20(Swift)/B1C69FA3-FE5F-4165-A6E8-55E3708EA970.png)

## Connect the UI to Code

真正需要写代码的时候来了，我们需要对刚刚建立的 UI 和行为绑定起来。

### Create Outlets and Actions

Outlets 就是刚刚 UI 组件对象的一个引用，在 Xcode 里可以直接按住 ctrl 来把在 storyboard 里的组件拖拽到 ViewController 里生成。

例如拖拽了一个 TextField 之后，就会生成这样的代码：

```swift
@IBOutlet weak var nameTextField: UITextField!
```

拖拽后在弹出窗的 connection 里可以选择 action，那么就会生成一个 action

```swift
@IBAction func setDefaultLabelText(_ sender: UIButton) {}
```

在完成这个功能的时候，遇到了一个错误，在 AppDelegate 里报了 Thread 1: Signal SIGABRT 这个错误，原来每次拖拽的时候，都会对每个 outlet 进行一个引用，当一个组件出现多个引用，或者有引用但却在代码中删除掉的时候，也会 build 不起来。

我们可以点击了某个组件之后，在 Utilities 的 connections inspector 里可以看到 outlet 的引用，如果有多个，或者有引入却没有在代码中使用的时候，就会报上述的错误。

![](Start%20Developing%20%20iOS%20Apps%20(Swift)/C3023A6F-053D-401C-949D-33FD358DFAD6.png)


### Process User Input

因为我们需要对用户输入的东西进行监听，所以需要对我们的 TextField 进行事件的委托，但是本来 UIViewController 并没有这些委托的方法，所以我们的 ViewController 还需要继承于 UITextFieldDelegate。

```swift
class ViewController: UIViewController, UITextFieldDelegate {}
```

然后把 ViewController 在视图加载之后，赋值给 TextField 的 outlet 对象

```swift
override func viewDidLoad() {
	super.viewDidLoad()
	// Handle the text field’s user input through delegate callbacks.
	nameTextField.delegate = self
}
```

`UITextFieldDelegate` 这个类有几个方法比较重要，就像一些生命周期函数。详情可以看 [这里](https://developer.apple.com/reference/uikit/uitextfielddelegate)

但是在这个例子里面，我们只需要对 `textFieldShouldReturn` 和 `textFieldDidEndEditing` 这两个函数进行设置，第一个是当敲击键盘完成的时候，进行的工作。第二则是完成输入之后，进行的工作。

```swift
func textFieldShouldReturn(_ textField: UITextField) -> Bool {
	// Hide the keyboard.
	textField.resignFirstResponder()
	return true
}

func textFieldDidEndEditing(_ textField: UITextField) {
	mealNameLabel.text = textField.text
}
```

到这里这两节就完了，当打开 App 的时候可以直接聚集到这个 TextField 上，可以在 `viewDidLoad` 这个方法里，执行 `nameTextField.becomeFirstResponder()` 这个方法，那么这个 TextField 就会自动聚焦，并且弹出键盘。∂