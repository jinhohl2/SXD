# SXD
SXD Software Intern Technical Excercise


## 1. Math

### Graphical Method:
![Alt text](assets/plot.png?raw=true "Plot")

### Simplex Method:

a. Interation 0 (Initialization)

|       |  $Z$  | $x_1$ | $x_2$ | $x_3$ | $x_4$ |  RHS  |
| ----- |:-----:| -----:| -----:| -----:| -----:| -----:|
|  $Z$  |   -1   |   -3  |   1   |   0   |   0   |   0   |
| $x_3$ |   0   |   1   |   1   |   1   |   0   |   5   |
| $x_4$ |   0   |   2   |   1   |   0   |   1   |   8   |

Pivoting Column: $x_1$
Pivoting Row: $x_4$

b. Iteration 1

$Row_{1,new} = Row_1 -(-3) * Row_{3,New}$ <br> 
$Row_{2,new} = Row_2 -(-1) * Row_{3,New}$ <br>
$Row_{3,new} = 0.5 * Row_{3}$ <br>

|       |  $Z$  | $x_1$ | $x_2$ | $x_3$ | $x_4$ |  RHS  |
| ----- |:-----:| -----:| -----:| -----:| -----:| -----:|
|  $Z$  |   -1   |   0   |$\frac{5}{2}$|   0   |$\frac{3}{2}$|   12   |
| $x_3$ |   0   |   0   |$\frac{1}{2}$|   1   |$-\frac{1}{2}$|   1   |
| $x_1$ |   0   |   1   |$\frac{1}{2}$|   0   |$\frac{1}{2}$|   4   |

Since there is no more negative coefficient in the objective function, we stop.<br>
The optimal solution is $(x_1, x_2) = (4,0)$, and $Z=-12$.
## 2. Programming

## 3. System
