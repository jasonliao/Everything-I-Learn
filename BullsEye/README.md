# What I Can Learn From BullsEys

## 如何设置应用横屏启动

在 XCode 里选择该项目，在 General 的 Deployment Info 这一栏下，把 Portrait 去掉勾选。

## 生成随机数函数

`arc4random_uniform` 方法可以生成随机数，例如 `arc4random_uniform(100)` 可以生成 0 ~ 100 但不包含 100 的随机数。

## 为 `UIAlertAction` 添加 handler

`UIAlertAction` 的 `handler` 里添加任意多的方法函数，例如：

```swift
let action = UIAlertAction(title: "New Round!", style: .default, handler: {
    action in self.startNewRound()
})
```

## 为组件设置样式

### 按钮

按钮的大小可以在 Size inspector 里设置按钮的大小。而如果想设置按钮的背景图片，可以先在 Attributes inspector 中把 Type 设置为 Custom，然后在 Background 里选择已经在 Assets.xcassets 里添加好的 image set。

如果想设置 highlighted 的样式，则可以先把 State Config 设置为 highlighted，然后再设置其他参数项。

### icon 按钮

想把按钮设置成 icon 按钮，同样需要把 Type 设置成 Custom，然后把 Text 去掉，在 Image 里选择对应的 icon 就可以了。然后再在 Background 里选择对应的背景即可。

### slider

但是 slider 这个组件不可以在 Interface Builder 设置样式，但还是可以使用代码来设置样式。例如下面这段代码块：

```swift
let thumbImageNormal = UIImage(named: "SliderThumb-Normal")!
slider.setThumbImage(thumbImageNormal, for: .normal)
let thumbImageHighlighted = UIImage(named: "SliderThumb-Highlighted")!
slider.setThumbImage(thumbImageHighlighted, for: .highlighted)
        
let insets = UIEdgeInsets(top: 0, left: 14, bottom: 0, right: 14)
        
let trackLeftImage = UIImage(named: "SliderTrackLeft")!
let trackLeftResizable = trackLeftImage.resizableImage(withCapInsets: insets)
slider.setMinimumTrackImage(trackLeftResizable, for: .normal)
        
let trackRightImage = UIImage(named: "SliderTrackRight")!
let trackRightResizable = trackRightImage.resizableImage(withCapInsets: insets)
slider.setMaximumTrackImage(trackRightResizable, for: .normal)
```

首先是 slider 的那个小圆圈 thumb，我们用 `UIImage` 选择了两张图片，然后分别为 normal 和 highlighted 两个状态 `setThumbImage`，这样就可以改变 slider 那个小圆圈的样式。

然后就是 slider 的那条管道，可以为圆圈两边设置不同的样式，左右两边方法分别为 `setMinimumTrackImage` 和 `setMaximumTrackImage`。

因为图片要连成一条，所以要为左右两边的图片重新设置大小，让图片连接起来。所以使用 `resizableImage` 可以修改一下图片，而修改图片需要使用的 `insets` 需要提前定义，把 `left` 和 `right` 都延伸一点就可以了。












