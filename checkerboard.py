class Checker(object):
	def __init__(self, color, status = 1):
		self.color = color
		self.status = status
	
	def __str__(self):
		return self.color[0].upper() if self.status == 2 else self.color[0]

red_man = Checker("red")
black_man = Checker("black")
red_king = Checker("red", 2)
black_king = Checker("black", 2)
empty = " "

class Checkerboard(object):
	def __init__(self):
		self.spaces = [[empty for i in range(8)] for i in range(8)]
	
	def set_up_checkers(self):
		self.spaces[0][1] = red_man
		self.spaces[0][3] = red_man
		self.spaces[0][5] = red_man
		self.spaces[0][7] = red_man
		self.spaces[2][1] = red_man
		self.spaces[2][3] = red_man
		self.spaces[2][5] = red_man
		self.spaces[2][7] = red_man
		self.spaces[1][0] = red_man
		self.spaces[1][2] = red_man
		self.spaces[1][4] = red_man
		self.spaces[1][6] = red_man

		self.spaces[5][0] = black_man
		self.spaces[5][2] = black_man
		self.spaces[5][4] = black_man
		self.spaces[5][6] = black_man
		self.spaces[6][1] = black_man
		self.spaces[6][3] = black_man
		self.spaces[6][5] = black_man
		self.spaces[6][7] = black_man
		self.spaces[7][0] = black_man
		self.spaces[7][2] = black_man
		self.spaces[7][4] = black_man
		self.spaces[7][6] = black_man
	
	def print_board(self):
		print "  +-------------------------------+"
		for n, row in enumerate(self.spaces[:-1]):
			print str(8-n) + " | " + " | ".join([str(space) for space in row]) + " |"
			print "  |---+---+---+---+---+---+---+---|"
		print "1 | " + " | ".join([str(space) for space in self.spaces[-1]]) + " |"
		print "  +-------------------------------+"
		print "    " + "   ".join("abcdefgh")
	
	def item_at(self, col, row):
		return self.spaces[row][col]
	
	def set_item_at(self, item, col, row):
		self.spaces[row][col] = item
	
	def move_piece(self, origin_space, dest_space):
		self.set_item_at(self.item_at(*origin_space), *dest_space)
		self.set_item_at(empty, *origin_space)
	
	def diagonal_fwd(self, col, row):
		newrow = row - 1
		newcolL = col - 1
		newcolR = col + 1
		if newrow < 0:
			return []
		spaces = []
		if newcolL >= 0:
			spaces.append((newcolL, newrow))
		if newcolR <= 7:
			spaces.append((newcolR, newrow))
		return spaces

def str_to_coords(coords):
	return ("abcdefgh".index(coords[0]), 8 - int(coords[1]))

def black_turn(board):
	board.print_board()
	print "Black's turn."
	good = False
	while not good:
		piece_selected = False
		while not piece_selected:
			coord = raw_input("Select a piece to move: ")
			if len(coord) == 2 and coord[0] in "abcdefgh" and coord[1] in "12345678":
				coords = str_to_coords(coord)
				piece = board.item_at(*coords)
				if piece != empty and piece.color == "black":
					piece_selected = True
				else:
					print "Please select a black piece."
			else:
				print "Please enter a coordinate (letter then number)."
		spaces = [c for c in board.diagonal_fwd(*coords) if board.item_at(*c) == empty or board.item_at(*c).color != "black"]
		if len(spaces) == 0:
			print "That piece cannot move."
		else:
			if len(spaces) == 1:
				dest_space = spaces[0]
			elif len(spaces) == 2:
				dir_chosen = False
				while not dir_chosen:
					direction = raw_input("Move left or right? ").lower()
					if direction[0] in "lr":
						dir_chosen = True
				dest_space = spaces["lr".index(direction[0])]
			board.move_piece(coords, dest_space)
			good = True

board = Checkerboard()
board.set_up_checkers()
black_turn(board)
board.print_board()
