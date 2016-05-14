# Working with Unix Processes

看《Working with Unix Processes》的笔记

## Overview

Unix 系统的内核在电脑的硬件之上，它包括了对文件系统的读写，通过网络发送数据，内存分配，或者调用其他硬件。我们的程序不允许直接访问内核，但可以通过系统调用来完成

programs -> system calls -> kernel -> hardware

我们可以通过 `man` 命令来查看所有系统调用的用途，而 manpages 分为四个部分

1. 通用命令
2. 系统调用
3. C 语言的库函数
4. 特别文件

manpages 有多个部分是因为有很多命令不仅仅是通用命令，还可能中系统调用

```bash
$ man 2 getpid
$ man 3 malloc
$ man find # same as man 1 find
```

## Processes Have IDs

系统中每个进程都有一个唯一的标识符，那就是 `pid`，但这个 `pid` 只是一个数字，并没有关于这个进程的任何东西。我们可以常常在 log 文件中可以看到它

我们可以用 `getpid()` 来获取当前进程的 `pid` 

## Processes Hava Parents

每个在系统中跑的进程都有一个父进程，也知道父进程的 `pid`(`ppid`)

例如你打开一个终端，那么终端就是一个进程，然后你在终端里运行 Bash，那么 Bash 就是终端的子进程，然后你运行 `ls`，那么 `ls` 这个进程的父进程就是 Bash

例如我们的终端里输入

```bash
$ ps -f
```

你可以看到 `ps -f` 的 PID 和 PPID，而 PPID 就是上一个进程的 PID，也就是 zsh 或者 bash。那 bash 的 PPID 那个数字是什么呢？我们可以这样看看

```bash
$ ps -f 10440 # 10440 就是 bash 的那个 PPID
```

你看到应该是你的终端了，例如我的 gnome-terminal

在系统调用中，如果想获取父进程的 `pid`，就可以使用 `getppid()`

## Processes Hava File Descriptors

运行中的进程会有唯一的 `pid` 标识，而正在打开的文件也有一个唯一的文件标识符。当然啦，在 Unix 中所以东西都是文件，所以进程也是一个文件，所以进程也会有文件标识符

每当我们在进程中打开一个资源，那么这个资源就会有一个文件标识符。文件标识符在不相关的两个进程中不会共享。

文件标识符会从最小的没有被占用的数用起，例如你打开第一个文件，这个文件的文件标识符为 3，再打开一个的时候，则为 4。这时如果关掉第一个文件，再打开另一个文件，那么这个文件也为 3

一般来说，一个进程的 0，1，2 文件标识符为 STDIN，STDOUT，STDERR 这三个标准的流

对文件处理的系统调用有 `open()`，`close()`，`read()`，`write()`，`pipe()`，`fsync()`，`stat()` 等等

## Processes Have Resource Limits

我们可以通过 `getrlimit()` 来获取该进程的资源限制，它会返回一个整形数组，第一个整数为资源的软限制，第二个则为硬限制。软限制并不是真正的限制，而是当你的同时打开的资源数量达到软限制数的时候，就会抛出异常，但你也可以修改那个限制。而硬限制的数字实在太大，你根本不可能同时打开那么多个资源，因为很可能在很早之前，硬件就已经限制你这么做了

但一般来说，只有超级用户才可能修改硬限制，但进程也可以在获取权限后通过 `setrlimit()` 修改，但一旦降低了硬限制之后，就不可以再升起来了

通过 manpages 来了解这两个系统调用

```bash
$ man 2 getrlimit
$ man 2 setrlimit
```

## Processes Have an Environment

这里说的环境是是环境变量，每个线程都会从父进程继承环境变量，环境变量可以从父进程中设置

环境变量有很多作用，例如可以使用它们来使我们的工作流程更方便。也就是说，可以用不同的环境就是来代表不同的开发环境，例如在 Node 中

```bash
$ NODE_ENV=dev node app.js
```

然后在 `app.js` 里进行判断

