# Working with Unix Processes

看《理解 Unix 进程》的笔记

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

Terminal Process -> Bash Process -> `ls` Process

如果想获取父进程的 `pid`，就可以使用 `getppid()`

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
