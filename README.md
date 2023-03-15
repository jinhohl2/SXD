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

- The program uses simplex method to optimize the linear program.
- The arguments (coeefifients, right hand sides, etc) can be changed in the main function of this python script.

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

### Questions to consider

1. For the proposed problem, I decided to build a non-relational database. Non-relational databases are designed to be more flexible than traditional relational databases. In the case of linear programming problem like this, the input variables and constraints may not have a fixed quantity or structure. Therefore, I believe a non-relational database is suitable. Additionally, non-relational database tend to be faster for certain type of queries, especially those that involve large amount of unstructured or semi-structured data.

2. Another strength of non-relational database is horizontal scalability. Therefore, if the target audience for this program is all math students in United States, we would be able to increase capacity of database and efficiently handle frequent queries by adding more servers. Also, since non-relational database often have simpler API/query language and have better support for modern dev-frameworks, it would be easier for developers to maintain the server.

3. Thus, I have built a non-relational database with MongoDB and implemented a simple REST-API and back-end server using Node.js, and Express.js. Although the database is actually implemented using MongoDB Atlas, the UI and server for this program is only deployed locally, therefore, I have included the instruction and simple demonstration using images below.

### Database/UI Structure

The database includes two entities: Problem and Constraint. 

The schema for Problem entity is as following:

```javascript
{
  "problem_id": ObjectId,
  "coeff1": Number,
  "coeff2": Number,
  "objective": “Max”/”Min”,
  "constraints": [
    {
      "constraint_id": ObjectId,
      "coeff1": Number,
      "coeff1": Number,
      “rhs”:  Number
    },
    {
      "constraint_id": ObjectId,
      "coeff1": Number,
      "coeff1": Number,
      “rhs”:  Number
    }
  ]
}

```

The schema for Constraint entity is as following:

```javascript
{
      "constraint_id": ObjectId,
      "coeff1": Number,
      "coeff1": Number,
      “rhs”:  Number
}
```

These schema can be checked in src/backend/model directory <br>
The API support GET and POST operations. 
The fron-end UI is built with simple HTML/Javascript

When user input is submitted, the program check if there is any Problem instance with the same coefficients and objective **(Problem GET)**. If found, check all the constraints and find if the matching Problem instance has the constraints section equivalent to the input Problem **(Constraint GET)**. If so, output message indicating the problem already exists and prints its solution.

Otherwise, create a new Problem instance **(Problem POST)**. If any of its constraints does not exist in database, also create new Constraint instance for each newly-seen constraint **(Constraint POST)**.
 
### Instruction/Demonstration

- Instruction to run the program locally:

1. Clone repository ot the local environment
2. Run ```npm install``` to download dependencies
3. Run ```npm start``` will run the front-end webpage and back-end server concurrently and locally (webpage in local port 4000, serer in local port 4001)

- Demonstration:

The webpage

1. Two Problem instances and their corresponding constraints are storeed in database.

2. If we input the same problem configuration, then the program informs user that the problem already exists.

3. If we input different objective function configuration, the program informs user that the has not been solved, and create new Problem instance

4. If we input the existing objective function configuration but with new constraints, the program informs user that the has not been solved, and create new Problem instance along with new Constraint instance.


