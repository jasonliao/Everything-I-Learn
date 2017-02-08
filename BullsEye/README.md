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

## WebView

加载一个 `.html` 进来 webView 的方法很简单，可以在 `viewDidLoad` 方法里面执行或者包成一个函数在里面调用。主要的步骤是先找到项目里这个 `.html` 文件的，然后把它转成 HTML 数据，然后再用 webView 调用 `load` 方法就可以了。

```swift
if let url = Bundle.main.url(forResource: "BullsEye", withExtension: "html") {
    if let htmlData = try? Data(contentsOf: url) {
        let baseURL = URL(fileURLWithPath: Bundle.main.bundlePath)        webView.load(htmlData, mimeType: "text/html", textEncodingName: "UTF-8", baseURL: baseURL)
    }
}
```

## 适配

### 小尺寸

主要使用 constraints 来做 auto layout。关于 Auto Layout，Apple Developer 专门有一个 [Auto Layout Guide](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/) 来讲解。

### 大尺寸

去适配大尺寸的方法有很多，这一种是最简单的一种，如果应用没有去特意支持大尺寸的屏幕，那么应用就会自动去按比例放大整个应用。但是要想达到这个效果，就必须去除 `LaunchScreen.storyboard` 这个文件。第一步，delete。第二步，在项目设置里，把  Launch Screen File  这一栏的 Launch Screen File 置空。第三步，点击菜单栏 Product，点击 Clean 即可。

但这时候还没有完成，跑起应用时你会发现会有两条黑边在左右两侧，解决的方法就是在项目中添加一张启动图片，这样就可以去除应用的左右两条黑边了。

## Crossfade

添加动画可以让应用看起来更精致，但只需要简单的几行代码。

```swift
import QuartzCore

let transition = CATransition()transition.type = kCATransitionFadetransition.duration = 1transition.timingFunction = CAMediaTimingFunction(name:view.layer.add(transition, forKey: nil)
```














