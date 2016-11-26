import pandas as pd
import numpy as np

df = pd.read_csv("vehicles.csv", sep=',', error_bad_lines=False, index_col=False, dtype='unicode')
mean = df['year'].mean()
print('%.3f' % mean)