```javascript
if (process.env.NODE_ENV === 'dev') {
  // some code
}
```

没有系统调用可以修改环境变量，但是 C 语言库可以

```bash
$ man 3 setenv
$ man 3 getenv
```

## Processes Have Arguments

在我们执行命令的时候可以为进程传入一些参数，这样我们的程序就可以使用用户的一些输入。例如我们执行一个 Shell 程序

```bash
$ ./someshell.sh ~/file1 ~/file2
```

那么就可以使用 `$1`，`$2` 来获取 `~/file1` 和 `~/file2`

或者如果使用的是 node

```bash
$ node somejs.js ~/file1 ~/file2
```

那就可以使用 `process.argv[2]` 和 `process.argv[3]`

## Processes Have Names 

进程之间的通信在进程层级只有两个方法，一个是通过进程名，而另一个是进程的退出码

## Processes Have Exit Code

进程退出的时候，会有一个退出码，标志着是成功的退出是错误地退出。一般来说，如果退出码是 0 那么就是成功，否则则为失败。不同的数字也代表不同的错误，你可以根据线程的错误码来进行不同的处理

而退出进程的方法也有几种，例如

- `exit`

  ```bash
  exit # 成功退出，和 exit 0 一样

  exit 22 # 自定义退出码
  ```

  `atexit()` 会先执行

- `exit!`

  ```bash
  exit! # 强制退出，退出码默认为 1

  exit! 33 # 当然你也可能自定义
  ```

  `atexit()` 不会执行

- `abort`

  ```bash
  abort # 也是另一种不成功退出的方法，退出码默认也是 1

  abort "Somethind went wrong" # 可以传入信息，让 STRERR 输出
  ```

  `atexit()` 会在 STDERR 输出完后执行

- `raise`

  `raise` 不会让进程立刻退出，它会抛出一个异常，如果没有代码处理它，就会退出进程

  ```bash
  raise "exception!" # 和 `abort` 一样
  ```

Read More

