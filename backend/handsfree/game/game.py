from __future__ import annotations
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

    def printHand(self):
        for i in self.hand:
            print(i.retCard())

class Board:

    def __init__(self, game, players):
        

        self.stockPile = Deck() # the pile that the players draw from
        self.discardPile = [] # the pile that the players will discard to
    
        # deals the cards to each player's hand
        # When two people play, each person gets 10 cards. When three or four people play, 
        # each receives seven cards; when five or six play, each receives six cards
        if game.numPlayers == 2:
            for i in range(10):
                for player in players:
                    player.pickup(self.stockPile.draw())
        elif game.numPlayers < 5:
            for i in range(7):
                for player in players:
                    player.pickup(self.stockPile.draw())
        else:
            for i in range(6):
                for player in game.players:
                    player.pickup(self.stockPile.draw())
            
# numPlayers, players, id, turnCounter, melds, gameState, board
class Game:
    gameId = 0
    def __init__(self, numPlayers: int, playerIDs: list[str]) -> None:
        # initialize the players array with their ids
        self.numPlayers = numPlayers
        self.players = []
        for i in range(len(playerIDs)):
            self.players.append(Player(playerIDs[i]))
        self.id = Game.gameId
        Game.gameId += 1
        self.turnCounter = 0
        self.melds = []
        self.gameState = "lobby"

    def print(self):
        for i in self.players:
            print("Player ", i.id, ":")
            for j in i.hand:
                print(j.retCard())
            print("")

    # join game / add players to the game function 
    def addPlayer(self, playerID: str):
        if self.numPlayers == len(self.players):
            #print("can't add a player")
            self.players.pop(0)
            self.players.append(Player(playerID))
        else:
            self.players.append(Player(playerID))

        # self.numPlayers += 1
    
    # initialize the board and run through each turn until someone runs out of cards     
    def runGame(self):
        if len(self.players) < 2:
            print("not enough players")
            return
        self.numPlayers = len(self.players)
        self.gameState = "inGame"
        self.board = Board(self, self.players)
        # while True:
        #     self.takeTurn(self.players[self.turnCounter % self.numPlayers].id)
        #     self.turnCounter += 1

    def takeTurn(self, playerID: str):
        # Send message of Player's turn

        # Receive message of what pile player draws from
        drawType = 'stock' # or discard
        
        # send message of what card player received / execute drawing
        cardDrawn = self.drawCard(playerID, drawType)
        print(cardDrawn.retCard())
        
        # receive message of what cards to lay off (meld forming)
        # send message of valid play / execute play
        message = []
        if isValidMeld(message):
            self.melds.append(Meld(message))
        else:            
            print("bad Meld")
        # receive a message of which meld to add to and which card(s)
        # send message of valid play / execute play
        
        # receive message of which card to discard

        # execute discarding of card and send message that turn is over
        

    # player draws the card from the pile returned from the socket
    def drawCard(self, playerID: str, drawType: str) -> Card:

        if drawType == 'stock':
            #if self.stockPile.order.empty():
                #self.stockPile
            #else
            for i in self.players:
                if i.id == playerID:
                    card = self.board.stockPile.draw()
                    i.pickup(card)
                    return card

        elif drawType == 'discard':
            for i in self.players:
                if i.id == playerID:
                    card = self.board.discardPile.pop()
                    i.pickup(card)
                    return card

    # player discards a card returned from the socket
    def discard(self, playerID: str, victim: Card):
        for i in self.players:
                if i.id == playerID:
                    i.discard(victim)
                    self.board.discardPile.append(victim)

    # meld formation 
        



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
                