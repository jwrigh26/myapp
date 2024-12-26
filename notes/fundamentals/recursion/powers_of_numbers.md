Summary of the recursive approach to compute `x^n` (where `x` is a real number and `n` is an integer):

---

### **Key Observations for Recursive Power Computation**

1. **Base Case**:
   - `x^0 = 1`: No matter the value of `x`, if `n = 0`, the result is `1`.

2. **Positive Exponents**:
   - **If \( n \) is even**:
     - `x^n = (x^{n/2}) . (x^{n/2})`
     - Recursively compute `x^{n/2}`, then square it.
   - **If \( n \) is odd**:
     - `x^n = x^{n-1} . x`
     - Recursively compute `x^{n-1}`, then multiply by `x`.

3. **Negative Exponents**:
   - `x^n = 1 / x^{-n}`
   - Recursively compute `x^{-n}` (making the exponent positive), then take its reciprocal.

4. **Efficiency**:
   - When \( n \) is even, you only make **one recursive call**, which reduces the number of calculations compared to a naive approach.

---

This recursive strategy efficiently handles all cases: \( n = 0 \), positive \( n \), and negative \( n \), while reducing repeated calculations when \( n \) is even.

---

Exponents can be tricky at first, but let’s break it down step by step with **simple rules** and **examples** to help you understand both **negative** and **fractional** exponents.

---

### **What Are Exponents?**
Exponents represent repeated multiplication of a number (called the base). For example:
- \( 2^3 = 2 \times 2 \times 2 = 8 \)

---

### **Key Rules of Exponents**
1. **Base Cases**:
   - \( x^0 = 1 \) (any number raised to 0 is 1, except \( 0^0 \), which is undefined).

2. **Multiplication Rule**:
   - \( x^a \cdot x^b = x^{a+b} \)

3. **Division Rule**:
   - \( \frac{x^a}{x^b} = x^{a-b} \)

4. **Power of a Power Rule**:
   - \( (x^a)^b = x^{a \cdot b} \)

5. **Negative Exponents**:
   - \( x^{-a} = \frac{1}{x^a} \) (flip the base to make the exponent positive).

6. **Fractional Exponents**:
   - \( x^{\frac{1}{n}} = \sqrt[n]{x} \) (the denominator represents the root).
   - \( x^{\frac{m}{n}} = \sqrt[n]{x^m} \) (apply the root first, then the power).

---

### **Breaking Down Difficult Cases**
Let’s address **negative exponents** and **fractional exponents** step by step.

---

#### **1. Negative Exponents**
Negative exponents flip the base to make the exponent positive. Example:
\[
x^{-n} = \frac{1}{x^n}
\]
**Example**:
- \( 2^{-3} = \frac{1}{2^3} = \frac{1}{8} \)

---

#### **2. Fractional Exponents**
Fractional exponents combine powers and roots. Example:
\[
x^{\frac{1}{2}} = \sqrt{x} \quad \text{and} \quad x^{\frac{1}{3}} = \sqrt[3]{x}
\]
If there’s a numerator in the fraction, it’s a power:
\[
x^{\frac{m}{n}} = \sqrt[n]{x^m}
\]

**Examples**:
1. \( 4^{\frac{1}{2}} = \sqrt{4} = 2 \)
2. \( 8^{\frac{1}{3}} = \sqrt[3]{8} = 2 \)
3. \( 27^{\frac{2}{3}} = \sqrt[3]{27^2} = \sqrt[3]{729} = 9 \)

---

### **Walkthrough Examples**

#### **Case 1: Recursive Calculation**
We can compute \( 2^5 \) recursively:
1. \( 2^5 = 2 \cdot 2^4 \)
2. \( 2^4 = 2 \cdot 2^3 \)
3. \( 2^3 = 2 \cdot 2^2 \)
4. \( 2^2 = 2 \cdot 2^1 \)
5. \( 2^1 = 2 \cdot 2^0 \)
6. \( 2^0 = 1 \)

Multiplying back:
- \( 2^1 = 2 \)
- \( 2^2 = 2 \cdot 2 = 4 \)
- \( 2^3 = 4 \cdot 2 = 8 \)
- \( 2^4 = 8 \cdot 2 = 16 \)
- \( 2^5 = 16 \cdot 2 = 32 \)

---

#### **Case 2: Recursive Negative Exponents**
For \( 2^{-3} \):
1. Start with the rule: \( x^{-n} = \frac{1}{x^n} \).
2. Compute \( 2^3 \) recursively as shown above (\( 2^3 = 8 \)).
3. Then take the reciprocal: \( 2^{-3} = \frac{1}{8} \).

---

#### **Case 3: Recursive Fractional Exponents**
For \( 4^{\frac{1}{2}} \):
1. Understand \( 4^{\frac{1}{2}} = \sqrt{4} \).
2. \( \sqrt{4} = 2 \).