- [man atexit](http://linux.die.net/man/3/atexit)

## Processes Can Fork

进程可以通过 `fork()` 来创建一个子进程，从 `fork()` 这条命令开始，原来的程序就会被复制一份，放到一个子进程里同时进行接下来的代码，可以通过 `fork()` 的返回值来判断该进程是父进程还是子进程，在父进程中，`fork()` 返回的是一个大于 0 的整数，这个数就是子进程的 pid，而在子进程中，`fork()` 就会返回 0。所以一般会看到这样的代码

```c
pid_t fork(void); // pid_t defined in sys/types.h
pid_t pid;

switch (pid = fork()) {
  case -1:
    perror("The fork failed!");
    break;
  case 0:
    // child process do something
    exit(0);
    break;
  default:
    // parent process get in here
    printf("Child's pid is %d\n", pid);
}
```

Read More

- [What does fork() do?](http://www.unixguide.net/unix/programming/1.1.1.shtml)
- [The fork() System Call](http://www.csl.mtu.edu/cs4411.ck/www/NOTES/process/fork/create.html)
- [man fork](http://linux.die.net/man/2/fork)

## Orphaned Processes

一般我们通过终端输入一条命令的时候，就会有一个进程在运行，把我们键盘的输入当成标准的输入，把进程执行完的东西当成标准的输出。当按 Ctrl-C 的时候，就让该进程退出

但当进程通过 `fork()` 创建了子进程之后，当你按 Ctrl-C 的时候是退出哪个进程呢，子进程？父进程？还是两个都退出？答案是父进程。这时子进程就会变成孤儿进程，但是孤儿进程不会因为父进程被杀掉而被杀掉，而是继续运行下去

怎么管理孤儿进程后面会说，现在先来了解两个概念

1. 守护进程 - 守护进程就是长时间运行在后台的进程，它们为了可以长时间运行就把自己故意变成孤儿进程
2. Unix 信号 - 可以通过 Unix 信号来与一些和终端会话无关的进程进行通信

## Processes Are Friendly

前面说到的，当用 `fork()` 创建一个子进程的时候，子进程就会把父进程在内存中的所有东西都复制过来使用。但是完全的复制全部数据会带来很大的开销，所以 Unix 采用了一种叫 copy-on-write(CoW)
的方式，顾名思义，就是在子进程中真正要写数据的时候，才把这个数据复制一份。也就是说，父进程和子进程会共用内存中的一份数据直到其中一方需要修改它，也就是在这个时候，两个进程就会适当地分离，使用各自关于这一个数据的内存，而其他数据内存则继续共享

## Processes Can Wait

`fork()` 创建了一个子进程之后，父进程和子进程就会同时运行接下面的代码，这对于一些子进程需要处理异步代码，而父进程则继续往下执行代码的情况非常有好处，但更多的时候我们是想当子进程处理完代码之后，父进程再执行他要处理的代码。这时就要用到 [`wait()`](http://linux.die.net/man/2/wait)

`wait()`，`waitpid()`，`waitid()` 这三个方法都是用于等待程序的子进程状态发生变化的系统调用，进程状态发生变化包括: 子进程终止(`exit(0)`)，子进程被信号停止，子进程被信号恢复

这些调用执行时会使该进程休眠，直到它的其中一个子进程状态发生改变，`wait(&status)` 相当于 `waitpid(-1, &status, 0)`，返回值则为状态改变的进程的 pid

这就是为什么当我们 `fork()` 一个子进程出来之后，在子进程执行完操作之后，一般都要 `exit(0)`，因为这样父进程才知道子进程什么时候终止，好继续执行其他操作

`while (wait(NULL) > 0)` 则是表示要所有的子进程状态都发生改变

Read More

- [What does wait(NULL) do on Unix?](http://stackoverflow.com/questions/13216554/what-does-wait-do-on-unix)
- [The wait() System Call](http://www.csl.mtu.edu/cs4411.ck/www/NOTES/process/fork/wait.html)

## Zombie Processes

当子进程已经死了，但是它的父进程还在进行着其他操作，没有对这个进程的退出状态进行处理回收，那么这个进程就是僵尸进程，或者另一种情况，就是子进程需要长时间的运行，而父进程不可能等到它结束再进行下面的代码，所以这时父进程也在执行其他任务，完全不理子进程的时候，那么这个子进程也会成为僵尸进程

因为内核会把已经退出的子进程的状态保留起来，直到父进程使用 `wait()` 来使用它。如果父进程不使用 `wait()` 来使用它，它就会一直存在，占用资源

如果你不打算使用 `wait()` 来处理子进程，那么就可以通过 [double fork](http://thinkiii.blogspot.jp/2009/12/double-fork-to-avoid-zombie-process.html) 来避免僵尸进程

```c
void double-fork()
{
  pid_t pid1, pid2;
  int status;

  if (pid1 = fork()) { // parent process
    waitpid(pid1, &status, NULL);
    // complete other tasks
  } else { 
    if (pid2 = fork()) { // child process
      exit(0);
    } else { // grandchild process
      // do the work which the parect process wants
      // its child process to do
    }
  }
}
```

当第一次 `fork()` 执行的时候，子进程只是简单的执行第二次 `fork()` 和 `exit()`，这样的话父进程就不需要长时间去等待子进程结束了(因为子进程只执行 `fork()` 和 `exit()`)，因为父进程使用了 `waitpid()` 去处理子进程，所以子进程不会成为僵尸进程

这时候父进程就可以去完成其他工作了，然后结束。而对于孙子进程，因为它的父进程已经死了，所以孙子进程会被 `init` 进程收养，而 `init` 进程会对它的每个子进程都进行回收处理。那么父进程就不需要等待太久，才去执行自己的任务，也没有僵尸进程产生

Read More

- [double fork to avoid zombie process](http://thinkiii.blogspot.jp/2009/12/double-fork-to-avoid-zombie-process.html)
- [why fork() twice](http://stackoverflow.com/questions/10932592/why-fork-twice)

## Processes Can Get Signals
