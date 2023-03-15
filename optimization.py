
import os
import sys
import argparse
import numpy as np
import math

class Constraint:
    def __init__(self, coeff1, coeff2, rhs):
        self.c1 = coeff1
        self.c2 = coeff2
        self.rhs = rhs
    
class Problem:
    def __init__(self, obj, coeff1, coeff2):
        self.obj = obj
        self.c1 = coeff1
        self.c2 = coeff2
        self.constraints = []
        self.tableau = []
        
    def add_constraints(self, coeff1, coeff2, rhs):
        self.constraints.append(Constraint(coeff1,coeff2,rhs))
        
    def form_tableau(self):
        c = [0]*(2+len(self.constraints))
        if(self.obj == 'max'):
            c[0] = self.c1
            c[1] = self.c2
        if(self.obj == 'min'):
            c[0] = -self.c1
            c[1] = -self.c2
        
        A = []
        b = []
        
        idx=0
        for const in self.constraints:
            row = [0]*(2+len(self.constraints))
            row[0] = const.c1
            row[1] = const.c2
            row[2+idx] = 1
            idx+=1
            A.append(row)
            b.append(const.rhs)
        
        xb = [eq + [x] for eq, x in zip(A, b)]
        z = c + [0]
        
        return xb + [z]
    
    def proceed(self, tableau):
        z = tableau[-1]
        return any(x > 0 for x in z[:-1])
    
    def find_pivot(self, tableau):
        z = tableau[-1]
        column = next(i for i, x in enumerate(z[:-1]) if x > 0)

        restrictions = []
        for eq in tableau[:-1]:
            el = eq[column]
            restrictions.append(math.inf if el <= 0 else eq[-1] / el)

        row = restrictions.index(min(restrictions))
        return row, column
    
    def pivot_step(self, tableau, pivot):
        new_tableau = [[] for eq in tableau]

        i, j = pivot
        pivot_value = tableau[i][j]
        new_tableau[i] = np.array(tableau[i]) / pivot_value

        for eq_i, eq in enumerate(tableau):
            if eq_i != i:
                multiplier = np.array(new_tableau[i]) * tableau[eq_i][j]
                new_tableau[eq_i] = np.array(tableau[eq_i]) - multiplier

        return new_tableau

    def is_basic(self, column):
        return sum(column) == 1 and len([c for c in column if c == 0]) == len(column) - 1

    def get_solution(self, tableau):
        columns = np.array(tableau).T
        solutions = []
        for column in columns[:-1]:
            solution = 0
            if self.is_basic(column):
                one_index = column.tolist().index(1)
                solution = columns[-1][one_index]
            solutions.append(solution)

        return solutions
    
    
    def solve(self):
        tableau = self.form_tableau()

        while self.proceed(tableau):
            pivot = self.find_pivot(tableau)
            tableau = self.pivot_step(tableau, pivot)
        
        res = self.get_solution(tableau)[0], self.get_solution(tableau)[1]
        
        Z = self.c1*res[0] + self.c2*res[1]

        return res, Z
        
        
def main():
    #Modify Inputs Here!
    p = Problem('max',3,4) # Max z = 3x1 + 4x2
    p.add_constraints(15,10,300) # 15x1 + 10x2 <= 300
    p.add_constraints(2.5,5,110) # 2.5x1 + 5x2 <= 110
    sol, z = p.solve()
    print(sol, z)

if __name__ == '__main__':
    sys.exit(main())