For \( 8^{\frac{2}{3}} \):
1. Rewrite \( 8^{\frac{2}{3}} = \sqrt[3]{8^2} \).
2. Compute \( 8^2 = 64 \).
3. Find the cube root of 64: \( \sqrt[3]{64} = 4 \).

---

### **Recursive Power Function in JavaScript**
Here’s a simple recursive implementation to handle all cases:

```javascript
function power(x, n) {
    // Base case: Any number to the power of 0 is 1
    if (n === 0) return 1;

    // Handle negative exponents
    if (n < 0) return 1 / power(x, -n);

    // If n is even
    if (n % 2 === 0) {
        const halfPower = power(x, n / 2);
        return halfPower * halfPower;
    }

    // If n is odd
    return x * power(x, n - 1);
}

// Examples:
console.log(power(2, 5));  // 32
console.log(power(2, -3)); // 0.125
console.log(power(4, 0.5)); // 2 (Fractional Exponent)
```

---

### **Recursive Power Function in Python**
Here’s how you’d write the same in Python:

```python
def power(x, n):
    # Base case: Any number to the power of 0 is 1
    if n == 0:
        return 1

    # Handle negative exponents
    if n < 0:
        return 1 / power(x, -n)

    # If n is even
    if n % 2 == 0:
        half_power = power(x, n // 2)
        return half_power * half_power

    # If n is odd
    return x * power(x, n - 1)

# Examples:
print(power(2, 5))   # 32
print(power(2, -3))  # 0.125
print(power(4, 0.5)) # 2 (Fractional Exponent)
```

---

### **Practice Problems**
1. Compute \( 5^{-2} \) and \( 3^{\frac{3}{2}} \).
2. Write a recursive function to compute \( x^n \) when \( n \) is fractional.

Let me know if you'd like to work through these or need more examples!

Great question! The key to understanding why the recursion eventually stops is to focus on the transformation of the exponent in each recursive step. Let’s break it down.

---

### **Why the Recursion Stops for Negative \( n \)**

When \( n < 0 \), the recursion changes the negative exponent into a **positive one** by flipping the sign:
```python
if n < 0:
    return 1 / power(x, -n)
```

Here’s what happens step-by-step:

1. If \( n \) is negative, we take its absolute value (\(-n\)) and call the function again:
   - This effectively converts the problem of \( x^{-n} \) into \( 1 / x^n \), where \( n \) is now positive.

2. Once \( n \) is positive, the recursion follows the logic for positive \( n \):
   - If \( n \) becomes 0 (base case), it returns \( 1 \).
   - If \( n > 0 \), it reduces \( n \) (e.g., by halving it for even \( n \) or subtracting 1 for odd \( n \)).

---

### **Worked Example: \( power(2, -3) \)**

Here’s how the recursion plays out:

#### Initial Call
```python
power(2, -3)
# n < 0, so:
1 / power(2, 3)
```

#### Second Call
```python
power(2, 3)
# n > 0, and n is odd, so:
2 * power(2, 2)
```

#### Third Call
```python
power(2, 2)
# n > 0, and n is even, so:
half_power = power(2, 1)
half_power * half_power
```

#### Fourth Call
```python
power(2, 1)
# n > 0, and n is odd, so:
2 * power(2, 0)
```

#### Fifth Call (Base Case)
```python
power(2, 0)
# Base case: n == 0, return 1
1
```

---

### **Recursion Returns**
Now that the base case is reached, the function starts returning results:

1. \( power(2, 0) = 1 \)
2. \( power(2, 1) = 2 \cdot 1 = 2 \)
3. \( power(2, 2) = 2 \cdot 2 = 4 \)
4. \( power(2, 3) = 2 \cdot 4 = 8 \)
5. \( power(2, -3) = 1 / 8 = 0.125 \)

---

### **Why the Infinite Loop Doesn't Happen**

The critical point is that the **negative exponent is converted to a positive exponent** with the first recursive step:
```python
power(x, -n)
```
After this, \( -n \) is positive, so subsequent calls follow the regular positive exponent rules and reduce \( n \) until the base case \( n = 0 \) is reached.

If you didn’t convert \( -n \) to a positive number in the recursion, it **would** cause an infinite loop because the negative value would keep getting passed down without reaching the base case.

---

### **Visualizing the Flow**

For \( power(2, -3) \):

1. \( n = -3 \): Convert to \( n = 3 \), then handle as a positive exponent.
2. \( n = 3 \): Reduce by subtracting 1.
3. \( n = 2 \): Halve the exponent.
4. \( n = 1 \): Subtract 1.
5. \( n = 0 \): Base case, return \( 1 \).

---

Does this clarify how the recursion avoids an infinite loop? Let me know if you'd like to walk through another example!