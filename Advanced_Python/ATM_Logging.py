# Project to incorporate logging for already made script.

import random
import logging
import sys

from datetime import datetime

logger = logging.getLogger(__name__)
stream_handler = logging.StreamHandler(sys.stdout)
logger.addHandler(stream_handler)
logging.basicConfig(filename="logger.log", level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')


class BankAccount:
  def __init__(self):
    self.balance=100
    print("Hello! Welcome to the ATM Depot!")
  
  def authenticate(self):
    while True:
      pin = int(input("\nEnter account pin: "))
      while pin != 1234:
        logger.error("Invalid pin.")
        pin = int(input("\nTry again: "))
      return None
 
  def deposit(self):
    try:
      amount=float(input("Enter amount to be deposited: "))
      if amount < 0:
        logger.warning("You entered a negative number to deposit.")
      self.balance += amount
      logger.info("Amount Deposited: {amount}".format(amount=amount))
      logger.info("Transaction Info:")
      logger.info("Status: Successful")
      logger.info("Transaction #{number}".format(number=random.randint(10000, 1000000)))
    except ValueError:
      logger.error("You entered a non-number value to deposit.")
      logger.info("\nTransaction Info:")
      logger.info("Status: Failed")
      logger.info("\nTransaction #{number}".format(number=random.randint(10000, 1000000)))
 
  def withdraw(self):
    try:
      amount = float(input("Enter amount to be withdrawn: "))
      if self.balance >= amount:
        self.balance -= amount
        logger.info("\nYou withdrew: {amount}".format(amount=amount))
        logger.info("\nTransaction Info:")
        logger.info("Status: Successful")
        logger.info("Transaction #{number}".format(number=random.randint(10000, 1000000)))
      else:
        logger.error("Insufficient balance to complete withdraw.")
        logger.info("\nTransaction Info:")
        logger.info("Status: Failed")
        logger.info("\nTransaction #{number}".format(number=random.randint(10000, 1000000)))
    except ValueError:
      logger.error("You entered a non-number value to deposit.")
      logger.info("\nTransaction Info:")
      logger.info("Status: Failed")
      logger.info("\nTransaction #{number}".format(number=random.randint(10000, 1000000)))
 
  def display(self):
    print("\nAvailable Balance =", self.balance)
 
acct = BankAccount()
acct.authenticate()
acct.deposit()
acct.withdraw()
acct.display()
