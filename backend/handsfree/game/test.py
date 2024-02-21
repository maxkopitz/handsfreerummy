import game as g

def test1():
    # Deal to 2 Players
    print("Dealing to 2 Players:")
    game1 = g.Game(2, ["Stephen", "Grandma"])
    game1.runGame()
    game1.print()

    # Deal to 4 Players
    print("Dealing to 4 Players:")
    game1 = g.Game(4, ["Stephen", "Grandma", "Prisha", "Four"])
    game1.runGame()
    game1.print()

def test2():
    # Valid Meld Tests
    valid_meld = [g.Card(10, 'hearts'), g.Card(8, 'hearts'), g.Card(9, 'hearts'), g.Card(7, 'hearts')]
    print("A player proposes the set of cards:")
    for i in valid_meld:
        print(i.retCard())
    print("isValidMeld: ", g.isValidMeld(valid_meld))

    invalid_meld = [g.Card(8, 'hearts'), g.Card(9, 'hearts'), g.Card(10, 'diamonds'), g.Card(11, 'hearts')]
    print("A player proposes the set of cards:")
    for i in invalid_meld:
        print(i.retCard())
    print("isValidMeld: ", g.isValidMeld(invalid_meld))
    
    print()

    valid_meld1 = [g.Card(2, 'hearts'), g.Card(2, 'spades'), g.Card(2, 'clubs')]
    print("A player proposes the set of cards:")
    for i in valid_meld1:
        print(i.retCard())
    print("isValidMeld: ", g.isValidMeld(valid_meld1))

    invalid_meld1 = [g.Card(2, 'hearts'), g.Card(4, 'spades'), g.Card(2, 'clubs')]
    print("A player proposes the set of cards:")
    for i in invalid_meld1:
        print(i.retCard())
    print("isValidMeld: ", g.isValidMeld(invalid_meld1))

def test3():
    deck = g.Deck()
    print(deck.order)
    discards = []
    for i in range(52):
        discards.append(deck.draw())
    deck.reverseDiscard(discards)
    print(deck.order)


def test4():
    game1 = g.Game(4, ["granny", "jesse", "kim", "steph"])
    game1.runGame()
    game1.formMeld("kim", [g.Card(8, 'hearts'), g.Card(9, 'hearts'), g.Card(10, 'hearts'), g.Card(11, 'hearts')])
    game1.formMeld("jesse", [g.Card(2, 'hearts'), g.Card(2, 'spades'), g.Card(2, 'clubs')])
    game1.formMeld("granny", [g.Card(8, 'hearts'), g.Card(9, 'hearts'), g.Card(10, 'clubs'), g.Card(11, 'hearts')])
    game1.addToMeld("steph", [g.Card(7, "hearts"), g.Card(12, "hearts")], 0)
    game1.addToMeld("steph", [g.Card(5, "hearts")], 0)
    
    for i in game1.melds:
        print(" ")
        for j in i:
            print(j)

test4()

