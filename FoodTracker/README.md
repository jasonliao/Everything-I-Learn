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

## Implement a Custom Control

### Create a Custom View

 在这个例子中，我们需要新建一个 stack view 来装载我们自定义的界面。但是我们是先定义这个 stack view 的文件，然后拖拽一个 stack view 的组件，然后再将他们绑在一块。

新建一个 stack view 的文件非常简单，`command+N` 新建，选择 iOS，设定类的名字，然后在子类中选择 `UIStackView`。

然后我们就可以看到我们的文件里有下列的代码 

```swift
import UIKit
class RatingControl: UIStackView {}
```

我们创建一个视图一般会有两个方法：第一个就是通过代码初始化，而另一个就是通过 storyboard。

`init(frame:)` 这个是通过代码初始化时需要，`init(coder:)` 是通过 storyboard 初始化时需要。

在这个例子中，我们这两个 `init` 方法都需要实现。

```swift
override init(frame: CGRect) {
    super.init(frame: frame)
}
 
required init(coder: NSCoder) {
    super.init(coder: coder)
}
```

### Display the Custom View

定义完文件之后，就去组件库拖拽一个 stack view 的组件出来，然后在 Identity inspector 中的 class 下拉中选择我们刚刚新建的那个 stack view 文件里的类，那么这时候这两个 stack view 的代码和视图就连在一起了。

### Add Buttons to the View

我们需要在这个 stack view 里创建一个按钮，这就需要我们在之前的 stack view 的文件里定义一个 `setButtons` 方法，因为这个只在这个类里使用，所以可以使用 `private` 关键字

```swift
private func setupButtons() {
    // Create the button
    let button = UIButton()
    button.backgroundColor = UIColor.red
    
    // Add constraints
    button.translatesAutoresizingMaskIntoConstraints = false
    button.heightAnchor.constraint(equalToConstant: 44.0).isActive = true
    button.widthAnchor.constraint(equalToConstant: 44.0).isActive = true
    
    // Add the button to the stack
    addArrangedSubview(button)
}
```

然后在两个 `init` 方法里调用这个方法。在初始化的时候生成这个按钮，接着我们就为这个按钮来添加事件。

先写一个事件函数

```swift
func ratingButtonTapped(button: UIButton) {
    print("Button pressed 👍")
}
```

然后把这个事件函数绑定在刚刚我们创建的按钮上。上一节我们为一个按钮绑定一个 action 我们可以在 storyboard 中通过拖拽的方式来完成，但这一次我们则是通过 `addTarget` 这个方法来完成。

`addTarget` 这个方法有三人参数：

1. 第一个是 `target`。我们使用 `self`，也就是这个 stack view 的类。
2. 第二个事件函数。就是我们刚刚定义的 `ratingButtonTapped`。但是我们还需要 `#selector` 这个函数来把他选中。`#selector(RatingControl.ratingButtonTapped(button:))`
3. 第三个是什么动作触发。一般的点击事件我们都选用 `.touchUpInside` ，因为当用户点击下去但是后悔的时候，就可以拖拽离开按钮区，这样这个方法就不会触发了。

所以我们在 `addArrangedSubview(button)` 这句代码前加上 

```swift
button.addTarget(self, action: #selector(RatingControl.ratingButtonTapped(button:)), for: .touchUpInside)
```

### Add Star Images to the Buttons

像上一节为 image view 添加照片一样，我们先把素材相片添加到 Assets.xcassets 里面，添加一个文件夹，然后在里面添加三张素材图片。

然后在代码里把这三张素材照片拿到

```swift
// Load Button Images
let bundle = Bundle(for: type(of: self))
let filledStar = UIImage(named: "filledStar", in: bundle, compatibleWith: self.traitCollection)
let emptyStar = UIImage(named:"emptyStar", in: bundle, compatibleWith: self.traitCollection)
let highlightedStar = UIImage(named:"highlightedStar", in: bundle, compatibleWith: self.traitCollection)
```

然后把按钮的背景换成图片

```swift
// Set the button images
button.setImage(emptyStar, for: .normal)
button.setImage(filledStar, for: .selected)
button.setImage(highlightedStar, for: .highlighted)
button.setImage(highlightedStar, for: [.highlighted, .selected])
```

一个按钮有5种状态，normal、highlighted、focused、selected 和 disabled。

## Define Your Data Model

### Create a Data Model

   这一节是关于如何创建和测试自己定义的数据模型。首先创建数据模型需要定义一个数据类，新建一个 swift 的文件，`import UIKit` 就可以了。

```swift
import UIKit
class Meal {}
```

然后定义有哪些属性，可选择的的属性后面加 `?`

```swift
var name: String
var photo: UIimage?
var rating: Int
```

使用 `var` 去定义这些属性是因为将来我们会改变他们的值，所以不采用之前一直使用的 `let`

接着我们就需要对这个数据模型进行初始化。

```swift
init?(name: String, photo: UIimage, rating: Int) {
    if name.isEmpty || rating < 0 {
        return nil
    }

    self.name = name
    self.photo = photo
    self.rating = rating
}
```

这里需要做一个判断，就是 meal 的 name 不可以为空，而且 rating 的值也不可以为负数，否则就会返回 `nil`，也正是因为这样，`init` 函数就有可能初始化不成功，所以 `init` 函数后也有一个 `?`。

### Test Your Data

我们的数据模型初始化得对不对，可以通过单元测试来检测， 我们的项目里也有一个 `FoodTrackerTests.swift` 的文件用于给我们的代码做单元测试。

我们先定义一个 `testMealInitializationSucceeds` 函数，用于装载成功的单元测试例子，`testMealInitializationFails` 则相反

```swift
func testMealInitializationSucceeds() {
    let zeroRatingMeal = Meal.init(name: "Zero", photo: nil, rating: 0)
    XCTAssertNotNil(zeroRatingMeal)
        
    let positiveRatingMeal = Meal.init(name: "Positive", photo: nil, rating: 5)
    XCTAssertNotNil(positiveRatingMeal)
}
    
func testMealInitializationFails() {
    let negativeRatingMeal = Meal.init(name: "Negative", photo: nil, rating: -1)
    XCTAssertNil(negativeRatingMeal)
        
    let largeRatingMeal = Meal.init(name: "Large", photo: nil, rating: 6)
    XCTAssertNil(largeRatingMeal)
        
    let emptyStringMeal = Meal.init(name: "", photo: nil, rating: 0)
    XCTAssertNil(emptyStringMeal)
}
```

我们可以通过 `command + u` 来跑我们的测试，发现测试不通过，原因是我们只判断的 `rating` 是不是正数，并没有判断它的值是不是超过了5，因为我们只有5颗星。

所以 `if` 语句修改为这样

```swift
guard !name.isEmpty else {
    return nil
}

guard (rating >= 0) && (rating <= 5) else {
    return nil
}
```

