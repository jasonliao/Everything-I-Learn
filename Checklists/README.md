# What I Can Learn From Checklists

## 设置应用打开的第一个 View

如果你更换了不同的 View 作为应用打开的第一个视图，你可以直接拖拽 -> 这个箭头到第一个 View 的左侧。但如果你找不到这个箭头，也可以选中指定视图，到 Attributes inspector 的 View Controller 里勾选中 Is Initial View Controller。

## TableView

TableView 并不是像名字那样是一个 Table，有行有列。TableView 更像是一个 List，一列多行。而 UIKit 更是提供了一个叫 CollectionView 的东西，这个东西的工作原理和 TableView 很像，但可以支持多列，可以说 CollectionView 更像是 Table。

TableView 有两种样子，一种叫“plain”，另一种叫“grouped”。从样子上看，他们的区别就是 grouped 样子的 TableView 会把一组的几项放在一个亮灰色的背影下。

### cell & row

TableView 会把他们的数据展示在 Cell 里，Cell 和 Row 很像但并不完全一样，Cell 是那些出现在屏幕上的 Row，假如你有 100 条 Row，但是屏幕上只能显示 5 条，那么那 5 个就是 Cell。因为 Cell 里展示的东西都类似，所以我们设计一个 Cell，就可以运用到其他上去。正因为这样，XCode 给我们提供了 prototype cells。

### design prototype cells

可以为 Table View Cell 的最右侧添加一个叫 accessory 的东西。下拉菜单里有一些选项，可以打勾，也可以查看详情，也可以箭头跳转等等。

记得为 Table View Cell 设定特定的 Identifier，这有助于正确显示不同的 Cell 样式和重用已经存在的 Cell，可以让 TableView 滚动起来更中顺畅。

但现在跑起应用来还是不可以看到任何东西，因为我们还没有数据。

### table view data source

 在生成的 `CheckListTableViewController` 这个类里，可以看到 MARK: - Table view data source 这一行注释下面有三个函数，分别是：

* `numberOfSections`
* `tableView(numberOfRowsInSection)`
* `tableView(cellForRowAt)` 

要想在 TableView 里展示数据，这三个函数必不可少。它告诉了 Table View 如何展示和展示多少的数据。

例如 `numberOfSections`  告诉 TableView 有多少个部分，一个部分可以包含多个 Cell。 `tableView(numberOfRowsInSection)` 则说明有多少行在一个 Section 里面。而 `tableView(cellForRowAt)` 则说明使用哪个 Table View Cell 来渲染数据，这时传入的就是 Identifier 了。

每渲染一行，都会调用 `tableView(cellForRowAt)` 一次，`indexPath` 参数则是指定一行的对象，可以用 `indexPath.row` 来获取第几行。

### `viewWithTag` instead of `@IBOutlet`

使用 Tag 可以很方便的关联到我们想要的组件，方法是在选中组件的 Attributes inspector 里把 Tag 设定成一个特定的数字，然后再用 `viewWithTag` 方法找到刚刚的组件。

为什么在这里不直接 ctrl 加拖拽把 label 组件拉到文件里关联形成 `@IBOutlet` 呢？因为如果我们使用了 prototype cell 里的 label 作关联，那么只会对一个 label 有关联，而不会对每一行 cell 里的 label 进行关联。所以如果组件是属于 Table View Cell 里的，就不能用 `@IBOutlet` 的方法来关联组件到 View Controller 里。

但可以新建一个 Table View Cell 的类继承于 `UITableViewCell`，然后在 Table View Cell 的 Identity inspector 里选中这个类。那么这样就可以在 prototype cell 里把组件使用  `@IBOutlet` 的方式关联到这个类里，然后再在 TableViewController 里使用。

### tapping on the rows

看完了 Table View 的数据来源，接着就是它的事件委托。`tableView(didSelectRowAt)` 是当点击 cell 时会触发的函数。

在这个例子里，设定了一个叫 accessory 的东西在右侧，当点击 cell 的时候，就要改变他的值，形成 toggle 勾选。

### `tableView(cellForRowAt)` & `tableView.cellForRow(at)`

我们获取点击的 cell 的时候，会使用 `tableView.cellForRow(at)`，但这个方法是找已经存在的 cell，如果 cell 不存在，就会返回 nil。需要区别的是获取数据来源的方法 `tableView(cellForRowAt)`，这个方法也是返回一个 cell 的对象，但这个方法是当有新的 row 出现在视区时自动调用的方法，我们不会手动调用这个方法。

## Data Modal

ViewController 负责 View 和 Modal 之间的通信，所以在 View 里展示的数据，应该从 Modal 里获取。

一般的，把 prototype cell 里的元素（数据）构造成一个类，例如这里只有一个 label 和 checkmark，那我们的 ChecklistItem 类就只有两个属性，`text` 和 `checked`。当然还有一个构造函数 `init` 方法。

而 TableViewController 里一般就有一个这个类的集合，会在  `viewDidLoad`  方法里加载数据形成，然后在 `tableview(cellForRowAt)` 里根据 `indexPath` 获取出来，然后给 Table View Cell 返回。而在 `viewDidLoad`  方法里，则会加载数据形成这一集合。

## Navigation Controller

选中想要添加 Navigation Controller 的 View，然后 Editor → Embed In → Navigation Controller 就可以了。

### adding new row

添加新的一行需要做的事情：

* 创建一个新的数据类型实例 - `init()`
* 创建下一列 `indexPath` - `IndexPath(row:, section:)`
* 把数据添加到集合里 - `append()`
* 把新的一列插入到 tableView 里 - `insertRows(at:, with:)`

### deleting rows

删除一行需要做的事情：

* 在集合里把数据删掉 - `remove(at:)`
* 在 tableView 里删掉指定行 -  `deleteRows(at:, with:)`

这里有两个函数需要看看，分别是 `tableView(canEditRowAt:)` 和 `tableView(commit: forRowAt:)`。

`tableView(canEditRowAt:)` 是一个 Boolean 函数，可以指定特定一行不可编辑，当然也包括删除。例如可以设置最后一行不可以被删除，那么只要判断当 `indexPath.row == checklistItems.count - 1` 时，返回 `false` 就可以了。

`tableView(commit: forRowAt:)` 里的 `editingStyle` 参数可以判断是 `.delete` 还是 `.insert`，如果是 `.delete` 删除，执行上面两个步骤就可以了。

## Static Table Cells

Table View 里除了 Dynamic Prototypes 这一默认类，还有 Static Cells 这一类，可以选中 Table View 之后，在 Attributes inspector 的 Content 里面修改。然后个性 Style 为 Grouped，这样就看到三行被包裹在一起，放在亮灰色的背景上。



