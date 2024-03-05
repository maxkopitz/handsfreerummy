from __future__ import annotations
from random import shuffle
import json


class Card:
    def __init__(self, value: int, suit: str):
        self.value = value
        self.suit = suit

    def retCard(self):
        return (self.value, self.suit)

    def retEnum(self) -> int:
        enum = 0
        match self.suit:
            case "hearts":
                enum += 0
            case "diamonds":
                enum += 13
            case "spades":
                enum += 26
            case "clubs":
                enum += 39
        return enum + self.value - 1

    def __str__(self):
        return '(' + self.suit + ', ' + str(self.value) + ')'


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
        for num in range(1, 14):
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

    # if the stock pile is empty, the discard pile will be turn upside down and then it becomes the
    # stock pile.
    def reverseDiscard(self, discardPile: list[Card]):

        while discardPile:  # while the discard pile is not empty
            # append the enumeration of the discard pile in queue order (reverse stack)
            card = discardPile.pop(0)
            self.order.append(card.retEnum())


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

    def sortHandValue(self):
        self.hand.sort(key=lambda x: (x.value, x.suit))

    def sortHandSuit(self):
        self.hand.sort(key=lambda x: (x.suit, x.value))

    def printHand(self):
        for i in self.hand:
            print(i.retCard())


class Board:

    def __init__(self, game, players):

        self.stockPile = Deck()  # the pile that the players draw from
        self.discardPile = []  # the pile that the players will discard to

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
    gameId = 1

    def __init__(self,
                 numPlayers=4,
                 players=[],
                 gameId=-1,
                 turnCounter=0,
                 melds=[],
                 gameState="lobby"
                 ):
        self.numPlayers = numPlayers
        self.players = players
        if gameId == -1:
            self.gameId = Game.gameId
            Game.gameId += 1
        else:
            self.gameId = gameId
        self.turnCounter = turnCounter
        self.melds = melds
        self.gameState = gameState

    def print(self):
        for i in self.players:
            print(i)

    # join game / add players to the game function
    def addPlayer(self, playerID: str):
        if self.numPlayers == len(self.players):
            # print("can't add a player")
            self.players.pop(0)
            self.players.append(Player(playerID))
        else:
            self.players.append(Player(str(playerID)))

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
        drawType = 'stock'  # or discard

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

        # check if player won

        # receive message of which card to discard

        # execute discarding of card and send message that turn is over

    def drawCard(self, playerID: str, drawType: str) -> Card:
        """player draws the card from the pile returned from the socket."""
        if drawType == 'stock':
            if not self.board.stockPile.order:
                self.board.stockPile.reverseDiscard(self.board.discardPile)
            for i in self.players:
                if i.id == playerID:
                    card = self.board.stockPile.draw()
                    i.pickup(card)
                    return card
        elif drawType == 'discard':
            if not self.board.discardPile:
                raise Exception("No discard Pile")
            for i in self.players:
                if i.id == playerID:
                    card = self.board.discardPile.pop()
                    i.pickup(card)
                    return card

    def discard(self, playerID: str, victim: Card):
        """player discards a card returned from the socket."""
        for i in self.players:
            if i.id == playerID:
                i.discard(victim)
                self.board.discardPile.append(victim)

    def formMeld(self, playerID: str, matchedSet: list[Card]):
        """meld formation"""
        if isValidMeld(matchedSet):
            self.melds.append(matchedSet)
            for i in self.players:
                if i.id == playerID:
                    for card in matchedSet:
                        i.discard(card)
        else:
            print("invalid meld")

    def addToMeld(self, playerID: str, matchedSet: list[Card], meldIndex: int):
        """player adds another card or couple of cards to a meld that has been
        played already."""
        tempMeld = self.melds[meldIndex] + matchedSet
        if isValidMeld(tempMeld):
            self.melds[meldIndex] += matchedSet
            self.melds[meldIndex].sort(key=lambda x: (x.value, x.suit))
            for i in self.players:
                if i.id == playerID:
                    for card in matchedSet:
                        i.discard(card)
        else:
            print("cards cannot be added to selected meld")

    @classmethod
    def from_json(cls, json_string):
        """Convert json to class."""
        json_dict = json.loads(json_string)
        return cls(**json_dict)


def isValidMeld(matchedSet: list[Card]) -> bool:
    """function to determine valid melds sorts the proposed set too."""
    if len(matchedSet) < 3:
        return False

    # sort the proposed meld
    matchedSet.sort(key=lambda x: x.value)

    sequence = True
    pair = True
    for i in range(1, len(matchedSet)):
        if (matchedSet[i - 1].value, matchedSet[i - 1].suit) == (matchedSet[i].value, matchedSet[i].suit):
            raise Exception("Same Card WTF")

        if pair:  # checks for 3 or 4 of a kinds
            if matchedSet[i].value != matchedSet[i - 1].value:
                pair = False

        if sequence:  # checks for sequences of the same suit
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


class GameEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Card):
            return o.retCard()
        if isinstance(o, Deck):
            return o.order
        if isinstance(o, Meld):
            return o.set
        if isinstance(o, Player):
            return o.__dict__
        if isinstance(o, Game):
            return o.__dict__
        if isinstance(o, Board):
            return o.__dict__
        return json.JSONEncoder.default(self, o)
