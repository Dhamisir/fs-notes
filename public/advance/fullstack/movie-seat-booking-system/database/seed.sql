USE movie_seat_booking;

INSERT IGNORE INTO users (id, name, email) VALUES
  (1, 'Rahul Verma', 'rahul@example.com'),
  (2, 'Priya Singh', 'priya@example.com'),
  (3, 'Kabir Khan', 'kabir@example.com');

INSERT IGNORE INTO movies (id, title, duration_minutes) VALUES
  (1, 'Avengers: Endgame', 181);

INSERT IGNORE INTO shows (id, movie_id, screen_name, show_time) VALUES
  (1, 1, 'Screen 1', '2026-09-20 19:00:00');

INSERT IGNORE INTO seats (id, show_id, seat_label, status) VALUES
  (1, 1, 'A1', 'AVAILABLE'),
  (2, 1, 'A2', 'AVAILABLE'),
  (3, 1, 'A3', 'AVAILABLE'),
  (4, 1, 'A4', 'AVAILABLE'),
  (5, 1, 'A5', 'AVAILABLE');
