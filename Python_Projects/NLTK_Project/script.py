from nltk import pos_tag, RegexpParser
from tokenize_words import word_sentence_tokenize
from chunk_counters import np_chunk_counter, vp_chunk_counter

# import text
dorian_txt = open("dorian_gray.txt", encoding="utf-8").read().lower()

iliad_txt = open("the_iliad.txt", encoding="utf-8").read().lower()

# sentence and word tokenize text here
word_tokenized_dorian = word_sentence_tokenize(dorian_txt)
word_tokenized_iliad = word_sentence_tokenize(iliad_txt)

# store and print any word tokenized sentence here

rand_toke_sent = word_tokenized_dorian[3]
print(rand_toke_sent)

# create a list to hold part-of-speech tagged sentences here

pos_tagged_dorian = list()
pos_tagged_iliad = list()

# part-of-speech tag each sentence and append to list of pos-tagged sentences here

for word in word_tokenized_dorian:
  pos_tagged_dorian.append(pos_tag(word))

for word in word_tokenized_iliad:
  pos_tagged_iliad.append(pos_tag(word))

print(pos_tagged_dorian[3])

# define noun/verb phrase chunk grammar here

np_chunk_grammar = "NP: {<DT>?<JJ>*<NN>}"
vp_chunk_grammar = "VP: {<DT>?<JJ>*<NN><VB.*><RB.?>?}"

# create noun/verb phrase RegexpParser object here

np_chunk_parser = RegexpParser(np_chunk_grammar)
vp_chunk_parser = RegexpParser(vp_chunk_grammar)

# create a list to hold noun phrase chunked sentences and a list to hold verb phrase chunked sentences here

np_chunked_dorian = [ np_chunk_parser.parse(tag) for tag in pos_tagged_dorian]

np_chunked_iliad = [ np_chunk_parser.parse(tag) for tag in pos_tagged_iliad ]

vp_chunked_dorian = [ vp_chunk_parser.parse(tag) for tag in pos_tagged_dorian ]

vp_chunked_iliad = [ vp_chunk_parser.parse(tag) for tag in pos_tagged_iliad ]


# store and print the most common NP-chunks here

most_common_np_dorian_chunks = np_chunk_counter(np_chunked_dorian)

most_common_vp_dorian_chunks = vp_chunk_counter(vp_chunked_dorian)

most_common_np_iliad_chunks = np_chunk_counter(np_chunked_iliad)

most_common_vp_iliad_chunks = vp_chunk_counter(vp_chunked_iliad)

print(most_common_np_dorian_chunks)
print(most_common_vp_dorian_chunks)
