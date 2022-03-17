from collections import Counter
from responses import responses, blank_spot
from user_functions import preprocess, compare_overlap, pos_tag, extract_nouns, compute_similarity
import spacy
word2vec = spacy.load('en')

exit_commands = ("quit", "goodbye", "exit", "no")

class ChatBot:

  def make_exit(self, user_message):
    for exit in exit_commands:
      if exit in user_message:
        print("Thank you, have a good day!")
        return True
  
  def chat(self):
    user_message = input("Welcome to Cyborg Cantina! How can I help you today?")
    while not self.make_exit(user_message):
      user_message = self.respond(user_message)

  def find_intent_match(self, responses, user_message):
    bow_user_message = Counter(preprocess(user_message))
    preprocessed_responses = [ Counter(preprocess(response)) for response in responses ]

    similarity_list = [ compare_overlap(response, bow_user_message) for response in preprocessed_responses ]
    response_index = similarity_list.index(max(similarity_list))
    return responses[response_index]

  def respond(self, user_message):
    best_response = self.find_intent_match(responses, user_message)
    entity = self.find_entities(user_message)
    print(best_response.format(entity))
    input_message = input("Would you like anything else?")
    return input_message

  def find_entities(self, user_message):
    tagged_user_msg = pos_tag(preprocess(user_message))
    message_nouns = extract_nouns(tagged_user_msg)

    tokens = word2vec(" ".join(message_nouns))
    category = word2vec(blank_spot)

    word2vec_result = compute_similarity(tokens, category)

    word2vec_result.sort(key=lambda x: x[2])
    if len(word2vec_result) < 1:
      return blank_spot
    else:
      return word2vec_result[-1][0]


  

#initialize ChatBot instance below:

cyborgBot = ChatBot()
cyborgBot.chat()

#call .chat() method below:



