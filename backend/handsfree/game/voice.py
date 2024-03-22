from keras.models import Sequential
from keras.layers import Dense, Conv1D, MaxPooling1D, GlobalMaxPooling1D
from keras.layers.embedding import Embedding

list_of_commands = ["sort_suit", "sort_value", "lay_off", "meld", "draw_deck", "draw_pile", "discard"]

dict_of_next = {

                "lay_off": ["which card", "which meld"],
                   "meld": ["which cards"],
                "discard": ["which card"]

                }

