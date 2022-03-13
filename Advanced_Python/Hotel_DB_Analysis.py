# Import module 
import sqlite3


# Task 1: Create connection object
con = sqlite3.connect('hotel_booking.db')

# Task 2: Create cursor object
cur = con.cursor()


# Task 3: View first row of booking_summary
row = cur.execute('Select * From booking_summary').fetchone()

# print(row)

# Task 4: View first ten rows of booking_summary 
ten_rows = cur.execute('Select * From booking_summary').fetchmany(10)

#print(ten_rows)

# Task 5: Create object bra and print first 5 rows to view data
bra = cur.execute('Select * From booking_summary Where country= "BRA";').fetchall()
#print(bra)

# Task 6: Create new table called bra_customers
cur.execute('''CREATE TABLE IF NOT EXISTS bra_customers(
  num INTEGER, hotel TEXT, is_cancelled INTEGER,   
  lead_time INTEGER, arrival_date_year INTEGER, 
  arrival_date_month TEXT,
  arrival_date_day_of_month INTEGER,
  adults INTEGER, children INTEGER,
  country TEXT, adr REAL,
  special_requests INTEGER
)''')

# Task 7: Insert the object bra into the table bra_customers 

questions = ','.join(['?' for _ in range(12)])
cur.executemany('INSERT INTO bra_customers VALUES ('+questions+')',bra)

# Task 8: View the first 10 rows of bra_customers
bra_rows = cur.execute('SELECT * FROM bra_customers').fetchmany(10)

#print(bra_rows)

# Task 9: Retrieve lead_time rows where the bookings were canceled
lead_time_can = cur.execute('SELECT lead_time FROM bra_customers WHERE is_cancelled = 1;').fetchall()

#print(lead_time_can)
# Task 10: Find average lead time for those who canceled and print results

from functools import reduce

avg_lead_time_can = reduce(lambda x,y: x+y[0], lead_time_can, 0)/len(lead_time_can)

#print(avg_lead_time)

# Task 11: Retrieve lead_time rows where the bookings were not canceled
lead_time = cur.execute('SELECT lead_time FROM bra_customers WHERE is_cancelled = 0;').fetchall()
#print(lead_time)
# Task 12: Find average lead time for those who did not cancel and print results

avg_lead_time = reduce(lambda x,y: x+y[0], lead_time, 0)/len(lead_time)
#print(avg_lead_time)

print('Is avg_lead_time > avg_lead_time_cancelled? {no}'.format(no=avg_lead_time>avg_lead_time_can))
print('Difference between lead times are: {time}'.format(time=abs(avg_lead_time - avg_lead_time_can)))

# Task 13: Retrieve special_requests rows where the bookings were canceled

num_spec_requests_can = cur.execute('''SELECT special_requests FROM bra_customers WHERE is_cancelled=1;''').fetchall();

#print(num_spec_requests_can)

# Task 14: Find total speacial requests for those who canceled and print results

tot_spec_req_can = reduce(lambda x,y: x+y[0],num_spec_requests_can,0)

print(tot_spec_req_can)

# Task 15: Retrieve special_requests rows where the bookings were not canceled

num_spec_requests = cur.execute('''SELECT special_requests FROM bra_customers WHERE is_cancelled=0;''').fetchall();

# Task 16: Find total speacial requests for those who did not cancel and print results

tot_spec_req = reduce(lambda x,y: x+y[0],num_spec_requests,0)

print(tot_spec_req)

# Task 17: Commit changes and close the connection

con.commit()
con.close()
