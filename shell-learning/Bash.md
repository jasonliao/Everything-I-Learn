# Bash Script Tutorial

## Command Line Arguments

- **$0** - The name of the Bash script.
- **$1 - $9** - The first 9 arguments to the Bash script.
- **$#** - How many arguments were passed to the Bash script.
- **$@** - All the arguments supplied to the Bash script.
- **$?** - The exit status of the most recently run process.
- **$$** - The process ID of the current script.
- **$USER** - The username of the user running the script.
- **$HOSTNAME** - The hostname of the machine the script is running on.
- **$SECONDS** - The number of seconds since the script was started.
- **$RANDOM** - Returns a different random number each time is it referred to.
- **$LINENO** - Returns the current line number in the Bash script.

## Quotes

When we enclose our content in quotes we are indicating to Bash that the contents should be considered as a single item. You may use single quotes `'` or double quotes `"`.

- Single quotes will treat every character literally.
- Double quotes will allow you to do substitution (that is include variables within the setting of the value).

## Command Substitution

Command substitution allows us to take the output of a command or program (what would normally be printed to the screen) and save it as the value of a variable. To do this we place it within brackets, preceded by a $ sign.

```bash
$ myvar=$( ls /etc | wc -l )
```

or use back ticks

```bash
$ myvar=`ls /etc | wc -l`
```

## Exporting Variables

```bash
export var1
```

## User Input

```bash
read varname
```

```bash
read -p 'username: ' uservar
read -sp 'password: ' passwordvar
```

```bash
read var1 var2 var3
```

- Read will then take your input and split it on whitespace. 
- If there are more items than variable names then the remaining items will all be added to the last variable name. 
- If there are less items than variable names then the remaining variable names will be set to blank

## Arithmetic

- let

  ```bash
  let <arithmetic expression>
  ```

  ```bash
  #!/bin/bash

  let a=5+4
  echo $a #9

  let "a = 5 + 4"
  echo $a #9

  let a++
  echo $a #10

  let "a = 4 * 5"
  echo $a #20
  ```

  `+` `-` `*` `/` `++` `--` `%`

- expr

  ```bash
  expr item1 operator item2
  ```

  ```bash
  #!/bin/bash

  expr 5 + 4 #9

  expr "5 + 4" #5 + 4

  expr 5+4 #5+4

  expr 5 \* 4 #20

  expr 11 % 2 #1

  a=$( expr 10 - 3 )
  echo $a #7
  ```

difference with **let**

- print the answer directly
- don't need to enclose the expression in quotes.
- must have spaces between the items of the expression.

## Double Parentheses

```bash
$(( expression ))
```

```bash
#!/bin/bash

a=$(( 4 + 5 ))
echo $a # 9

a=$((3+5))
echo $a # 8

b=$(( a + 3 ))
echo $b # 11

b=$(( $a + 4 ))
echo $b # 12

(( b++ ))
echo $b # 13

(( b += 3 ))
echo $b # 16

a=$(( 4 * 5 ))
echo $a # 20
```

## Length of a Variable

```bash
${#variable}
```

## If Statements

```bash
if [ <some test> ]
then
  <command>
fi
```

```bash
if [ <some test> ]
then
  <command>
else
  <other commands>
fi
```

```bash
if [ <some test> ]
then
  <command>
elif [ <some test> ]
then
  <different commands>
else
  <other commands>
fi
```

### Test

| Operator | Description |
| :--- | :--- |
| ! Expression | The Expression is false |
| -n String | The length of String is greater than zero |
| -z String | The length of String is zero |
| String1 = String2 | String1 is equal to String2 |
| String1 != String2 | String1 is not equal to String2 |
| Integer1 -eq Integer2 | Integer1 is numerically equal to Integer2 |
| Integer1 -gt Integer2 | Integer1 is numerically greater than Integer2 |
| Integer1 -lt Integer2 | Integer1 is numerically less than Integer2 |
| -d File | File exists and is a directory |
| -e File | File exists |
| -r File | File exists and the read permission is granted |
| -s File | File exists and it's size is greater than zero |
| -w File | File exists and the write permission is granted |
| -x File | File exists and the execute permission is granted |

## Boolean Operations

- and - &&
- or - ||

```bash
#!/bin/bash

if [ -r $1 ] && [ -s $1 ]
then
  echo This file is useful.
fi
```

```bash
#!/bin/bash

if [ $USER == 'bob' ] || [ $USER == 'andy' ]
then
  ls -alh
else
  ls
fi
```

## Case Statements

```bash
case <varible> in
  <pattern 1>)
    <commands>
    ;;
  <pattern>)
    <other commands>
    ;;
esac
```

```bash
#!/bin/bash

case $1 in
  start)
    echo starting
    ;;
  stop)
    echo stoping
    ;;
  restart)
    echo restarting
    ;;
  *)
    echo dont\'t know
    ;;
esac
```

## Loops

## Resources

- [Bash Scripting Tutorial](http://ryanstutorials.net/bash-scripting-tutorial)
