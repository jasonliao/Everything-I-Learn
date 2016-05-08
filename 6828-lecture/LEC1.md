# LEC 1 - O/S overview

LEC 1: [Operation Systems](https://pdos.csail.mit.edu/6.828/2014/lec/l-overview.html) (handouts: [xv6 source](https://pdos.csail.mit.edu/6.828/2014/xv6/xv6-rev8.pdf), [xv6 book](https://pdos.csail.mit.edu/6.828/2014/xv6/book-rev8.pdf))

- Preparation: [Unix Intro](https://www.youtube.com/watch?v=tc4ROCJYbm0)
- Assignment: [HW: shell](https://pdos.csail.mit.edu/6.828/2014/homework/xv6-shell.html)
- Assignment: [Lab 1: C, Assembly, Tools, and Bootstrapping](https://pdos.csail.mit.edu/6.828/2014/labs/lab1/)

## Shell and system calls

### system calls

系统调用分为五大类

1. Process Control (load, exec, fork, kill, wait, allocate, free)
2. File management (create, delete, open, close, read, write)
3. Device Management (request, release, read, write, attach, detach)
4. Information Maintenance (time, data, process, file, device)
5. Communication (create, delete, send, receive, attach, detach)

### what does `fork()` do?

- copies user memory
- copies process kernel state (e.g. user id) 
- child gets a different PID
- child state contains parent PID
- returns twice, with different values 
- parent and child may run concurrently (e.g., on different processors)

为什么 `fork()` 可以完成上面的功能呢？`fork()` 函数是用来在原来的进程上创建一个新进程。新的进程被称为子进程，而原来存在的进程就叫父进程。你可以通过 `fork()` 的返回值来知道哪个是哪个

- -1，创建新进程失败，可能是超过进程数或者虚拟内存
- 0，当前程序运行在子进程中
- \> 0，在父进程中返回子进程的 pid

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

一旦 `fork()` 执行成功，系统就会复制同一份程序在另一个进程中，然后两个进程程序继续同时往下执行，如果返回值大于 0 的为父进程，等于 0 的为子进程

当然啦，也可以在当前进程中使用 `getpid()` 获取进程真正的 pid

Read More

- [What does fork() do?](http://www.unixguide.net/unix/programming/1.1.1.shtml)
- [The fork() System Call](http://www.csl.mtu.edu/cs4411.ck/www/NOTES/process/fork/create.html)

### What does `wait()` do?

[man wait(2)](http://linux.die.net/man/2/wait)

`wait()`，`waitpid()`，`waitid()` 这三个方法都是用于等待程序的子进程状态发生变化的系统调用，进程状态发生变化包括: 子进程终止(`exit(0)`)，子进程被信号停止，子进程被信号恢复

这些调用执行时会使该进程休眠，直到它的其中一个子进程状态发生改变，`wait(&status)` 相当于 `waitpid(-1, &status, 0)`，返回值则为状态改变的进程的 pid

这就是为什么当我们 `fork()` 一个子进程出来之后，在子进程执行完操作之后，一般都要 `exit(0)`，因为这样父进程才知道子进程什么时候终止，好继续执行其他操作

`while (wait(NULL) > 0)` 则是表示要所有的子进程状态都发生改变

Read More

- [What does wait(NULL) do on Unix?](http://stackoverflow.com/questions/13216554/what-does-wait-do-on-unix)
- [The wait() System Call](http://www.csl.mtu.edu/cs4411.ck/www/NOTES/process/fork/wait.html)

