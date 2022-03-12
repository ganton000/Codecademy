import csv
from functools import reduce

def count(predicate, iterable):
  count_filter = filter(predicate, iterable)
  count_reduce = reduce(lambda x,y: x+1,count_filter,0)
  return count_reduce


def avg_helper(curr_count, itr, curr_sum):
  next_num = next(itr, "null")
  if next_num == "null":
    return curr_sum/curr_count
  curr_count += 1
  curr_sum += next_num

  return avg_helper(curr_count, itr, curr_sum)

def average(itr):
  iterable = iter(itr)
  return avg_helper(0, iterable,0)

with open('1kSalesRec.csv', newline = '') as csvfile:
  reader = csv.reader(csvfile, delimiter=',', quotechar='|')
  fields = next(reader)
  count_belgiums = count(lambda x: x[1] == "Belgium", reader)
  print(count_belgiums)
  csvfile.seek(0)
  total_profit = map(lambda x: float(x[13]),filter(lambda x: x[1] == "Portugal", reader))
  avg_portugal = avg_helper(0, total_profit, 0)
  print(avg_portugal)
