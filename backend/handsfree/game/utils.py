"""Game utils."""


def player_response_builder(current, player_dic):
    """"Build player response."""
    players = []
    for key in player_dic:
        if key != current:
            players.append(
                {
                    'displayName': player_dic[key]['displayName'],
                    'cardCount': len(player_dic[key]['hand']),
                    'playerOrder': player_dic[key].get('playerOrder', 0)
                })
    if players[-1].get('playerOrder') > player_dic[current].get('playerOrder'):
        while players[0].get('playerOrder') < player_dic[current].get('playerOrder'):
            players.append(players.pop(0))
    return players


def winner_points(player_dic, winner, game):  # winner = player uuid
    """Returns points of winner"""
    sum = 0
    for player in player_dic:
        if player != winner:
            for card in game["players"][player]["hand"]:
                if card.get('value') == 'A':
                    sum += 1
                elif card.get('value') in ['J', 'Q', 'K']:
                    sum += 10
                else:
                    sum += int(card.get('value'))
    return sum


def is_valid_meld(meld):
    """Verify meld is valid."""

    if len(meld) < 3:
        return False

    for card in meld:
        if card.get('value') == 'J':
            card['value'] = '11'
        elif card.get('value') == 'Q':
            card['value'] = '12'
        elif card.get('value') == 'K':
            card['value'] = '13'
        elif card.get('value') == 'A':
            card['value'] = '1'

    meld.sort(key=lambda card: int(card['value']))
    sequence = True
    pair = True
    for i in range(1, len(meld)):
        if (int(meld[i - 1].get('value')), meld[i - 1].get('suit')) == (
                int(meld[i].get('value')), meld[i].get('suit')):
            raise Exception("Same Card WTF")

        if pair:  # checks for 3 or 4 of a kinds
            if meld[i].get('value') != meld[i - 1].get('value'):
                pair = False

        if sequence:  # checks for sequences of the same suit
            if ((int(meld[i - 1].get('value')), meld[i - 1].get('suit')) != (
                    int(meld[i].get('value')) - 1, meld[i].get('suit'))):
                sequence = False

    # This is a crime
    for card in meld:
        if card.get('value') == '11':
            card['value'] = 'J'
        elif card.get('value') == '12':
            card['value'] = 'Q'
        elif card.get('value') == '13':
            card['value'] = 'K'
        elif card.get('value') == '1':
            card['value'] = 'A'

    if sequence or pair:
        return True
    else:
        return False

def deck_values_to_numbers(deck):
    """Convert deck to numbers."""
