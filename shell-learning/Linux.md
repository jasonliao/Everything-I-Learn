# Linux Tutorial

## Basic Command

```bash
$ pwd
# working directory

$ ls [options] [location]
# list the contents of a directory

$ cd [location]
# change directory
# cd without any arguments take you back to your home directory
```

## Everything is a File

## Linux is an Extensionless

```bash
$ file [path]
# what type of file
```

## Linux is Case Sensitive

## Spaces in names

- Quotes
  
  ```bash
  $ cd 'Holiday Photos'
  ```

- Escape Characters

  ```bash
  $ cd Holiday\ Photos
  ```

```bash
$ ls -a
# list the contents of a directory, including hidden files
```

## Manual Pages

```bash
$ man <command>
```

> Instead of trying to remember everything, instead remeber you can easily look stuff up in the man pages.

## Making a Directory

```bash
$ mkdir -p
# make parent directories as needed
```

```bash
$ cp  # copying a file or directory
$ mv  # moving or renaming a file or directory
$ rm  # removing a file or directory
```

## cat & less

```bash
$ cat > <file> # put content into files
$ cat <file> # display files content
```

```bash
$ less <file>
```

## Wildcards

- \* - represents zero or more characters
- ? - represents a single characters
- [] - represents a range of characters

## Permissins

```bash
$ chmod [permissions] [path]
```

**chmod** has permission arguments that made up of 3 components

- Who are we changing the permission for [ugoa]
- Are we granting or revoking the permission - indicated with either a plus(+) or minus(-)
- Which permission are we setting? read(r), write(w) or execute(x)

```bash
$ chmod g+wx <file>
$ chmod go-x <file>
```

### permissions shorthand

```bash
$ chmod 750 <file>
```

### permissions for directories

- r - read the contents of the directory (ls)
- w - write into the directory (touch or mkdir)
- x - enter that directory (cd)

## Filters

- head
  
  ```bash
  $ head -[number] <filename>
  # prints the first <number> lines of the file, default is 10
  ```

- tail

  ```bash
  $ tail -[number] <filename>
  # opposite of head
  ```

- sort

  ```bash
  $ sort -[option] <filename>
  # default it will sort alphabetically
  ```

- nl

  ```bash
  $ nl -[option] <filename>
  # show the line number
  ```

- wc

  ```bash
  $ wc -[option] <filename>
  # word count, lines number(l), words number(w), characters number(m)
  ```

- cut

  ```bash
  $ cut -[option] <filename>
  # man cut
  ```

- sed

  ```bash
  $ sed <expression> <filename>
  # search and replace our data
  ```

  basic expression format:

  ```bash
  $ sed 's/search/replace/g' <filename>
  ```

- uniq

  ```bash
  $ uniq [option] <filename>
  # remove duplicate lines from the data
  ```

- tac

  ```bash
  $ tac <filename>
  # cat in reverse
  ```

## Grep and Regular Expressions

```bash
$ egrep [options] <pattern> <filename>
```

```bash
$ egrep 'mellon' mysampledata.txt
# print the entire line for every line which contains the string 'mellon'
```

```bash
$ egrep -n 'mellon' mysampledata.txt
# with line number as well
```

```bash
$ egrep -c 'mellon' mysampledata.txt
# how many lines did match
```

- . (dot) - a single character.
- ? - the preceding character matches 0 or 1 times only.
- \* - the preceding character matches 0 or more times.
- \+ - the preceding character matches 1 or more times.
- {n} - the preceding character matches exactly n times.
- {n,m} - the preceding character matches at least n times and not more than m times.
- [agd] - the character is one of those included within the square brackets.
- [^agd] - the character is not one of those included within the square brackets.
- [c-f] - the dash within the square brackets operates as a range. In this case it means either the letters c, d, e or f.
- () - allows us to group several characters to behave as one.
- | (pipe symbol) - the logical OR operation.
- ^ - matches the beginning of the line.
- $ - matches the end of the line.

## Piping and Redirection

```bash
$ ls > test1
# save output into a file, cover old data with new data

$ ls >> test1
# appended the new data
```

```bash
$ ls | head -3
```

- \> - save output to a file.
- \>> - append output to a file.
- < - read input from a file
- 2> - redirect error messages.
- | - send thr out from one program as input to another program

> Every program you may run on the command line has 3 streams, **STDIN, STDOUT and STDERR**

## Process Management

```bash
$ top

$ kill

$ ps [aux]
```

```bash
$ jobs
# display a list of current jobs running in the background

$ fg
# move a background process into the foreground
```

<kbd>ctrl</kbd> + <kbd>z</kbd> pause the current foreground process and move it into the background

## Bash Scripting

```bash
#!/bin/bash 
# The very first line of a script should always be this line
# This line identifies which interpreter should be used
```

### The Shebang (#!)

If we don't know where our interpreter is located then we may use a program called **which** to find out 

```bash
$ which bash
# /bin/bash
```

### The Name

Typically, we put **.sh** extension on our scripts

### Execute

./yourscript.sh

### Variables

- no spaces on either side of the `=` sign.
- place a dollar sign($) before the variable name.

### Command line arguments and More

- $0 - the name of the script.
- $1 - $9 - $1 is the first argument, $2 the second and so on.
- $# - how many command line arguments were given to the script.
- $\* - all of the command line arguments.

### Back ticks

<kbd>`</kbd> save the output of a command to a variable

```bash
#!/bin/bash
# backticks.sh
lines=`cat $1 | wc -l`
echo The number of lines in the file $1 is $lines
```

```bash
$ ./backticks.sh test.txt
```

### Sample backup script

```bash
#!/bin/bash

date=`date +%F`
mkdir ~/projectbackups/$1_$date
cp -R ~/porjects/$1 ~/projectbackups/$1_$date
echo Backup of $1 completed
```

### if statements

`if [  ] then else fi`

```bash
#!/bin/bash
 
if [ $# != 1 ]
then
    echo Usage: A single argument which is the directory to backup
    exit
fi
if [ ! -d ~/projects/$1 ]
then
    echo 'The given directory does not seem to exist (possible typo?)'
    exit
fi
date=`date +%F`

# Do we already have a backup folder for todays date?
if [ -d ~/projectbackups/$1_$date ]
then
    echo 'This project has already been backed up today, overwrite?'
    read answer
    if [ $answer != 'y' ]
    then
        exit
    fi
else
    mkdir ~/projectbackups/$1_$date
fi

cp -R ~/projects/$1 ~/projectbackups/$1_$date
echo Backup of $1 completed
```

## Resources

- [Linux Tutorial](http://ryanstutorials.net/linuxtutorial)
- [LinuxCommand.org](http://linuxcommand.org/index.php)
- [Unix/Linux Shell Scripting](http://fog.ccsf.cc.ca.us/~gboyd/cs160b/online/index.html)