在一些情况下，使用 `guard` 比 `if` 优雅得多，例 [Swift 2.0: Why Guard is Better than If](http://www.jianshu.com/p/9fff7621ed75)

## Create a Table View

### Create the Meal List

UITableView 这个视图专门用于显示一些列表，而与之相对应的 UITableViewController 就是用于对这一类视图的行为进行控制。

我们先在 storyboard 里拖拽出一个 Table View Controller，它是一整个视图，拖拽出来之后放在我们原来的已经存在的视图的左边，并且把进入箭头放在刚刚拖拽出来的视图的左边，这就意味着应用刚刚启动的时候，会从这个新的视图开始。

点击 Table View 可以设置第一行的高度，而每一行，被称为 Table View Cell，现在先来自定义一个 Table View Cell

### Design Custom Table Cells

我们在 storyboard 里看到一行 Table View Cell，这就是我们的原型，因为下面每一行的样式行为都是一样的，所以我们只要设定一行就可以了。

我们需要新建一个 MealTableViewCell 的类继承于 UITableViewCell，用于声明这一行里会有点什么，同时我们还需要把 storyboard 里的 Table View Cell 与这个文件绑定起来。

这里需要两步：

1. 在 Attributes inspector 的 Identifier 字段里写上刚刚我们创建的那个文件，也就是 MealTableViewCell
2. 在 Identity inspector 的 Class 字段里同样选中 MealTableViewCell

接下来就可以在 storyboard 里的那一行 Table View Cell 里，通过拖拽组件把我们想要展示的东西组合起来。但是我们跑起应用来的时候，这个界面并不会出现，因为 Table View 需要 Table View Controller 来对我们刚刚的界面实例化出来。

我们刚刚把 storyboard 里的 Table View Cell 与 MealTableViewCell 这个类绑定起来了，但是 Cell 里的新建组件却没有在类里声明，很简单，像之前一样，把组件按住 ctrl 拖拽到代码里生成就可以了。

### Load Initial Data

刚刚说了，Table View Cell 里的东西都只是一个原型，要想在应用里显示出来，就要靠 Controller 去实例化，所以现在就来新建我们的 MealTableViewController。

新建这个文件之后已经有很多的模板代码了，但先不管，我们定义一个 `meals` 的属性，`meals` 是一个数组，里面装的都是上一节创建的 `Meal` 这个类的实例。

```swift
var meals = [Meal]()
```

然后还有一个私有的方法，用于加载每一个 Table View Cell 的数据。首先加载三张食物的照片，然后通过 Meal 的 `init` 方法生成三个实例，然后把这三个实例放到 `meals` 这个数组中

```swift
private func loadSimpleMeals() {
    let photo1 = UIImage(named: "meal1")
    let photo2 = UIImage(named: "meal2")
    let photo3 = UIImage(named: "meal3")

    guard let meal1 = Meal(name: "Caprese Salad", photo: photo1, rating: 4) else {
        fatalError("Unable to instantiate meal1")
    }
 
    guard let meal2 = Meal(name: "Chicken and Potatoes", photo: photo2, rating: 5) else {
        fatalError("Unable to instantiate meal2")
    }
 
    guard let meal3 = Meal(name: "Pasta with Meatballs", photo: photo3, rating: 3) else {
        fatalError("Unable to instantiate meal2")
    }

    meals += [meal1, meal2, meal3]
}
```

然后在 `viewDidLoad()` 这个方法里，调用 `loadSimpleMeals()`。

### Display the Data

要想把 Table View 的数据用刚刚的 Table View Cell 原型展示出来，需要两个很重要的东西，一个是数据源，另一个则是委托。数据源就是需要展示界面里填充的数据，而委托则是负责监听 Cell 的选择，点击等等的事件。

一个 Table View 需要这三个函数来支持数据源

```swift
func numberOfSections(in tableView: UITableView) -> Int
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
```

`numberOfSections` 就是这个 Table View 要显示多少个部分，在这里只需要一个 Section 就可以了，一个 Sections 里可以包含多个 Cell。所以直接在代码里返回 1 就可以了。

`tableView(_:numberOfRowsInSection:)` 这个就是 Section 里要展示多少行，也就是多少个 Cell，在这里我们返回 `meals.count`。

`tableView(_:cellForRowAt:)` 这个方法会在每展示一行的时候调用一次，这里我们就需要获取 `meals` 的数据，用 `MealTableViewCell` 这个类构造一个 Cell，返回给 Table View 用

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cellIdentifier = "MealTableViewCell"
        
    guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? MealTableViewCell  else {
        fatalError("The dequeued cell is not an instance of MealTableViewCell.")
    }
        
    let meal = meals[indexPath.row]
        
    cell.nameLabel.text = meal.name
    cell.photoImageView.image = meal.photo
    cell.ratingControl.rating = meal.rating
        
    return cell
}
```

最后，把 MealTableViewController 与 storyboard 里的 Table View 连在一起，选择整个 Table View，然后在Identity inspector 的 Class 里下拉选择 MealTableViewController 即可。

## Implement Navigation

### Add a Segue to Navigate Forward

两个视图的转换，称为 Segue。

为一个视图添加一个导航很简单，首先点击一下想要添加导航的视图，然后 Editor > Embed In > Navigation Controller 就可以了。然后下一步就是定制导航

### Configure the Navigation Bar for the Scenes

定制导航也非常的简单，只要双击导航条，就可以为导航添加一个 title。

我们常常看到导航的左侧或者右侧有一个按钮，这个按钮的组件叫做 Bar Button Item，这个组件非常的方便，因为 xcode 内置会给你很多种类型的导航按钮，我们可以在 Attributes inspector 的 System Item 里找到很多不同的类型。

想要把按钮和另一个视图连在一起，只要按住 ctrl 点击按钮并拖拽到相应的视图就可以了。这时会弹出一个窗口，让你选择 Segue 的类型，这个例子给我们介绍了两个类型。

Show Segue 会给你的所连接的视图自动添加一个 Navigation Bar，并且在左方有一个后退键，点击后退键会自动回到之前的那个视图，而且视图默认从右边滑动进入。

Present Modally 这个 Segue 不会为接连的视图添加 Navigation Bar，这样可以更加的自由，因为你可以为这个视图加上并且添加不同类型的 Bar Button Item。这个例子采用的就是这个 Segue，并为连接的视图添加一个 Navigation Bar，左边为 Cancel，右边为 Save 的 Bar Button Item。

### Create an Unwind Segue

当一个 Segue 触发的时候，`prepare(for:sender:)` 方法就会调用，我们需要在这个方法里面，把用户输入的一些东西，选择的一些图片，保存起来，所以我们在 `MealViewController` 里实现这个方法，在点击 Save 跳转回 Table View 之前，把这个视图里的信息保存起来。

``` swift
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    super.prepare(for: segue, sender: sender)
    
    guard let button = sender as? UIBarButtonItem, button === saveButton else {
        os_log("The save button was not pressed, cancelling", log: OSLog.default, type: .debug)
        return
    }
    
    let name = nameTextField.text ?? ""
    let photo = photoImageView.image
    let rating = ratingControl.rating
   
    meal = Meal(name: name, photo: photo, rating: rating)
}
```

然后在 `MealTableViewController` 里定义一个方法，这个方法就是点击 Save 之后的操作，为什么 Save 按钮是在 MealView 里，但是却定义在 MealTableView 里呢？

这就是 unwind segue。他需要在 action 定义在目标视图里，而它的参数就是跳转之前的那个视图，我们可以通过它拿到 meal，然后添加到 Table View 里。

```swift
@IBAction func unwindToMealList(sender: UIStoryboardSegue) {
    if let sourceViewController = sender.source as? MealViewController, let meal = sourceViewController.meal {
        
        let newIndexPath = IndexPath(row: meals.count, section: 0)
        
        meals.append(meal)
        tableView.insertRows(at: [newIndexPath], with: .automatic)
    }
}
```

那这个 action 怎么和 Save 按钮绑定在一起呢，只需要按住 ctrl 把 Save 按钮拖拽到本身视图的 Exit ，表示要点击完这样按钮后回到之前的视图。拖拽完后会出现一个弹窗，选择 action segue，然后选择我们刚刚的 `unwindToMealList` 就可以了。

而点击 Cancel 之后返回之前的视图，用我们熟悉的方法，按住 ctrl 把 Cancel 按钮拖拽到 `MealViewController` 生成 action 就可以了。

```swift
@IBAction func cancel(_ sender: UIBarButtonItem) {
    dismiss(animated: true, completion: nil)
}
```

调用 `dismiss` 方法会直接回到之前的视图，不会调用 `prepare` 方法。

## Implement Edit and Delete Behavior

### Enable Editing of Existing Meals

点击每一个 Table View Cell 的时候要跳到 MealView 详情页里进行编辑，我们只要选中 Table View Cell 然后按住 ctrl 拖拽到 MealView 就可以了。这时也会让我们选择 Segue 的类型，这里选择的是 show，这个时候进来的 MealView 不会有后退键因为我们已经为这个视图添加了两个 Bar Button。

点击 Bar Button 的 + 和点击 Table View Cell 都会打开 MealDetailView，而在跳转之前，都会调用 MealTableViewController 里的 prepare 方法，这里就要通过 segue 的 identifier 来区别，segue 的 identifier 可以通过在 Attributes inspector 里设置。

```swift
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    super.prepare(for: segue, sender: sender)
    
    switch(segue.identifier ?? "") {
    case "AddItem":
        os_log("Adding a new meal.", log: OSLog.default, type: .debug)
        
    case "ShowDetail":
        guard let mealDetailViewController = segue.destination as? MealViewController else {
            fatalError("Unexpected destination: \(segue.destination)")
        }
        
        guard let selectedMealCell = sender as? MealTableViewCell else {
            fatalError("Unexpected sender: \(sender)")
        }
        
        guard let indexPath = tableView.indexPath(for: selectedMealCell) else {
            fatalError("The selected cell is not being displayed by the table")
        }
        
        let selectedMeal = meals[indexPath.row]
        mealDetailViewController.meal = selectedMeal
        
    default:
        fatalError("Unexpected Segue Identifier; \(segue.identifier)")
    }
}
```

当我们是点击 Table View Cell 的跳转的时候，我们就获取目的视图，就是 MealDetailView，还有点击的 Table View Cell，并通过它得到排第几。然后就可以通过这个下标获取到 `meals` 里对应的 Meal 对象，然后赋值给 MealDetailView 里的 `meal` 变量。

然后再在 MealViewController 的 `viewDidLoad` 里对 `meal` 变量进行判断，如果 `meal` 不为 `nil`，就把里面相应的信息给到对应的组件中。

```swift
if let meal = meal {
    navigationItem.title = meal.name
    nameTextField.text   = meal.name
    photoImageView.image = meal.photo
    ratingControl.rating = meal.rating
}
```

接着我们就要对 Save 按钮做处理了，上一节说了，Save 为 unwind action，所以是定义在目标视图的 controller 里的，也就是 MealTableViewController 里。

```swift
@IBAction func unwindToMealList(sender: UIStoryboardSegue) {
    if let sourceViewController = sender.source as? MealViewController, let meal = sourceViewController.meal {
        
        if let selectedIndexPath = tableView.indexPathForSelectedRow {
            // Update an existing meal.
            meals[selectedIndexPath.row] = meal
            tableView.reloadRows(at: [selectedIndexPath], with: .none)
        }
        else {
            // Add a new meal.
            let newIndexPath = IndexPath(row: meals.count, section: 0)
            
            meals.append(meal)
            tableView.insertRows(at: [newIndexPath], with: .automatic)
        }
    }
}
```

`if let selectedIndexPath = tableView.indexPathForSelectedRow` 这句话判断 Table View 里是否存在点击过的 Cell，如果存在，表明是在 edit 状态。然后获取点击的行，通过行作为下标改变 `meals` 数组里相应的 `meal` 对象。然后再重新加载这一行。就可以看到修改后的数据了。

### Cancel an Edit to an Existing Meal

如果我们想放弃修改，点击 Cancel 并不会回来之前的视图，这是为什么呢？

 不同的展示类型有不同的用途，Present Modally 一般会用在用户要么一定要完成或者直接取消的任务中，例如之前的增加一个 meal，而 Show 这种一般使用导航的展示方法一般用在查看或者修改这样的情况中。

* Show(Push)：是在 Navigation View Controller 里，进入时由右向左，退出时由左向右。新压入的视图控制器有返回按钮（如果没有设置 Bar Button），单击可以返回。
* Present Modally：一般以动画的形式自下向上覆盖整个屏幕，用户无法与上一个视图交互，除非关闭当前视图。

而上一节的 `dismiss` 只能用于 Present Modally 这种展示的方法。

```swift
@IBAction func cancel(_ sender: UIBarButtonItem) {
    let isPresentingInAddMealMode = presentingViewController is UINavigationController
    
    if isPresentingInAddMealMode {
        dismiss(animated: true, completion: nil)
    }
    else if let owningNavigationController = navigationController {
        owningNavigationController.popViewController(animated: true)
    }
    else {
        fatalError("The MealViewController is not inside a navigation controller.")
    }
}
```

当 AddMeal 的时候采用的是 Present Modally，所以这时的 MealViewController 是继承于 UINavigationController 的，所以此时的 `isPresentingInAddMealMode` 为 true，可以直接用 `dismiss` 方法来退出这个视图。

而 ShowDetail 的时候采用的是 Show，这时相当于把 MealDetailView 直接推进 MealTableView 里，而用 `navigationController` 可以获得推进的 MealDetailView 的 UINavigationController，然后调用 `popViewController` 就可以让 MealDetailView 弹出。

### Support Deleting Meals

要添加删除功能就在 MealTableView 的左上角添加一个 Edit 的按钮，但如果像以前一样拖拽一个 Bar Button 出来，并把类型定义为 Edit，当我们点击的时候，并没有反应，因为还需要添加相应的操作。但如果我们直接在 `viewDidLoad` 里添加 `navigationItem.leftBarButtonItem = editButtonItem`，就会生成一个含有行为的 Edit 按钮。

然后把 `tableView` 关于 edit 的两个模板方法重写就可以了。


