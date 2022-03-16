from nltk.tokenize import PunktSentenceTokenizer, word_tokenize

def word_sentence_tokenize(text):

    #Create a PunktSentenceTokenizer
    sentence_tokenizer = PunktSentenceTokenizer(text)

    #sentence tokenize text
    sentence_tokenized = sentence_tokenizer.tokenize(text)

    #create list to hold word tokenized sentences
    word_tokenized = list()

    #loop through each tokenized sentence and append to list
    for sentence in sentence_tokenized:
        word_tokenized.append(sentence)

    return word_tokenized