\c connect_four;

INSERT INTO players (username, email, password, wins, losses, draws) VALUES
('PlayerOne', 'playerone@example.com', 'hashedpassword1', 10, 5, 2),
('PlayerTwo', 'playertwo@example.com', 'hashedpassword2', 15, 3, 4),
('PlayerThree', 'playerthree@example.com', 'hashedpassword3', 8, 7, 1),
('PlayerFour', 'playerfour@example.com', 'hashedpassword4', 20, 2, 5),
('PlayerFive', 'playerfive@example.com', 'hashedpassword5', 5, 10, 0),
('PlayerSix', 'playersix@example.com', 'hashedpassword6', 12, 8, 3),
('PlayerSeven', 'playerseven@example.com', 'hashedpassword7', 14, 6, 2),
('PlayerEight', 'playereight@example.com', 'hashedpassword8', 7, 9, 6),
('PlayerNine', 'playernine@example.com', 'hashedpassword9', 18, 4, 2),
('PlayerTen', 'playerten@example.com', 'hashedpassword10', 9, 11, 4);

INSERT INTO games (player1_id, player2_id, winner_id, status, start_time, end_time) VALUES
(1, 2, 1, 'completed', '2024-12-01 14:00:00', '2024-12-01 14:30:00'),
(3, 4, 4, 'completed', '2024-12-02 15:00:00', '2024-12-02 15:45:00'),
(1, 3, NULL, 'in_progress', '2024-12-10 10:00:00', NULL),
(2, 4, NULL, 'in_progress', '2024-12-10 11:00:00', NULL);

-- Insert sample game moves
INSERT INTO games_moves (game_id, player_id, move, move_time) VALUES
-- Moves for Game 1
(1, 1, 3, '2024-12-01 14:01:00'), -- Player 1 drops in column 3
(1, 2, 4, '2024-12-01 14:02:00'), -- Player 2 drops in column 4
(1, 1, 3, '2024-12-01 14:03:00'), -- Player 1 drops in column 3 again
(1, 2, 4, '2024-12-01 14:04:00'), -- Player 2 drops in column 4 again
(1, 1, 5, '2024-12-01 14:05:00'), -- Player 1 drops in column 5
(1, 1, 3, '2024-12-01 14:06:00'), -- Player 1 wins in column 3

-- Moves for Game 3 (in_progress)
(3, 1, 2, '2024-12-10 10:01:00'), -- Player 1 drops in column 2
(3, 3, 4, '2024-12-10 10:02:00'), -- Player 3 drops in column 4
(3, 1, 5, '2024-12-10 10:03:00'); -- Player 1 drops in column 5
