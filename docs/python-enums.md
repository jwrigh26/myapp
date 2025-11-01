# Python Enums Explained

A comprehensive guide to understanding Python's `Enum` and `IntEnum` classes.

## The Basics

```python
from enum import IntEnum

class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1
```

### What's happening:

1. **`IntEnum` is a special enum class** that creates enumeration constants that are also integers
2. **`NORMAL` and `HONEY` are class attributes** that become enum members
3. **The values `0` and `1`** are what those members represent

---

## How to Use Enums

```python
# Access enum members
bunny_type = BunnyType.NORMAL
print(bunny_type)          # BunnyType.NORMAL
print(bunny_type.value)    # 0
print(bunny_type.name)     # 'NORMAL'

# They work as integers
print(BunnyType.NORMAL == 0)   # True
print(BunnyType.HONEY == 1)    # True

# You can compare them
print(BunnyType.NORMAL < BunnyType.HONEY)  # True (because 0 < 1)

# You can use them in arithmetic
result = BunnyType.HONEY + 5   # 6

# You can create from values
bunny = BunnyType(0)      # BunnyType.NORMAL
bunny = BunnyType(1)      # BunnyType.HONEY
```

---

## IntEnum vs Enum

### `IntEnum` (Behaves like integers)

```python
from enum import IntEnum

class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1

# Integer comparisons work
BunnyType.NORMAL == 0                      # True ✅
BunnyType.NORMAL < BunnyType.HONEY         # True ✅

# Arithmetic operations work
BunnyType.HONEY + 5                        # 6 ✅

# Can be used wherever integers are expected
my_list = [1, 2, BunnyType.NORMAL]        # [1, 2, 0] ✅
```

### Regular `Enum` (More type-safe)

```python
from enum import Enum

class BunnyType(Enum):
    NORMAL = 0
    HONEY = 1

# Integer comparisons DON'T work
BunnyType.NORMAL == 0                      # False ❌ (more type-safe)
BunnyType.NORMAL < BunnyType.HONEY         # TypeError! Can't compare ❌

# Must explicitly get the value
BunnyType.NORMAL.value == 0                # True ✅

# More explicit comparison needed
BunnyType.NORMAL == BunnyType.NORMAL       # True ✅
```

**When to use each:**

| Use `IntEnum` when... | Use `Enum` when... |
|----------------------|-------------------|
| You need to compare values (`<`, `>`) | You want type safety |
| Values represent numeric states/levels | Values are just labels |
| Working with algorithms (like binary search) | You want to prevent accidental comparisons |
| Need backward compatibility with integers | Values might change later |

---

## Why IntEnum is Perfect for Binary Search

Your binary search predicate works naturally with `IntEnum`:

```python
class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1

# This predicate works because IntEnum allows < comparison
def is_before(x: BunnyType): 
    return x < BunnyType.HONEY

# Test it
print(is_before(BunnyType.NORMAL))  # True (0 < 1)
print(is_before(BunnyType.HONEY))   # False (1 < 1)
```

The comparison `x < BunnyType.HONEY` is really doing `0 < 1` or `1 < 1` under the hood!

---

## Different Ways to Define Enum Values

### 1. Explicit values (RECOMMENDED for clarity)

```python
class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1
```

**Pros:**
- ✅ Clear and explicit
- ✅ You control the exact values
- ✅ Easy to understand

### 2. Auto-incrementing from 1

```python
from enum import auto

class BunnyType(IntEnum):
    NORMAL = auto()  # 1
    HONEY = auto()   # 2
```

**Note:** `auto()` starts from 1 by default!

### 3. Auto-incrementing from 0

```python
from enum import auto

class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = auto()   # 1
    SWEET = auto()   # 2
```

### 4. Custom start value

```python
class Priority(IntEnum):
    LOW = 10
    MEDIUM = 20
    HIGH = 30
```

---

## Common Enum Patterns

### Iteration

```python
# Loop through all enum members
for bunny_type in BunnyType:
    print(f"{bunny_type.name}: {bunny_type.value}")

# Output:
# NORMAL: 0
# HONEY: 1
```

### Get all members

```python
print(list(BunnyType))           # [<BunnyType.NORMAL: 0>, <BunnyType.HONEY: 1>]
print([b.name for b in BunnyType])   # ['NORMAL', 'HONEY']
print([b.value for b in BunnyType])  # [0, 1]
```

### Check if value exists

```python
# Try to create from value
try:
    bunny = BunnyType(5)  # Raises ValueError
except ValueError:
    print("Invalid bunny type!")

# Better way: check first
def is_valid_bunny_type(value: int) -> bool:
    return value in [b.value for b in BunnyType]

print(is_valid_bunny_type(0))   # True
print(is_valid_bunny_type(5))   # False
```

### Check if name exists

```python
# Check by name
if 'NORMAL' in BunnyType.__members__:
    print("NORMAL exists!")

# Get by name
bunny = BunnyType['NORMAL']  # BunnyType.NORMAL
```

---

## Real-World Example: Binary Search with Bunnies

Here's how it all comes together:

```python
from enum import IntEnum
from typing import List

class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1

class Bunny:
    def __init__(self, bunny_type: BunnyType = BunnyType.NORMAL):
        self.name = "bunny"
        self.type = bunny_type

# Create a sorted array of bunnies
bunnies = [Bunny(BunnyType.NORMAL) for _ in range(4)] + \
          [Bunny(BunnyType.HONEY) for _ in range(3)]

# Define the predicate
def is_before(bunny: Bunny) -> bool:
    return bunny.type < BunnyType.HONEY

# Binary search
def find_first_honey_bunny(bunnies: List[Bunny]) -> int:
    left, right = -1, len(bunnies)
    
    while left + 1 < right:
        mid = (left + right) // 2
        if is_before(bunnies[mid]):
            left = mid
        else:
            right = mid
    
    return right  # Index of first honey bunny

# Test it
result = find_first_honey_bunny(bunnies)
print(f"First honey bunny is at index: {result}")  # 4
```

---

## Quick Reference

### Creating Enums

```python
from enum import Enum, IntEnum, auto

class MyEnum(IntEnum):
    FIRST = 1
    SECOND = 2
    THIRD = auto()  # 3
```

### Accessing Members

```python
# By name
MyEnum.FIRST

# By value
MyEnum(1)

# By string name
MyEnum['FIRST']
```

### Getting Information

```python
member = MyEnum.FIRST

member.name        # 'FIRST'
member.value       # 1
isinstance(member, MyEnum)  # True
```

### Comparing

```python
# IntEnum - works with integers
MyEnum.FIRST == 1           # True
MyEnum.FIRST < MyEnum.SECOND  # True

# Regular Enum - type safe
MyEnum.FIRST == MyEnum.FIRST  # True
MyEnum.FIRST == 1             # False
```

---

## Summary

**Your `BunnyType` definition is perfect:**

```python
class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1
```

**Why it works well:**
1. ✅ Values are explicit and clear (0 and 1)
2. ✅ `IntEnum` allows comparisons (`<`, `>`, etc.)
3. ✅ Works great for binary search predicates
4. ✅ Can be used as both enums and integers
5. ✅ Easy to read and understand

This is the ideal approach for your binary search use case!
