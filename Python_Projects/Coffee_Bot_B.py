from utils_Coffee_Bot import print_message, get_size, order_latte, order_mocha

def coffee_bot():
  print('Welcome to the cafe!')

  order_drink = True
  drinks = []

  while order_drink:
    size = get_size()  
    drink_type = get_drink_type()

    drink = '{} {}'.format(size, drink_type)
    print('Alright, that\'s a {}!'.format(drink))
    drinks.append(drink)

    while True:
      another_drink = input("Would you like to order another drink? (y/n)")
      if another_drink == "n":
        order_drink = False
        break
      if another_drink == "y":
        break
  
  drink_str = '\n -'.join(drinks)
  print(f'Ok, so I have a \n-{drink_str}')

  name = input('Can I get your name please? \n> ')
  print('Thanks, {}! Your order will be ready shortly.'.format(name))

def get_drink_type():
  res = input('What type of drink would you like? \n[a] Brewed Coffee \n[b] Mocha \n[c] Latte \n> ')

  if res == 'a':
    return 'brewed coffee'
  elif res == 'b':
    return order_mocha()
  elif res == 'c':
    return order_latte()
  else:
    print_message()
    return get_drink_type()





coffee_bot()
