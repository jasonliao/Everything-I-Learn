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

* `tableView(numberOfRowsInSection`
* `tableView(cellForRowAt)` 
* `numberOfSections`


How to pass data from one view to another.




