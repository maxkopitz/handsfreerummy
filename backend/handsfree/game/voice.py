"""from keras.models import Sequential
from keras.layers import Dense, Conv1D, MaxPooling1D, GlobalMaxPooling1D
from keras.layers.embedding import Embedding"""
import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense

list_of_commands = ["sort_suit", "sort_value", "lay_off", "meld", "draw_discard", "draw_pickup", "discard"]
dict_of_next = {

                "lay_off": ["which card", "which meld"],
                   "meld": ["which cards"],
                "discard": ["which card"]

                }

sortSuitSentences = []
sortValueSentences = []
layOffSentences = []
meldSentences = []
drawDiscardSentences = []
drawPickupSentences = []
discardSentences = []
dataSentencesLists = [sortSuitSentences, sortValueSentences, layOffSentences, meldSentences,
                 drawDiscardSentences, drawPickupSentences, discardSentences]
lines = sys.stdin.readlines()
index = -1
for line in lines:
   if line[0] == '#':
      index += 1
   else: 
      dataSentencesLists[index].append(line[:-1])
#print(dataSentencesLists)
trainingData = []
labelsData = []
index = 0
for li in dataSentencesLists:
   for item in li:
      trainingData.append(item)
      labelsData.append(index)
   index += 1
for index in range(len(trainingData)):
   print((trainingData[index], labelsData[index]))

# Tokenize (make each word within each sentence its own feature)
tokenizer = Tokenizer()
tokenizer.fit_on_texts(trainingData)
word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(trainingData)
print(sequences, word_index)

# Padding
max_length = max([len(seq) for seq in sequences])
print(max_length)
padded_sequences = pad_sequences(sequences, maxlen=max_length, padding='post')

# Encode labels
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labelsData)
print(encoded_labels)

X_train, X_test, y_train, y_test = train_test_split(padded_sequences, encoded_labels, test_size=0.2, random_state=42)

# CNN model
model = Sequential()
model.add(Embedding(input_dim=68, output_dim=50, input_length=max_length))
model.add(Conv1D(64, 8, activation='relu'))
model.add(GlobalMaxPooling1D())
model.add(Dense(32, activation='relu'))
model.add(Dense(7, activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Train the model
model.fit(padded_sequences, encoded_labels)

tester = [
"sort the cards by suit",
 "sort these cards by value",
 "play one card",
 "play a meld",
 "draw from the discard pile",
 "draw from the deck",
 "discard a card"
 ]
# Tokenize and pad the input sentence
input_sequence = tokenizer.texts_to_sequences(tester)
padded_sequence = pad_sequences(input_sequence, maxlen=max_length, padding='post')

# Use the loaded model for prediction
predictions = model.predict(padded_sequence)

# Decode predictions (if needed)
decoded_predictions = label_encoder.inverse_transform(predictions.argmax(axis=1))
print(decoded_predictions)
