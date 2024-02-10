import random as rand

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
        rand.shuffle(self.order)
        
        # initialize deck to four arrays with 13 cards corresponding to each suit
        for num in range(1,14):
            self.hearts.append(Card(num, "hearts"))
            self.diamonds.append(Card(num, "diamonds"))
            self.spades.append(Card(num, "spades"))
            self.clubs.append(Card(num, "clubs"))
            
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

class Board:
    def __init__(self, numPlayers: int):
        
        # When two people play, each person gets 10 cards. When three or four people play, 
        # each receives seven cards; when five or six play, each receives six cards
        self.hands = [[] for i in range(numPlayers)]
        drawPile = Deck() # the pile that the players draw from
        print(drawPile.order)
        self.numPlayers = numPlayers
        # deals the cards to each player's hand
        if numPlayers == 2:
            for i in range(10):
                self.hands[0].append(drawPile.draw())
                self.hands[1].append(drawPile.draw())
        elif numPlayers < 5:
            for i in range(7):
                for player in range(numPlayers):
                    self.hands[player].append(drawPile.draw())
        else:
            for i in range(6):
                for player in range(numPlayers):
                    self.hands[player].append(drawPile.draw())

    def print(self):
        num = 1
        for i in self.hands:
            print("Hand ", num, ":")
            num += 1
            for j in i:
                print(j.retCard())


obj2 = Board(6)

obj2.print()





    