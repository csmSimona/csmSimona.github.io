# Python编程：从入门到实践

格式缩进建议为4个空格

## 一、基础知识

在 Python 中，注释用井号（#）标识。

也可用三引号做多行注释

### 1、字符串

#### 三引号

三个引号（三个单引号或三个双引号）可以创建跨行字符串

```python
print("""Hello Python world!
Hello iTuring!""")

=>
Hello Python world!
Hello iTuring!
```

#### 大小写修改

- upper()：将字符串全部改为大写
- lower()：将字符串全部改为小写
- title()：每个单词的首字母大写

ps：原始字符串不会被修改

```python
str = 'hello world'
print(str.title())
print(str)

=> Hello World
=> hello world   
```

#### 在字符串中使用变量

可以在 f 字符串中，使用花括号来引用代码中定义的变量。f 是 format 的简写

```python
name = 'Eric'
str = f'Hello {name}, would you like to learn some Python today?'
print(str)
=> Hello Eric, would you like to learn some Python today?

```

用format格式化字符串

```python
name='张三'
year='龙'

message_content1 = '祝{0}，新春快乐，{1}年大吉'.format(name, year)
message_content2 = '祝{current_name}，新春快乐，{current_year}年大吉'.format(current_name = name, current_year = year)
message_content3 = '祝{name}，新春快乐，{year}年大吉'.format(name = name, year = year)

print(message_content1)
print(message_content2)
print(message_content3)
```

数字格式化字符串，使用 .数字f 保留小数位

```python
num = 98.7675
print(f'你的分数是{num: .2f}')
=> 98.77
```

#### 删除空白

- lstrip()：移除左端的空白
- rstrip()：移除右端的空白
- strip() ：移除两端的空白

ps：原始字符串不会被修改

#### 删除前缀

removeprefix()：移除字符串中指定的前缀

```python
url = 'https://www.ituring.com.cn'
url = url.removeprefix('https://')
print(url)

=> www.ituring.com.cn

```

#### 删除后缀

removesuffix()：移除字符串中指定的前缀

```python
file_name = 'python_notes.txt'
print(file_name.removesuffix('.txt'))
=>python_notes
```

### 2、数

高级计算：math库

```python
print(0.1+0.2)
=>0.30000000000000004
```

将任意两个数相除，结果总是浮点数，即便这两个数都是整数且能整除

```python
print(4/2)
=> 2
```

双斜杠（//）：表示整数除法

```python
print(4 // 3)
=> 1
```

双乘号（ \*\*）：表示乘方运算

```python
print(4.0**2)
=> 16.0
```

求模（%）：两个数相除并返回余数

```python
print(9 % 2)
=> 1
```

在 Python 中，无论是哪种运算，只要有操作数是浮点数，默认得到的就总是浮点数，即便结果原本为整数。

```python
print(1.5+1.5)
=> 3.0

print(1.5 // 1.5)
=> 1.0

print(1.5 - 1.5)
=> 0.0
```

在书写很大的数时，可使用下划线将其中的位分组，使其更清晰易读

当你打印这种使用下划线定义的数字时，Python不会打印其中的下划线

```python
universe_age = 14_000_000_000
print(universe_age)

=> 14000000000
```

同时给多个变量赋值

需要用逗号将变量名分开； 对于要赋给变量的值，也需要做同样的处理

```python
x, y, z = 0, 0, 0
```

Python 没有内置的常量支持，我们给出的是一个约定俗成的惯例。

使用全大写字母（单词由下划线分割）来将某个变量视为常量

```python
MAX_CONNECTIONS = 5000
```

### 3、数据类型

type函数：返回数据类型

```python
type('hello')  =>  <class 'str'>
type(6)        =>  <class 'int'>
type(6.0)      =>  <class 'float'>
type(True)     =>  <class 'bool'>
type(None)     =>  <class 'NoneType'>
type([1,2])    =>  <class 'list'>
```

- 字符串 str

  获取长度：len()

  注意：完整的转义符占一个长度
  ```python
  print(len('\n'))
  => 1
  
  print(len('hello\n'))
  => 6
  
  print('hello'[3])
  => l
  ```
- 整数 int
- 浮点数 float
- 布尔类型 bool：True、False（注意大写开头）
- 空值类型 NoneType：None（它表示完全没有值）

  None ≠ 0

  None ≠ ""

  None ≠ false
- 列表 list
- 字典
- ...

### 4、列表

```python
names = ['aaa', 'bbb', 'ccc']
print(names)
=> ['aaa', 'bbb', 'ccc']

# 每当需要访问最后一个列表元素时，都可以使用索引 -1
print(names[-1])
=> ccc

# 仅当列表为空时，这种访问最后一个元素的方式才会导致错误
names = []
print(names[-1])
=> 报错
```

#### 添加元素

1、使用append() 方法在列表末尾添加元素

```python
names = ['aaa', 'bbb', 'ccc']
print(names)
=> ['aaa', 'bbb', 'ccc']

names.append('ddd')
print(names)
=> ['aaa', 'bbb', 'ccc', 'ddd']
```

2、使用 insert() 方法在列表的任意位置添加新元素

```python
names = ['aaa', 'bbb', 'ccc']
names.insert(0, 111)
print(names)
=> [111, 'aaa', 'bbb', 'ccc']
```

#### 删除元素

1、使用 del 语句删除元素

如果知道要删除的元素在列表中的位置，可使用 del 语句

```python
names = ['aaa', 'bbb', 'ccc']
del names[1]
print(names)
=> ['aaa', 'ccc']
```

2、使用 pop() 方法删除元素

pop() 方法删除列表末尾的元素，并让你能够接着使用它

```python
names = ['aaa', 'bbb', 'ccc']
str = names.pop()
print(str)
=> ccc
print(names)
=> ['aaa', 'bbb']
```

也可以使用 pop() 删除列表中任意位置的元素，只需要在括号中指定要删除的元素的索引即可

```python
names = ['aaa', 'bbb', 'ccc']
names.pop(1)
print(names)
=> ['aaa', 'ccc']
```

如果不确定该使用 del 语句还是 pop() 方法，下面是一个简单的判断标准：

如果要从列表中删除一个元素，且不再以任何方式使用它，就使用 del 语句；

如果要在删除元素后继续使用它，就使用pop() 方法。

3、根据值删除元素

如果只知道要删除的元素的值，可使用remove() 方法。

```python
names = ['aaa', 'bbb', 'ccc']
str = names.remove('aaa')
print(str)
=> None
print(names)
=> ['bbb', 'ccc']

names.remove('ddd')
print(names)
=> 删除不存在的值会报错
```

remove() 方法只删除第一个指定的值。

