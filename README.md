# SXD
SXD Software Intern Technical Excercise


## 1. Math
<br>

### a. Graphical Method:

![Alt text](src/assets/plot.png?raw=true "Plot") <br>

Blue line = first constrint boundary <br>
Yellow line = second constraint boundary <br>
The optimal solution is $(x_1, x_2) = (4,0)$, and $Z=-12$. <br>

### b. Simplex Method:

i. Interation 0 (Initialization)

|       |  $Z$  | $x_1$ | $x_2$ | $x_3$ | $x_4$ |  RHS  |
| ----- |:-----:| -----:| -----:| -----:| -----:| -----:|
|  $Z$  |   -1   |   -3  |   1   |   0   |   0   |   0   |
| $x_3$ |   0   |   1   |   1   |   1   |   0   |   5   |
| $x_4$ |   0   |   2   |   1   |   0   |   1   |   8   |

Pivoting Column: $x_1$
Pivoting Row: $x_4$

ii. Iteration 1

$Row_{1,new} = Row_1 -(-3) * Row_{3,New}$ <br> 
$Row_{2,new} = Row_2 -(-1) * Row_{3,New}$ <br>
$Row_{3,new} = 0.5 * Row_{3}$ <br>

|       |  $Z$  | $x_1$ | $x_2$ | $x_3$ | $x_4$ |  RHS  |
| ----- |:-----:| -----:| -----:| -----:| -----:| -----:|
|  $Z$  |   -1   |   0   |$\frac{5}{2}$|   0   |$\frac{3}{2}$|   12   |
| $x_3$ |   0   |   0   |$\frac{1}{2}$|   1   |$-\frac{1}{2}$|   1   |
| $x_1$ |   0   |   1   |$\frac{1}{2}$|   0   |$\frac{1}{2}$|   4   |

Since there is no more negative coefficient in the objective function, we stop.<br>
The optimal solution is $(x_1, x_2) = (4,0)$, and $Z=-12$. <br>

## 2. Programming

The implementation of this code is in optimization.py file. <br>

The program uses simplex method to optimize the linear program.
The arguments (coeefifients, right hand sides, etc) can be changed in the main function of this python script.
The script includes following steps:

0. Accept an objective function and add constraints.
1. Initialize the simplex table with input arguments.
2. See the coefficient in the objective function to check if the solution can be optized.
3. Find pivot column (entering basic variable) by selecting a positive coefficient in the objective function.
4. Find pivot row (leaving basic variable) by selecting the row with the smallest min-ratio value.
5. Replace the pivot row variable by the variable in the pivot column.
6. Divide the pivot row by the pivot number (intersection of pivot row and column).
7. For each other row, multiply the new pivot row by the entry in the pivot column of each row and subtract it from the original row.
8. Go back to step (2) <br>

The optimal solution is $(x_1, x_2) = (8,18)$, and $Z=-96$. <br>

## 3. System
