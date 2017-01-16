# Start Developing  iOS Apps (Swift)

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

![](http://ww3.sinaimg.cn/large/7988751agw1fbqknml3zjj20bg074dgn.jpg)

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

![](http://ww3.sinaimg.cn/large/7988751agw1fbqktr8m6oj20eg08ujsq.jpg)

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

到这里这两节就完了，当打开 App 的时候可以直接聚集到这个 TextField 上，可以在 `viewDidLoad` 这个方法里，执行 `nameTextField.becomeFirstResponder()` 这个方法，那么这个 TextField 就会自动聚焦，并且弹出键盘。

## Work with View Controllers

### Understand the View Controller Lifecycle

![](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/WWVC_vclife_2x.png)

### Add a Meal Photo

这里只要使用组件直接拖拽一个 image view 出来就可以了，这里主要是如何在项目中引入一张图片：

1. 先在 Assets.xcassets 里 New Image Set。
2. 然后对新的 image set 双击设定一个名字。
3. 然后把图片拖拽到其中一个框框里，不同的框框代码代表不同的分辨率，在不同的设备上显示不同。
4. 然后选择 image view，在属性的 image 里下拉就可以看我们刚刚命名的图片，选中就可以了。

### Create a Gesture Recognizer

我们需要给 image view 一个 tap gesture 是因为在更换图片的时候，我们需要点击这个区域，这个手势同样需要添加进来，而添加的方法和添加组件的方式一样，同样是在 object library 里找到，拖拽到 image view 上就可以了。

### Connect the Gesture Recognizer to Code

从 scene dock 里一样 ctrl 拖拽到代码中，选择 action，就会在代码里多出这样的一个 action。

```swift
@IBAction func selectImageFromPhotoLibrary(_ sender: UITapGestureRecognizer) {
}
```

### Create an Image Picker to Respond to User Taps

点击之后，需要弹出一个选择图片的 image picker，和 UITextFieldDelegate 一样，image picker 也需要一个这样的委托类，同时，还需要一些简单的负责导航的功能，所以我们的 ViewController 需要继承多两个类。

```swift
class ViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {}
```

这时就要实现 `selectImageFromPhotoLibrary` 这个 action。我们先创建一个照片的选择器

```swift
let imagePickerController = UIImagePickerController()
```

然后把这个选择器的照片源设定一下，只可以比照片中选，不可以拍照等等。

```swift
imagePickerController.sourceType = .photoLibrary
```

然后确保当用户选择了图片之后，ViewController 可以知道

```swift
imagePickerController.delegate = self
```

当照片选择器出现了之后，我们需要对两个动作进行监听，一个就是用户点击取消按钮的时候，另一个就是当用户选择了照片之后，所以我们要分别实现 `imagePickerControllerDidCancel` 和 `imagePickerController` 这两个函数。

第一个很简单，就是当用户点击取消之后，我们把照片选择器关掉就可以了

``` swift
func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
	// Dismiss the picker if the user canceled.
	dismiss(animated: true, completion: nil)
}
```

而第二个就是先把用户选择的第一张照片拿到，然后设置到 image view 的图片，然后再关掉照片选择器

```swift
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
	// The info dictionary may contain multiple representations of the image. You want to use the original.
	guard let selectedImage = info[UIImagePickerControllerOriginalImage] as? UIImage else {
		fatalError("Expected a dictionary containing an image, but was provided the following: \(info)")
	}
        
	// Set photoImageView to display the selected image.
	photoImageView.image = selectedImage
        
	// Dismiss the picker.
	dismiss(animated: true, completion: nil)
}
```

这时按照教程的要求是把 app 跑起来，点击选择照片之后报错，因为我们还需要去处理一下请求访问用户相册的权限。但是却到这一步之前，我点击 image view 却没有反应。

回到 storyboard，选择了 image view 之后，在属性面板里有一个 User Interaction Enabled，勾选上就可以了。

之后就是和教程一样的在 `info.plist` 里添加 Privacy - Photo Library Usage Description 即可。