如果要删除的值可能在列表中出现多次，就需要使用循环，确保将每个值都删除

#### 列表排序

1、使用 sort() 方法对列表进行永久排序

根据字母顺序排序

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort()
print(cars)
=> ['audi', 'bmw', 'subaru', 'toyota']

cars = ['bmw', 'audi', 'Toyota', 'subaru']
cars.sort()
print(cars)
=> ['Toyota', 'audi', 'bmw', 'subaru']
```

还可以按与字母顺序相反的顺序排列列表元素，只需向 sort() 方法传递参数 reverse=True 即可

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort(reverse = True)
print(cars)
=> ['toyota', 'subaru', 'bmw', 'audi']
```

2、使用 sorted() 函数对列表进行临时排序

要保留列表元素原来的排列顺序，并以特定的顺序呈现它们，可使用 sorted() 函数

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
new_cars = sorted(cars)
print(new_cars)
=> ['audi', 'bmw', 'subaru', 'toyota']
print(cars)
=> ['bmw', 'audi', 'toyota', 'subaru']
```

如果要按与字母顺序相反的顺序显示列表，也可向 sorted() 函数传递参数 reverse=True

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
new_cars = sorted(cars, reverse = True)
print(new_cars)
=> ['toyota', 'subaru', 'bmw', 'audi']

```

3、使用reverse()方法反转列表

reverse() 方法会永久地修改列表元素的排列顺序

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.reverse()
print(cars)
=> ['subaru', 'toyota', 'audi', 'bmw']
```

4、使用len()函数获取列表长度

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
print(len(cars))
=> 4
```

#### 遍历列表

使用for循环遍历列表（注意别忘了冒号和缩进！）

```python
# 格式
for 变量名 in 可迭代对象:
  # 对每个变量做一些事情...

```

每行缩进的代码都是循环的一部分，将针对列表中的每个值执行一次

为避免意外的缩进错误，请只缩进需要缩进的代码

```python
names = ['aaa', 'bbb', 'ccc']
for name in names:
  print(name)
  
=> 
aaa
bbb
ccc

```

#### 使用range()函数创建数值列表

1、使用range()函数快速生成一系列数

range() 函数让 Python 从指定的第一个值开始数，并在到达指定的第二个值时停止，因此输出不包含第二个值

当只有一个值时，起始值默认为0，结束值为该值

```python
# 打印1-4，不会打印5
for num in range(1, 5):
  print(num)
  
=>
1
2
3
4

for num in range(5):
  print(num)
=>
0
1
2
3
4

```

2、使用range()函数创建数值列表

可使用 list() 函数将 range() 的结果直接转换为列表。

如果将 range() 作为list() 的参数，输出将是一个数值列表。

```python
nums = list(range(1, 5))
print(nums)
=> [1, 2, 3, 4]

```

可以给range() 函数指定第三个参数（步长），Python 将根据这个步长来生成数。

```python
# 打印1-10以内的奇数
# 从1开始，不断加2
nums = list(range(1, 10, 2))
print(nums)
=> [1, 3, 5, 7, 9]
```

应用：前10 个整数的平方加入一个列表

```python
nums = []
for num in range(1, 11):
  nums.append(num ** 2)
print(nums)
=> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

3、数值列表统计

数值列表中的最大值（max）、最小值（min）和总和（sum）

```python
digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
print(min(digits))
print(max(digits))
print(sum(digits))
=>
0
9
45

