from random import shuffle

class Card:
    def __init__(self, value: int, suit: str):
        self.value = value
        self.suit = suit

    def retCard(self):
        return (self.value, self.suit)

class Deck:
    def __init__(self):
        
        self.hearts = []
        self.diamonds = []
        self.spades = []
        self.clubs = []
        
        # This order corresponds to the deck post-shuffle
        self.order = list(range(52))
        shuffle(self.order)
        
        # initialize deck to four arrays with 13 cards corresponding to each suit
        for num in range(1,14):
            self.hearts.append(Card(num, "hearts"))
            self.diamonds.append(Card(num, "diamonds"))
            self.spades.append(Card(num, "spades"))
            self.clubs.append(Card(num, "clubs"))
    
    # draw card pops the first element from order. It indexes into the corresponding
    # array and then returns the corresponding card
    def draw(self) -> Card:
        nextCard = self.order.pop(0)
        suitNum = int(nextCard / 13)
        valueNum = nextCard % 13
        if suitNum == 0:
            return self.hearts[valueNum]
        elif suitNum == 1: 
            return self.diamonds[valueNum]
        elif suitNum == 2:
            return self.spades[valueNum]
        else:
            return self.clubs[valueNum]

class Meld:

    def __init__(self, matchedSet: list[Card]):
        self.set = matchedSet

class Player:
    def __init__(self, id: str):
        self.id = id
        self.hand = []

    def discard(self, victim: Card):
        self.hand.remove(victim)

    def pickup(self, card: Card):
        self.hand.append(card)

class Board:

    def __init__(self, numPlayers: int, players: list[Player]):
        

        self.stockPile = Deck() # the pile that the players draw from
        self.discardPile = [] # the pile that the players will discard to
    
        # deals the cards to each player's hand
        # When two people play, each person gets 10 cards. When three or four people play, 
        # each receives seven cards; when five or six play, each receives six cards
        if game.numPlayers == 2:
            for i in range(10):
                players[0].hand.append(self.stockPile.draw())
                players[1].hand.append(self.stockPile.draw())
        elif game.numPlayers < 5:
            for i in range(7):
                for player in range(game.numPlayers):
                    players[player].hand.append(self.stockPile.draw())
        else:
            for i in range(6):
                for player in range(game.numPlayers):
                    players[player].hand.append(self.stockPile.draw())
            
    def print(self):
        for i in self.game.players:
            print("Player ", i.id, ":")
            for j in i.hand:
                print(j.retCard())
class Game:

    gameId = 0
    def __init__(self, numPlayers: int, playerIDs: list[str]) -> None:
        # initialize the players array with their ids
        self.numPlayers = numPlayers
        self.players = [Player]
        for i in range(numPlayers):
            self.players.append(Player(playerIDs[i]))
        self.id = Game.gameId
        Game.gameId += 1


    # join game / add players to the game function
        

    def runGame(self):
        self.board = Board(self.numPlayers, self.players)


    # player draws the card from the pile returned from the socket
    def drawCard(self, playerID: str, drawType: str):

        if drawType == 'stock':
            for i in self.players:
                if i.id == playerID:
                    i.pickup(self.board.stockPile.draw())

        elif drawType == 'discard':
            for i in self.players:
                if i.id == playerID:
                    i.pickup(self.board.discardPile.pop())

    # player discards a card returned from the socket
    def discard(self, playerID: str, victim: Card):
        for i in self.players:
                if i.id == playerID:
                    i.discard(victim)
                    self.board.discardPile.append(victim)
        



# function to determine valid melds
# sorts the proposed set too
def isValidMeld(matchedSet: list[Card]) -> bool:
    if len(matchedSet) < 3:
        return False
    
    # sort the proposed meld
    matchedSet = sorted(matchedSet, key=lambda x: x.value)

    sequence = True
    pair = True     
    for i in range(1, len(matchedSet)):
        if (matchedSet[i - 1].value, matchedSet[i - 1].suit) == (matchedSet[i].value, matchedSet[i].suit):
            raise Exception("Same Card WTF")

        if pair: # checks for 3 or 4 of a kinds
            if matchedSet[i].value != matchedSet[i - 1].value:
                pair = False

        if sequence: # checks for sequences of the same suit
            if ((matchedSet[i - 1].value, matchedSet[i - 1].suit) != (matchedSet[i].value - 1, matchedSet[i].suit)):
                sequence = False

    if sequence or pair:
        return True
    else:
        return False

# Things on the board:
# 1. player hands ✓
# 2. stock/pickup pile ✓
# 3. discard pile (top card faceup) (stack implementation) ✓*1/2
# 4. melds / matched sets ✓*1/2
                
# Thoughts: class for the melds
# 1. 3 or 4 of a kind
# 2. Sequences of 3 or more
playerIDs = []

game = Board(Game(4, ["one", "two", "three", "four"]))
print(game.game.id)
game1 = Board(Game(4, ["one", "two", "three", "four"]))
print(game1.game.id)

