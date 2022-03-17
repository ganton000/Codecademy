import os
import gensim
import spacy
from president_helper import read_file, process_speeches, merge_speeches, get_president_sentences, get_presidents_sentences, most_frequent_words

# get list of all speech files
files = sorted([file for file in os.listdir() if file[-4:] == '.txt'])

#print(files)

# read each speech file
speeches = [ read_file(file) for file in files ]


# preprocess each speech
processed_speeches = process_speeches(speeches)


# merge speeches
all_sentences = merge_speeches(processed_speeches)


# view most frequently used words
most_freq_words = most_frequent_words(all_sentences)
#print(most_freq_words[:100], len(most_freq_words))


# create gensim model of all speeches
all_prez_embeddings = gensim.models.Word2Vec(all_sentences, size=96, window=5, min_count=1, workers=2, sg=1)

# view words similar to freedom
similar_to_freedom = all_prez_embeddings.most_similar("freedom", topn=20)

#print(similar_to_freedom)

# get President Trump sentences
trump_sentences = get_president_sentences("Trump")


# view most frequently used words of Trump
trump_most_freq_words = most_frequent_words(trump_sentences)

#print(trump_most_freq_words)


# create gensim model for Roosevelt
trump_embeddings = gensim.models.Word2Vec(trump_sentences, size=96, window=5, min_count=1, workers=2, sg=1)

# view words similar to freedom for Roosevelt
similar_to_govt = trump_embeddings.most_similar("government", topn=10)

print(similar_to_govt)


# get sentences of multiple presidents
rushmore_prez_sentences = get_presidents_sentences(["washington","jefferson", "lincoln", "theodore-roosevelt"])


# view most frequently used words of presidents
rushmore_most_freq_words = most_frequent_words(rushmore_prez_sentences)

#print(rushmore_most_freq_words[:50])


# create gensim model for the presidents
rushmore_embeddings = gensim.models.Word2Vec(rushmore_prez_sentences, size=96, window=5, min_count=1, workers=2, sg=1)

# view words similar to freedom for presidents
rushmore_similar_to_govt = rushmore_embeddings.most_similar("government",topn=10)

print(rushmore_similar_to_govt)