```

4、列表推导式

列表推导式（list comprehension）将 for 循环和创建新元素的代码合并成一行，并自动追加新元素。

```python
nums = [value ** 2 for value in range(1, 10)]
print(nums)
=> [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

#### 使用列表的一部分（切片 slice）

处理列表的部分元素，在 Python 中称为切片（slice）

1、通过\[n:m:step]格式创建切片

要创建切片，可指定要使用的第一个元素和最后一个元素的索引。与 range() 函数一样，Python 在到达指定的第二个索引之前的元素时停止。

```python
players = ['charles', 'martina', 'michael', 'florence', 'eli']
# 打印第二、三名队员
print(players[1:3])
=> ['martina', 'michael']

# 如果没有指定第一个索引，Python 将自动从列表开头开始
# 打印前三名队员
print(players[:3])
=> ['charles', 'martina', 'michael']

# 要让切片终止于列表末尾，也可使用类似的语法
# 打印第二名开始到最后的队员
print(players[1:])
=> ['martina', 'michael', 'florence', 'eli']

# 负数索引返回与列表末尾有相应距离的元素，因此可以输出列表末尾的任意切片
# 打印最后三名队员
print(players[-3:])
=> ['michael', 'florence', 'eli']

# 可在表示切片的方括号内指定第三个值。这个值告诉 Python 在指定范围内每隔多少元素提取一个。
# 打印前四名中奇数名次的队员
print(players[:4:2])
=> ['charles', 'michael']
```

2、遍历切片

可在 for 循环中使用切片

```python
players = ['charles', 'martina', 'michael', 'florence', 'eli']
for player in players[:3]:
  print(player)
  
=> 
charles
martina
michael
```

3、复制列表

要复制列表，可以创建一个包含整个列表的切片，方法是同时省略起始索引和终止索引（\[:]）。

```python
foods = ['pizza', 'falafel', 'carrot cake']
# 复制列表
new_foods = foods[:]
print(new_foods)
=> ['pizza', 'falafel', 'carrot cake']

new_foods[0] = 'candy'
print(new_foods)
=> ['candy', 'falafel', 'carrot cake']

print(foods)
=> ['pizza', 'falafel', 'carrot cake']
```

#### 元组（tuple）

不可变的列表称为元组（tuple）。

元组使用圆括号来标识。定义元组后，就可使用索引来访问其元素，就像访问列表元素一样。

```python
dimensions = (200, 50)
print(dimensions[0])
=> 200

dimensions[1] = 100
=> 报错，元组元素不可修改

dimensions = (200, 100)
=> 不报错，可以给表示元组的变量赋值

# 如果你要定义只包含一个元素的元组，必须在这个元素后面加上逗号
my_t = (3,)

# 遍历元组元素
for dimension in dimensions:
  print(dimension)

```

### 5、if语句

```python
# 格式（同样别忘了冒号和缩进！）
if 条件:
  执行语句
else:
  执行语句

```

#### 条件判断

为了改善可读性，可将每个条件测试都分别放在一对括号内，但并非必须这样做

优先级：not > and > or

- 使用 **and** 检查多个条件

  每个条件测试都通过了，整个表达式就为 True；如果至少一个条件测试没有通过，整个表达式就为 False
- 使用 or 检查多个条件

  只要满足其中一个条件，就能通过整个条件测试。仅当所有条件测试都没有通过时，使用 or 的表达式才为 False。
- 使用**not**进行单个条件判断
  ```python
  x = 10
  print(not x > 5)
  => False
  ```
- 使用关键字 **in**判断特定的值是否在列表中
  ```python
  requested_toppings = ['mushrooms', 'onions', 'pineapple']
  print('mushrooms' in requested_toppings)
  => True
  print('pepperoni' in requested_toppings)
  => False
  
  ```
- 使用关键字 **not in**判断特定的值不在列表中
  ```python
  requested_toppings = ['mushrooms', 'onions', 'pineapple']
  print('mushrooms' not in requested_toppings)
  => False
  print('pepperoni' not in requested_toppings)
  => True
  ```

#### 嵌套条件

```python
# 格式
if 条件一:
  if 条件二:
    语句A
  else:
    语句B
else:
  语句C

```

#### 多条件判断

```python
# 格式
if 条件一:
  语句A
elif 条件二:
  语句B
elif 条件三:
  语句C
else:
  语句D
```

```python
alien_color = ['red', 'yellow', 'blue']

for item in alien_color:
  if item == 'yellow':
    print('is yellow')
  elif item == 'red':
    print('is red')
  else:
    print('is blue')
```

#### 判断列表是否为空

对于数值 0、空值 None、单引号空字符串 ''、双引号空字符串 ""、空列表 \[]、空元组 ()、空字典 {}，Python 都会返回 False

```python
arr = []
if arr:
  print(arr)
else:
  print('arr is None')
=> arr is None
```

### 6、字典（dictionary）

- 字典（dictionary）是一系列键值对
- 与键相关联的值可以是数、字符串、列表乃至字典。事实上，可将任意 Python 对象用作字典中的值。
- 字典用放在花括号（{}）中的一系列键值对表示
- 要获取与键关联的值，可指定字典名并把键放在后面的方括号内
- 键必须是不可变值，例：列表不能作为键，元组可以作为键

```python
alien_0 = {'color': 'green'}
print(alien_0['color'])
=> green

# 字典中键值对数量
print(len(alien_0))
=> 1

# 添加键值对
alien_0['point'] = 10
print(alien_0)
=> {'color': 'green', 'point': 10}

# 修改字典中的值
alien_0['point'] = 5

# 删除键值对
del alien_0['point']

# 判断键是否存在于字典
alien_0 = {'color': 'green'}
print('points' in alien_0)
=> False

# 元组作为键
contacts = {
  ('张伟', 1): '13711111111',
  ('张伟', 2): '13722222222',
  ('张伟', 3): '13733333333',
}
# 找到张伟2的联系方式
phone = contacts[('张伟', 2)]
print(phone)
=> 13722222222
```

#### 使用get()来访问值

使用 get() 方法在指定的键不存在时返回一个默认值。

get() 方法的第一个参数用于指定键，是必不可少的；第二个参数为当指定的键不存在时要返回的值，是可选的

```python
alien_0 = {'color': 'green'}
point_value = alien_0.get('points', 'No point value assigned.')
print(point_value)
=> No point value assigned.
=> 若第二个入参为空，返回None
```

#### 遍历字典

1、使用items()方法遍历所有键值对

items()方法返回一个键和值组成的元组列表

```python
for key,value in 字典.items():
  操作语句
```

```python
favorite_languages = {
  'jen': 'python',
  'sarah': 'c',
  'edward': 'rust',
  'phil': 'python',
}
print(favorite_languages.items())
=> dict_items([('jen', 'python'), ('sarah', 'c'), ('edward', 'rust'), ('phil', 'python')])

for name, language in favorite_languages.items():
  print(f"{name.title()}'s favorite language is {language.title()}.")

=>
Jen's favorite language is Python.
Sarah's favorite language is C.
Edward's favorite language is Rust.
Phil's favorite language is Python.

```

2、使用keys() 方法遍历所有键

使用keys() 方法会返回一个包含所有键的列表

```python
favorite_languages = {
  'jen': 'python',
  'sarah': 'c',
  'edward': 'rust',
  'phil': 'python',
}

print(favorite_languages.keys())
=> dict_keys(['jen', 'sarah', 'edward', 'phil'])

for key in favorite_languages.keys():
  print(key)

=> 
jen
sarah
edward
phil

# 在遍历字典时，会默认遍历所有的键
for key in favorite_languages: 
等价于
for key in favorite_languages.keys():

```

3、使用values()方法遍历字典中的所有值

values()方法会返回一个值列表

这种做法提取字典中所有的值，而没有考虑值是否有重复。

为剔除重复项，可使用集合（set）。

```python
favorite_languages = {
  'jen': 'python',
  'sarah': 'c',
  'edward': 'rust',
  'phil': 'python',
}
print(favorite_languages.values())
=> dict_values(['python', 'c', 'rust', 'python'])

for value in favorite_languages.values():
  print(value)
=>
python
c
rust
python

# 使用set剔除重复项
for value in set(favorite_languages.values()):
  print(value)
=>
c
python
rust

```

### 7、使用input()函数进行用户输入

input() 函数让程序暂停运行，等待用户输入一些文本。获取用户输入后，Python 将其赋给一个变量，以便使用。

input() 函数接受一个参数，即要向用户显示的提示（prompt）

```python
name = input("Please enter your name: ")
print(f"\nHello, {name}!")

=>Please enter your name: 

=> 输入 csm
Please enter your name: csm

Hello, csm!
```

#### 使用int来获取数值输入

在使用 input() 函数时，Python 会将用户输入解读为字符串

**当输入数值时，可使用int()函数将输入字符串转换成数值**

```python
age = input("How old are you? ")
age = int(age)

if age >= 18:
  print("你成年了")
else:
  print("你还未成年")
  
=> How old are you?
=> 输入20
How old are you? 20
你成年了

```

float函数可以将其他类型转换成浮点数

str函数可以把其他类型转换成字符串

### 8、while循环

- for 循环用于针对集合中的每个元素执行一个代码块，而 while 循环则不断地运行，直到指定的条件不再满足为止。
- 在条件何时结束未知的情况下，更适合使用while循环
- 如果程序陷入无限循环，既可按 Ctrl + C，也可关闭显示程序输出的终端窗口。

```python
# 格式
while 条件:
  行动

```

例：打印输入内容，当输入quit时退出程序

```python
message = ''
while message != 'quit' :
  message = input('请输入信息，输入quit时退出程序：')
  if message != 'quit':
    print(message)
    
=>
请输入信息，输入quit时退出程序：1
1
请输入信息，输入quit时退出程序：2
2
请输入信息，输入quit时退出程序：quit

```

#### 使用break退出循环

如果不管条件测试的结果如何，想立即退出 while 循环，不再运行循环中余下的代码，可使用break 语句。

注意：在所有 Python 循环中都可使用 break 语句。例如，可使用 break 语句来退出遍历列表或字典的 for 循环。

同上例的不同实现方式：

```python
active = True
message = ''
while active:
  message = input('请输入信息，输入quit时退出程序：')
  if message == 'quit':
    break
  else:
    print(message)
```

#### 在循环中使用continue

要返回循环开头，并根据条件测试的结果决定是否继续执行循环，可使用 continue 语句，它不像break 语句那样不再执行余下的代码并退出整个循环

例：从 1 数到 10，只打印其中奇数的循环

```python
num = 0
while num < 10:
  num = num + 1
  if (num % 2 == 0):
    continue
  print(num)
  

=>
1
3
5
7
9

```

如果结果为 0（意味着 current\_number 可被 2 整除），就执行 continue 语句，让 Python 忽略余下的代码，并返回循环的开头。

如果当前的数不能被 2 整除，就执行循环中余下的代码，将这个数打印出来。

#### 使用while循环处理列表和字典

for 循环是一种遍历列表的有效方式，但不应该在 for 循环中修改列表，否则将导致 Python 难以跟踪其中的元素。要在遍历列表的同时修改它，可使用 while 循环。

例1：删除所有值为cat的元素

```python
pets = ['dog', 'cat', 'dog', 'goldfish', 'cat', 'rabbit', 'cat']
print(pets)

while 'cat' in pets:
    pets.remove('cat')

print(pets)
```

例2：创建一个调查程序，其中的循环在每次执行时都提示输入被调查者的名字和回答。

```python
responses = {}
# 设置一个标志，指出调查是否继续
polling_active = True

while polling_active:
    # 提示输入被调查者的名字和回答
  name = input("\nWhat is your name? ")
  response = input("Which mountain would you like to climb someday? ")

    # 将回答存储在字典中
  responses[name] = response

    # 看看是否还有人要参与调查
  repeat = input("Would you like to let another person respond? (yes/no) ")
  if repeat == 'no':
      polling_active = False

# 调查结束，显示结果
print("\n--- Poll Results ---")
for name, response in responses.items():
    print(f"{name} would like to climb {response}.")
    

=>
What is your name? Eric
Which mountain would you like to climb someday? Denali
Would you like to let another person respond? (yes/no) yes

What is your name? Lynn
Which mountain would you like to climb someday? Devil's Thumb
Would you like to let another person respond? (yes/no) no

--- Poll Results ---
Eric would like to climb Denali.
Lynn would like to climb Devil's Thumb.

```

### 9、函数

```python
# 语法
def 函数名(入参):
  操作

# 调用函数
函数名(入参)

```

```python
def favorite_book(name):
  print(f"my favorite book is {name}")

favorite_book('Harry Potter')
=> my favorite book is Harry Potter

#关键词实参
favorite_book(name = 'alive')

```

#### 传递任意数量的实参

形参名 \*toppings 中的星号让 Python 创建一个名为 toppings 的元组，该元组包含函数收到的所有值。

```python
def make_pizza(*toppings):
    """概述要制作的比萨"""
    print("\nMaking a pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")

make_pizza('pepperoni')
=>
Making a pizza with the following toppings:
- pepperoni

make_pizza('mushrooms', 'green peppers', 'extra cheese')
=>
Making a pizza with the following toppings:
- mushrooms
- green peppers
- extra cheese

```

#### 使用任意数量的关键字实参

形参\*\*user\_info 中的两个星号让 Python 创建一个名为 user\_info 的字典，该字典包含函数收到的其他所有名值对

```python
def build_profile(first, last, **user_info):
  """创建一个字典，其中包含我们知道的有关用户的一切"""
  user_info['first_name'] = first
  user_info['last_name'] = last
  return user_info

user_profile = build_profile('albert', 'einstein', location='princeton', field='physics')
print(user_profile)
=>
{'location': 'princeton', 'field': 'physics', 'first_name': 'albert', 'last_name': 'einstein'}

```

#### 导入函数

**最佳的做法是，要么只导入需要使用的函数，要么导入整个模块并使用点号**

pizza.py

```python
def make_pizza(size, *toppings):
    """概述要制作的比萨"""
    print(f"\nMaking a {size}-inch pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")
```

**1.导入整个模块**

语法

```python
import module_name

module_name.function_name()
```

使用：

```python
import pizza

pizza.make_pizza(16, 'pepperoni')
```

**2.导入特定的函数**

语法

如果使用这种语法，在调用函数时则无须使用句点。

由于在 import 语句中显式地导入了make\_pizza() 函数，因此在调用时只需指定其名称即可。

```python
# 只导入模块中的特定函数
import module_name import function_name

# 用逗号分隔函数名，可根据需要从模块中导入任意数量的函数
import module_name import function_name1, function_name2, function_name3

```

使用

```python
from pizza import make_pizza 

make_pizza(16, 'pepperoni')
```

**3.使用 as 给函数指定别名**

语法

```python
from module_name import function_name as fn
```

使用

```python
from pizza import make_pizza as mp

mp(16, 'pepperoni')
```

**4.使用 as 给模块指定别名**

语法

```python
import pizza as p

p.make_pizza(16, 'pepperoni')
```

使用

```python
import module_name as mn
```

**5.导入模块中的所有函数**

语法

使用星号（ \*）运算符可让 Python 导入模块中的所有函数

```python
from module_name import *
```

使用

```python
from pizza import *

make_pizza(16, 'pepperoni')
```

#### 匿名函数

语法：

> 📌lambda 函数参数: 函数返回的表达式（只能有一个语句/表达式）

```python
lambda num1,num2: num1 +num2
```

使用场景

1、高阶函数的参数

高阶函数：把函数作为参数的函数

```python
def calculate_and_print(num, calculator):
  result = calculator(num)
  print(result)

calculate_and_print(5, lambda num: num * 5)
=> 25
```

2、直接调用

```python
result = (lambda num1,num2: num1 +num2)(2, 3)
print(result)
=> 5
```

### 10、类

#### 创建和使用类

- 类是创建对象的模板，对象是类的实例
- 通常可以认为首字母大写的名称（如 Dog）指的是类，而全小写的名称（如 my\_dog）指的是根据类创建的实例。
- 类名应采用驼峰命名法，即将类名中的每个单词的首字母都大写，并且不使用下划线。实例名和模块名都采用全小写格式，并在单词之间加上下划线。
- 对于每个类，都应在类定义后面紧跟一个文档字符串。这种文档字符串简要地描述类的功能，你应该遵循编写函数的文档字符串时采用的格式约定。每个模块也都应包含一个文档字符串，对其中的类可用来做什么进行描述。

```python
# 定义类
class Dog:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def sit(self):
    print(f"{self.name} is sitting now.")

# 创建对象
dog1 = Dog('wangwang', 2)
dog2 = Dog('xiaobai', 1)

# 访问属性
print(dog1.name)
=> wangwang

# 调用方法
dog1.sit()
dog2.sit()
=>
wangwang is sitting now.
xiaobai is sitting now.

```

类中的函数称为方法，第一个参数被占用，为self，用于表示对象自身

构造函数\_\_init\_\_是一个特殊方法，用于定义实例对象的属性。

每当你根据 Dog 类创建新实例时，Python 都会自动运行它。

**注意：开头和末尾各有两个下划线。**

#### 继承

当一个类继承另一个类时，将自动获得后者的所有属性和方法。原有的类称为父类（parent class），而新类称为子类（child class）。子类不仅继承了父类的所有属性和方法，还可定义自己的属性和方法。

```python
class Animal:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def greeting(self):
    print(f"hello, I am {self.name}.")

class Tail:
  def __init__(self, size, length):
    self.size = size
    self.length = length

# 继承父类
class Dog(Animal):
  def __init__(self, name, age, sex):
    """
    先初始化父类的属性，再初始化电动汽车特有的属性
    """
    super().__init__(name, age)
    self.sex = sex
    # 将实例用作属性
    self.tail = Tail('big', 10)

  # 定义子类方法
  def eating(self):
     print(f"{self.name} is eating")

# 重写父类方法
  def greeting(self):
     print("wang wang!")

dog1 = Dog('wangcai', 1, 'male')
dog1.eating()
dog1.greeting()
print(dog1.tail.size)

```

- 在创建子类时，父类必须包含在当前文件中，且位于子类前面。
- 在定义子类时，必须在括号内指定父类的名称。
- super() 会返回当前类的父类。使用super().\_\_init\_\_()调用父类的构造函数，从而让子类包含父类的所有属性。
- 如果父类中的一些方法不能满足子类的需求，就可以在子类中定义一个与要重写的父类方法同名的方法。这样，Python 将忽略这个父类方法，只关注你在子类中定义的相应方法。
- 在Dog类中 , 将Tail实例赋给self.tail属性（ \*\*self.tail = Tail('big', 10) \*\*），现在每个Dog实例都包含一个自动创建的 Tail实例。

#### 导入类

类似上方导入函数

#### Python 标准库

Python 标准库是一组模块，在安装 Python 时已经包含在内。

你可以使用标准库中的任何函数和类，只需在程序开头添加一条简单的 import 语句即可。

模块random 中 的**randint()** 将两个整数作为参数，并随机返回一个位于这两个整数之间（含）的整数

```python
from random import randint
print(randint(1, 6))
=> 3
```

模块 random 中 的 **choice()**，它将一个列表或元组作为参数，并随机返回其中的一个元素

```python
from random import choice
players = ['charles', 'martina', 'michael', 'florence', 'eli']
print(choice(players))
=> martina
```

**引用第三方库**

搜索第三方库：[https://pypi.org/](https://pypi.org/ "https://pypi.org/")

先安装，再引入

```bash
pip install xxx
```

### 11、文件

#### 读取文件

1、从 pathlib 模块导入 Path 类。Path 对象指向一个文件。`read_text`方法读取文件。

```text
3.1415926535
  8979323846
  2643383279
```

```python
from pathlib import Path

path = Path('pi_digits.txt')
contents = path.read_text()
print(contents)
```

2、使用Python内置函数`open()`打开并读取文件。

- open函数的参数分别为文件路径，读取模式，编码格式。
- 只读文件需要使用`r`模式；只写文件，可以使用`w`模式；只追加内容，可以使用`a`模式；读写模式可使用r+
- read方法读取全部文件的内容，可以传一个参数，表示读多少字节
- 大文件不建议使用`read`方法，因为读出来的内容会占用很大的内存
- `readline`方法按行读取文件
- `readlines`方法会读全部文件的内容，并把每行作为列表元素返回
- 读完文件后要调用`close`方法关闭文件
- 也可使用`with`关键字，在with代码块执行结束后，会自动关闭文件

```python
f = open('pi_digits.txt', 'r', encoding="utf-8")
print(f.read()) # 会读全部的文件内容，并打印
print(f.read()) # 会读空字符串，并打印
f.close() # 关闭文件，释放资源
=>
3.1415926535
  8979323846
  2643383279

f = open('pi_digits.txt', 'r', encoding="utf-8")
print(f.read(5)) # 读取第1-5个字节
print(f.read(5)) # 读取第6-10个字节
f.close()
=>
3.141
59265

```

```python
f = open('pi_digits.txt', 'r', encoding="utf-8")
line = f.readline()
while(line != ''):
  print(line.strip())
  line = f.readline()
f.close()

```

```python
f = open('pi_digits.txt', 'r', encoding="utf-8")
lines = f.readlines()
for line in lines:
  print(line.strip())
f.close()

```

```python
with open('pi_digits.txt', 'r') as f:
  print(f.read())
```

**按行读取**

可以使用 `splitlines() `方法把字符串根据换行符拆分成列表，再使用 for 循环以每次一行的方式检查文件中的各行

```python
from pathlib import Path

path = Path('pi_digits.txt')
contents = path.read_text()
# 如果系统的默认编码与要读取的文件的编码不一致，参数 encoding 必不可少。
contents1 = path.read_text(encoding='utf-8')

pi_str = ''

for line in contents.splitlines():
  pi_str += line.strip()
  print(line)
=>
3.1415926535
  8979323846
  2643383279

print(pi_str)
=> 3.141592653589793238462643383279
```

注意：在读取文本文件时，Python 将其中的所有文本都解释为字符串。如果读取的是数，并且要将其作为数值使用，就必须使用`int()` 函数将其转换为整数，或者使用 float()函数将其转换为浮点数。

#### 写入文件

1、可使用 `write_text()` 将数据写入文件

没有该文件时会新建文件，有该文件时替换文件中的内容为写入数据

```python
from pathlib import Path

path = Path('programming.txt')
path.write_text("I love programming.")
```

注意：Python 只能将字符串写入文本文件。如果要将数值数据存储到文本文件中，必须先使用函数 str() 将其转换为字符串格式

2、同上使用Python内置函数`open()`打开并写入文件

r+模式表示可读写

```python
with open('data.txt', 'w') as f:
  f.write('qwer\n')
  f.write('asdf')
```

#### 存储数据

`json.dumps()`函数将Python 对象转换成字符串

```python
from pathlib import Path
import json

numbers = [2, 3, 5, 7, 11, 13]

path = Path('numbers.json')
contents = json.dumps(numbers)
path.write_text(contents)
```

`json.loads()` 函数将字符串转换成Python 对象

```python
from pathlib import Path
import json

path = Path('numbers.json')
contents = path.read_text()
numbers = json.loads(contents)

print(numbers)
=> [2, 3, 5, 7, 11, 13]
```

`exists()` 方法判断文件是否存在

```python
path = Path('username.json')
if path.exists():
  contents = path.read_text()
  username = json.loads(contents)
  print(f"Welcome back, {username}!")
else:
  username = input("What is your name? ")
  contents = json.dumps(username)
  path.write_text(contents)
  print(f"We'll remember you when you come back, {username}!")
```

### 12、异常处理

可通过 try-except 代码块来处理可能引发的异常

只有 try 代码块成功执行才需要继续执行的代码，都应放到 else 代码块中，finall代码块中的语句无论是否错误都会执行

```python
number1 = int(input('请输入被除数：'))
number2 = int(input('请输入除数：'))
try:
  answer = number1 / number2
except ZeroDivisionError:
  print("除数不能为0")
else:
  print(f"{number1}/{number2}={answer}")
finally:
  print("计算结结束")
  
=>
请输入被除数：2
请输入除数：1
2/1=2.0
计算结束

=>
请输入被除数：1
请输入除数：0
除数不能为0
计算结束

```

**静默失败**

有时候希望程序在发生异常时保持静默，就像什么都没有发生一样继续运行

可以在except 代码块中使用pass语句

```python
def count_words(path):
    """计算一个文件大致包含多少个单词"""
    try:
        --snip--
    except FileNotFoundError:
        pass
    else:
        --snip--
```

### 13、测试代码

- assert 断言就是声称满足特定的条件，测试就是判断断言是否正确
- 测试文件的名称很重要，必须以 test\_打头。当你让pytest 运行测试时，它将查找以 test\_打头的文件，并运行其中的所有测试
- 运行测试：可打开测试文件所在的文件夹，并使用该编辑器内嵌的终端。在终端窗口中执行命令 pytest 测试文件名

**测试中常用的断言语句**

| 断言                         | 用途             |
| -------------------------- | -------------- |
| assert a == b              | 断言两个值相等        |
| assert a != b              | 断言两个值不相等       |
| assert a                   | 断言a的布尔求值为True  |
| assert not a               | 断言a的布尔求值为False |
| assert element in list     | 断言元素在列表中       |
| assert element not in list | 断言元素不在列表中      |

```python
from name_function import get_formatted_name

def test_first_last_name():
  """能够正确地处理像 Janis Joplin 这样的姓名吗？"""
  formatted_name = get_formatted_name('janis', 'joplin')
  assert formatted_name == 'Janis Joplin'
```

在pytest 中，要创建夹具（fixture），可编写一个使用装饰器 @pytest.fixture 装饰的函数。

装饰器（decorator）是放在函数定义前面的指令。在运行函数前，Python 将该指令应用于函数，以修改函数代码的行为。

当测试函数的一个形参与应用了装饰器 @pytest.fixture 的函数（夹具）同名时，将自动运行夹具，并将夹具返回的值传递给测试函数。

```python
import pytest
from survey import AnonymousSurvey

@pytest.fixture
def language_survey():
  """一个可供所有测试函数使用的 AnonymousSurvey 实例"""
  question = "What language did you first learn to speak?"
  language_survey = AnonymousSurvey(question)
  return language_survey

def test_store_single_response(language_survey):
  """测试单个答案会被妥善地存储"""
  language_survey.store_response('English')
  assert 'English' in language_survey.responses

def test_store_three_responses(language_survey):
  """测试三个答案会被妥善地存储"""
  responses = ['English', 'Spanish', 'Mandarin']
  for response in responses:
    language_survey.store_response(response)

  for response in responses:
    assert response in language_survey.responses
```

## 二、项目实践

### 1、项目一：外星人入侵

#### 检测编组碰撞并删除

sprite.groupcollide() 函数将一个编组中每个元素的 rect 与另一个编组中每个元素的 rect进行比较。

```python
pygame.sprite.groupcollide(self.bullets, self.aliens, True, True)
```

每当有子弹和外星人的 rect 重叠时，groupcollide() 就在返回的字典中添加一个键值对。两个值为 True 的实参告诉 Pygame 在发生碰撞时删除对应的子弹和外星人。

要模拟能够飞到屏幕上边缘的高能子弹（它会消灭击中的每个外星人，但自己不受影响），可将第一个布尔实参设置为 False，并保留第二个布尔实参为 True。这样被击中的外星人将消失，但所有的子弹始终有效，直到抵达屏幕的上边缘后消失。

#### 检测精灵和编组碰撞

spritecollideany() 函数接受两个实参：一个精灵和一个编组。

它检查编组是否有成员与精灵发生了碰撞，并在找到与精灵发生碰撞的成员后停止遍历编组。

```python
pygame.sprite.spritecollideany(self.ship, self.aliens)
```

这里，它遍历 aliens 编组，并返回找到的第一个与飞船发生碰撞的外星人。

#### 处理文本

导入 pygame.font 模块，它让 Pygame 能够将文本渲染到屏幕上

Pygame 处理文本的方式是，将要显示的字符串渲染为图像。

```python
self.msg_image = self.font.render(msg, True, self.text_color, self.button_color)
```

调用font.render() 将存储在 msg 中的文本转换为图像

font.render() 方法还接受一个布尔实参，该实参指定是否开启反锯齿功能（反锯齿让文本的边缘更平滑）。余下的两个实参分别是文本颜色和背景色。

#### 鼠标点击位置判断

collidepoint

```python
self.play_button.rect.collidepoint(mouse_pos)
```

这里使用 rect 的 collidepoint() 方法检查鼠标的单击位置是否在 Play 按钮的 rect 内。如果是，就将 game\_active 设置为 True，让游戏开始。

#### 大数千分位处理

round() 函数通常让浮点数（第一个实参）精确到小数点后某一位，其中的小数位数由第二个实参指定。如果将第二个实参指定为负数，round() 会将第一个实参舍入到最近的 10 的整数倍，如10、100、1000 等。

```python
 rounded_score = round(self.stats.score, -1)
```

这里的代码让 Python 将 stats.score 的值舍入到最近的 10 的整数倍

```python
score_str = f"{rounded_score:,}"
```

这里使用的字符序列为冒号和逗号（:,），它让 Python 在数值的合适位置插入逗号，生成的字符串类似于 1,000,000（而不是 1000000）。

### 2、数据可视化

#### 绘制折线图

```python
import matplotlib.pyplot as plt

input_values = [1, 2, 3, 4, 5] # 输入值
squares = [1, 4, 9, 16, 25] # 输出值

plt.style.use('seaborn-v0_8') # 使用内置样式
# 变量 fig 表示由生成的一系列绘图构成的整个图形。
# 变量 ax 表示图形中的绘图
fig, ax = plt.subplots()
# 根据给定的数据绘制绘图，设置线条粗细
ax.plot(input_values, squares, linewidth=3) 

# 设置图题并给坐标轴加上标签
ax.set_title("Square Numbers", fontsize=24)
ax.set_xlabel("Value", fontsize=14)
ax.set_ylabel("Square of Value", fontsize=14)

# 设置刻度标记的样式
ax.tick_params(labelsize=14)


# 打开 Matplotlib 查看器并显示绘图
plt.show()  
```

```python
import matplotlib.pyplot as plt

# x_values = [1, 2, 3, 4, 5]
# y_values = [1, 4, 9, 16, 25]
x_values = range(1, 1001)
y_values = [x**2 for x in x_values] # 列表推导式

plt.style.use('seaborn-v0_8')
fig, ax = plt.subplots()
# ax.scatter(2, 4, s=200) # 绘制单点
# ax.scatter(x_values, y_values, color = (0, 0.8, 0), s=10) # 绘制一系列点

# 使用颜色映射：根据每个点的 y 坐标值来设置其颜色
ax.scatter(x_values, y_values, c = y_values, cmap = plt.cm.Blues, s=10) # 绘制一系列点

# 设置图题并给坐标轴加上标签
ax.set_title("Square Numbers", fontsize=24)
ax.set_xlabel("Value", fontsize=14)
ax.set_ylabel("Square of Value", fontsize=14)

# 设置刻度标记的样式
ax.tick_params(labelsize=14)

# 设置每个坐标轴的取值范围
ax.axis([0,1100, 0, 1_100_000])
ax.ticklabel_format(style='plain') # 修改刻度标记样式

# 打开 Matplotlib 查看器并显示绘图
plt.show()  
# 保存绘图
# plt.savefig('squares_plot.png', bbox_inches='tight')
```

#### 随机游走

```python
from random import choice # choice选择一个值

class RandomWalk:
    """一个生成随机游走数据的类"""

    def __init__(self, num_points=5000): # 设置随机游走包含的默认点数
        """初始化随机游走的属性"""
        self.num_points = num_points

        # 所有随机游走都始于(0, 0)
        self.x_values = [0]
        self.y_values = [0]


    def fill_walk(self):
        """计算随机游走包含的所有点"""

        # 不断游走，直到列表达到指定的长度
        while len(self.x_values) < self.num_points:

            # 决定前进的方向以及沿这个方向前进的距离
            x_step = self.get_step()
            y_step = self.get_step()

            # 拒绝原地踏步
            if x_step == 0 and y_step == 0:
                continue

            # 计算下一个点的 x 坐标值和 y 坐标值
            x = self.x_values[-1] + x_step
            y = self.y_values[-1] + y_step

            self.x_values.append(x)
            self.y_values.append(y)


    def get_step(self):
        direction = choice([1, -1])
        distance = choice([0, 1, 2, 3, 4])
        step = direction * distance
        return step
```

```python
import matplotlib.pyplot as plt
from random_walk import RandomWalk


# 只要程序处于活动状态，就不断地模拟随机游走
while True:
    # 创建一个 RandomWalk 实例
    rw = RandomWalk(50000)
    rw.fill_walk()

    # 将所有的点都绘制出来
    plt.style.use('classic')
    fig, ax = plt.subplots()
    # fig, ax = plt.subplots(figsize=(15, 9)) # 使用参数figsize指定生成的图形尺寸

    # 使用颜色映射来指出游走中各个点的先后顺序，并删除每个点的黑色轮廓，让其颜色更加明显
    point_numbers = range(rw.num_points)
    ax.scatter(rw.x_values, rw.y_values, c=point_numbers, cmap=plt.cm.Blues, edgecolors='none', s=1)
    # ax.scatter(rw.x_values, rw.y_values, s=15)
    # ax.plot(rw.x_values, rw.y_values)

    ax.set_aspect('equal') # 设置两条轴上刻度的间距相等

    # 突出起点和终点
    ax.scatter(0, 0, c='green', edgecolors='none', s=100)
    ax.scatter(rw.x_values[-1], rw.y_values[-1], c='red', edgecolors='none',
        s=100)

    # 隐藏坐标轴
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)

    plt.show()

    keep_running = input("Make another walk? (y/n): ")
    if keep_running == 'n':
        break
  
```

#### 使用Plotly模拟投掷筛子

```python
from random import randint

class Die:
    """表示一个骰子的类"""

    def __init__(self, num_sides=6):
        """骰子默认为 6 面的"""
        self.num_sides = num_sides

    def roll(self):
        """"返回一个介于 1 和骰子面数之间的随机值"""
        return randint(1, self.num_sides)
```

```python
import plotly.express as px
from die import Die

# 创建量个 D6
die_1 = Die()
die_2 = Die()
# die_2 = Die(8)

# 掷几次骰子并将结果存储在一个列表中
results = []
for roll_num in range(1000):
    result = die_1.roll() + die_2.roll()
    results.append(result)

frequencies = []
max_result = die_1.num_sides + die_2.num_sides
poss_results = range(2, max_result+1)
for value in poss_results:
    frequency = results.count(value) # 计算每个点数在 results 中出现了多少次
    frequencies.append(frequency)


title = "投掷1000次两个六面骰子的结果"
labels = {'x': 'Result', 'y': 'Frequency of Result'}
fig = px.bar(x=poss_results, y=frequencies, title=title, labels=labels) # 绘制直方图
fig.update_layout(xaxis_dtick=1) # xaxis_dtick表示x轴上刻度标记的间距，设置为1，给每个条形都加上了标签

fig.show()
# fig.write_html('dice_visual_d6d6.html') # 保存图形

```

#### **处理CSV格式文件**

要在文本文件中存储数据，最简单的方式是将数据组织为一系列以逗号分隔的值（comma-separated values，CSV）并写入文件。这样的文件称为 CSV 文件

```javascript
"USW00025333","SITKA AIRPORT, AK US","2021-01-01",,"44","40"
```

```python
from pathlib import Path
import csv

path = Path('weather_data/sitka_weather_07-2021_simple.csv')
lines = path.read_text().splitlines()

reader = csv.reader(lines)
header_row = next(reader)

# 对列表调用 enumerate() 来获取每个元素的索引及其值
for index, column_header in enumerate(header_row):
    print(index, column_header)
```

使用strptime()方法设置日期和时间

```python
from datetime import datetime
first_date = datetime.strptime('2021-07-01', '%Y-%m-%d')
print(first_date)
=> 2021-07-01 00:00:00
```

首先导入 datetime 模块中的 datetime 类，再调用 strptime() 方法，并将包含日期的字符串作为第一个实参。

第二个实参告诉 Python 如何设置日期的格式。

'%Y-' 让 Python 将字符串中第一个连字符前面的部分视为四位数的年份

'%m-' 让 Python 将第二个连字符前面的部分视为表示月份的两位数

'%d' 让 Python 将字符串的最后一部分视为月份中的一天（1～31）

datetime 模块中设置日期和时间格式的参数

| 参数 | 含义                   |
| -- | -------------------- |
| %A | 星期几，如 Monday         |
| %B | 月份名，如 January        |
| %m | 用数表示的月份（01～12）       |
| %d | 用数 表 示的月份中的一天（01～31） |
| %Y | 四位数的年份，如 2019        |
| %y | 两位数的年份，如 19          |
| %H | 24 小时制的小时数（00～23）    |
| %I | 12 小时制的小时数（01～12）    |
| %p | am 或 pm              |
| %M | 分钟数（00～59）           |
| %S | 秒数（00～61）            |

使用 fill\_between() 方法，它接受一组 x 坐标值和两组 y 坐标值，填充两组 y 坐标值之间的空间

```python
ax.fill_between(dates, highs, lows, facecolor='blue', alpha=0.1)
```

```python
from pathlib import Path
import csv
from datetime import datetime
import matplotlib.pyplot as plt

path = Path('weather_data/death_valley_2021_simple.csv')
# path = Path('weather_data/sitka_weather_2021_simple.csv')
lines = path.read_text().splitlines()

reader = csv.reader(lines)
header_row = next(reader)
date_index = header_row.index('DATE')
high_index = header_row.index('TMAX')
low_index = header_row.index('TMIN')
name_index = header_row.index('NAME')

# 提取日期、最高温度和最低温度
dates, highs, lows = [], [], []
place_name = ""
for row in reader:
    if not place_name:
        place_name = row[name_index]

    current_date = datetime.strptime(row[date_index], '%Y-%m-%d') # 把日期数据转化成datetime对象
    try:
        high = int(row[high_index])
        low = int(row[low_index])
    except ValueError:
        print(f"Missing data for {current_date}")
    else:
        dates.append(current_date)
        highs.append(high)
        lows.append(low)

# 根据最高温度绘图
plt.style.use('seaborn-v0_8')
fig, ax = plt.subplots()
ax.plot(dates, highs, color='red', alpha=0.5)
ax.plot(dates, lows, color='blue', alpha=0.5)
ax.fill_between(dates, highs, lows, facecolor='blue', alpha=0.1)

# 设置绘图的格式
plt.rcParams["font.family"] = ["sans-serif"]
plt.rcParams["font.sans-serif"] = ['SimHei']

title = f"2021年最高最低气温\n{place_name}"
ax.set_title(title, fontproperties="SimHei", fontsize=24)
ax.set_xlabel('', fontsize=16)
fig.autofmt_xdate() # 倾斜文本
ax.set_ylabel("Temperature (F)", fontsize=16)
ax.tick_params(labelsize=16)

plt.show()
```

#### **处理GeoJSON格式文件**

```python
from pathlib import Path
import json
import plotly.express as px
import pandas as pd

# 将数据作为字符串读取并转换为 Python 对象
path = Path('eq_data/eq_data_1_day_m1.geojson')
try:
    contents = path.read_text()
except:
    contents = path.read_text(encoding='utf-8')
all_eq_data = json.loads(contents) # 将字符串转换成Python 对象


# 将数据文件转换为更易于阅读的版本
# path = Path('eq_data/readable_eq_data.geojson')
# readable_contents = json.dumps(all_eq_data, indent=4) # 将Python 对象转换成字符串, indent表示缩进量
# path.write_text(readable_contents)

# 查看数据集中的所有地震
all_eq_dicts = all_eq_data['features']

mags, titles, lons, lats = [], [], [], [] 
for eq_dict in all_eq_dicts:
    mag = eq_dict['properties']['mag']
    title = eq_dict['properties']['title']
    lon = eq_dict['geometry']['coordinates'][0]
    lat = eq_dict['geometry']['coordinates'][1]
    mags.append(mag)
    titles.append(title)
    lons.append(lon)
    lats.append(lat)

# 使用DataFrame封装数据
data = pd.DataFrame(
 data=zip(lons, lats, titles, mags), columns=['经度', '纬度', '位置', '震级']
)
data.head()

fig = px.scatter(
    # x=lons,
    # y=lats,
    # labels={'x': '经度 ', 'y': '纬度 '},
    data,
    x='经度',
    y='纬度',
    range_x=[-200, 200],
    range_y=[-90, 90],
    width=800,
    height=800,
    title='全球地震散点图',
    size='震级',
    size_max=10,
    color='震级',
    hover_name='位置',
 )
# fig.write_html('eq_data/global_earthquakes.html')
fig.show()
```

#### 使用api

```python
import requests
import plotly.express as px

# 执行 API 调用并查看响应
url = "https://api.github.com/search/repositories"
url += "?q=language:python+sort:stars+stars:>10000"

headers = {"Accept": "application/vnd.github.v3+json"}
r = requests.get(url, headers=headers)
print(f"Status code: {r.status_code}")

# 处理结果
response_dict = r.json()
print(f"Complete results: {not response_dict['incomplete_results']}")

# 处理有关仓库的信息
repo_dicts = response_dict['items']
stars, hover_texts, repo_links = [], [], []
for repo_dict in repo_dicts:
    # 将仓库名转换为链接
    repo_name = repo_dict['name']
    repo_url = repo_dict['html_url']
    repo_link = f"<a href='{repo_url}'>{repo_name}</a>"
    repo_links.append(repo_link)

    stars.append(repo_dict['stargazers_count'])
    # 创建悬停文本 
    owner = repo_dict['owner']['login']
    description = repo_dict['description']
    hover_text = f"{owner}<br />{description}"
    hover_texts.append(hover_text)

# 可视化
title = "Most-Starred Python Projects on GitHub"
labels = {'x': 'Repository', 'y': 'Stars'}
fig = px.bar(x=repo_links, y=stars, title=title, labels=labels,hover_name=hover_texts)
fig.update_layout(title_font_size=28, xaxis_title_font_size=20, yaxis_title_font_size=20)
fig.update_traces(marker_color='SteelBlue', marker_opacity=0.6)
fig.show()

```
