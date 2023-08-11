/* eslint-disable linebreak-style */
var express = require('express');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const session = require('express-session');
require('dotenv').config();
var router = express.Router();
var activeUsers = {};

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId: "440226071068-7tr2enamec6mrrjp0tvvo6bets39id3i.apps.googleusercontent.com",
    clientSecret: "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"
  }
});

const connectDatabase = (req, res, next) => {
  // Acquire a connection from the pool
  // eslint-disable-next-line consistent-return
  req.pool.getConnection((err, connection) => {
    if (err) {
      // Handle connection error
      // eslint-disable-next-line no-console
      console.error('Error acquiring database connection:', err);
      return next(err);
    }

    // Attach the database connection to the request object
    req.dbConnection = connection;

    // Pass control to the next middleware or route handler
    next();
  });
};

router.use(connectDatabase);


// eslint-disable-next-line consistent-return
function requireLogin(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  if (req.session && req.session.googleUser) {

    const currentTime = Date.now() / 1000;
    // eslint-disable-next-line no-undef
    if (decoded.exp > currentTime) {
      // check if JWT token expired or not
      // if still valid -> login
      return next();
    }
    res.redirect('/login');

  } else {
    res.redirect('/login');
  }
}

function requireLoginAdmin(req, res, next) {
  if (req.session && req.session.authenticated && req.session.is_admin) {
    return next();
  }
  if (req.session && req.session.googleUser) {

    const currentTime = Date.now() / 1000;
    // eslint-disable-next-line no-undef
    if (decoded.exp > currentTime) {
      // check if JWT token expired or not
      // if still valid -> login
      return next();
    }
    res.redirect('/login');

  } else {
    res.redirect('/login');
  }
}

// eslint-disable-next-line consistent-return
function checkLoggedIn(req, res, next) {
  if (req.session && req.session.authenticated) {
    res.redirect('/user');
    return;
  }
  next();
}

// database connection example
var connection;
var email;
var password;
var authenticated;
var sql;
var saltRounds = 10;
var clubName;
var clubCategory;
var clubDescription;
var id;
var eventName;
var eventCategory;
var eventDescription;
var eventLocation;
var eventstart_time;
var eventend_time;
var CreatorId;
var ClubId;
var UserId;
var thumbnail;
var eventThumbnail;
var deleteEmail;
var PromoteEmail;
var deleteName;
var clubAvatar;

var notification;
var is_public;
var time;
const refreshToken = process.env.REFRESH_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;

router.get('/', checkLoggedIn, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/index.html');
});


router.get('/user', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/user.html');
});

router.get('/admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/admin.html');
});

router.get('/admin_users', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/admin_users.html');
});

router.get('/admin_clubs', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/admin_clubs.html');
});

router.get('/login', function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/login.html');
});

router.get('/signup', function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/signup.html');
});

router.get('/feed', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/feed.html');
});

router.get('/feed_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/feed_admin.html');
});

router.get('/club', checkLoggedIn, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club.html');
});

router.get('/club_user', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_user.html');
});

router.get('/club_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_admin.html');
});

router.get('/event', checkLoggedIn, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event.html');
});

router.get('/profile', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/profile.html');
});

router.get('/club_profile', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_profile.html');
});

router.get('/club_profile_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_profile_admin.html');
});

router.get('/event_profile', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_profile.html');
});

router.get('/event_profile_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_profile_admin.html');
});

router.get('/event_user', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_user.html');
});

router.get('/event_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_admin.html');
});

router.get('/club_create', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_create.html');
});

router.get('/event_create', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_create.html');
});

router.get('/club_create_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/club_create_admin.html');
});

router.get('/event_create_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/event_create_admin.html');
});

router.get('/post_create', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/post_create.html');
});

router.get('/post_create_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/post_create_admin.html');
});

router.get('/admin_event_profile', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/admin_event_profile.html');
});

router.get('/edit_club_profile', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/edit_club_profile.html');
});

router.get('/edit_event_profile', requireLogin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/edit_event_profile.html');
});

router.get('/edit_club_profile_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/edit_club_profile_admin.html');
});

router.get('/edit_event_profile_admin', requireLoginAdmin, function(req, res) {
  res.sendFile('/workspaces/23S1_WDC_UG063_Red_Devils/public/edit_event_profile_admin.html');
});



router.post('/logout', requireLogin, function(req, res){
  req.session.authenticated = false;
  delete activeUsers[req.session.email];
  req.session.destroy();
  res.redirect('/login');
});


router.post('/login', function(req, res){
  email = req.body.email;
  password = req.body.password;
  authenticated = req.body.authenticated;
  if (req.session.email && activeUsers[req.session.email]) {
      res.redirect('/');
      return;
  }
  if (authenticated) {
    req.session.authenticated = true;
    req.session.email = email;
    activeUsers[email] = true;
    sql = `SELECT * FROM Users WHERE email = ?`;
    connection = req.dbConnection;
    connection.query(sql, [email], (error, results, fields) => {
      connection.release();
      if (results.length > 0) {
        req.session.user_id = results[0].id;
        res.redirect('/user');
      } else {
          sql = `INSERT INTO Users(email, password) VALUES (?, ?)`;
          connection.query(sql, [email, "@#@!(#*@)$#*$)(#@$*)@(#*@)#!@)(#"], (error_log, result, field) => {
            connection.release();
            if (error_log) {
              res.sendStatus(500);
              return;
            }
            // eslint-disable-next-line no-console
            console.log(`New user ${email} created`);
          });

          // Search for user_id
          var user_id;
          sql = `SELECT * FROM Users WHERE email = ?`;
          connection.query(sql, [email], (error_log, result, field) => {
            connection.release();
            if (error_log) {
              res.sendStatus(500);
              return;
            }
            user_id = result[0].id;
            req.session.user_id = user_id;
            req.session.is_admin = results[0].is_admin;
            // Insert new profile into database
            let query = `INSERT INTO Profiles(user_id) VALUES (?)`;
            connection.query(query, [user_id], (insert_err, insert_res, f) => {
              connection.release();
              if (insert_err) {
                res.sendStatus(500);
              }
            });
          });
          res.redirect('/user');
      }
    });
  } else {
    sql = `SELECT * FROM Users WHERE email = ?;`;
    connection = req.dbConnection;
    connection.query(sql, [email], (error, results, fields) => {
      connection.release();
      if (error) throw error;
      if (results.length === 0) {
        res.redirect('/login');
      } else {
        const hashedPassword = results[0].password;
        id = results[0].id;
        bcrypt.compare(password, hashedPassword, function(err, result) {
          if (result) {
            req.session.authenticated = true;
            req.session.email = email;
            req.session.user = id;
            activeUsers[email] = true;
            req.session.user_id = results[0].id;
            req.session.is_admin = results[0].is_admin;
            if (results[0].is_admin === 0) {
              res.redirect('/user');
            } else {
              res.redirect('/admin');
            }
          } else {
            res.redirect('/login');
          }
        });
      }
    });
  }
  });


router.post('/signup', function(req, res){
  email = req.body.email;
  password = req.body.password;
  // eslint-disable-next-line prefer-destructuring
  let name = req.body.name;
  // Check if user already exists in database
  sql = `SELECT * FROM Users WHERE email = ?`;
  connection = req.dbConnection;
  connection.query(sql, [email], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      return;
    }
    if (results.length > 0) {
      // console.log(`User with email ${email} already exists`);
      res.redirect('/signup');
    } else {
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) throw err;
        // Insert new user into database
        const userQuery = `INSERT INTO Users (email, password) VALUES (?, ?)`;
        const profileQuery = `INSERT INTO Profiles (user_id, name) VALUES (?, ?)`;

        connection.query(userQuery, [email, hashedPassword], (error1, userResult) => {
          connection.release();
          if (error1) {
            throw error1;
          } else {
            const userId = userResult.insertId; // Get the last inserted ID from the Users table

            connection.query(profileQuery, [userId, name], (error2, profileResult) => {
              if (error2) {
                throw error2;
              } else {
                res.redirect('/login');
              }
            });
          }
        });

      });
    }
  });
});

router.get('/profile_info', requireLogin, function(req, res) {
  connection = req.dbConnection;
  id = req.session.user_id;
  sql = `SELECT * FROM Profiles WHERE user_id = ?`;
  connection.query(sql, [id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

router.get('/fetch_profileEvents', function(req, res) {
  connection = req.dbConnection;
  id = req.session.user_id;
  sql = `SELECT e.id, e.name, e.description, e.thumbnail
  FROM Events e
  INNER JOIN RSVPs r ON e.id = r.event_id
  WHERE r.participant_id = ?`;
  connection.query(sql, [id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

router.get('/fetch_profileClubs', function(req, res) {
  connection = req.dbConnection;
  id = req.session.user_id;
  sql = `SELECT c.id, c.name, c.description, c.thumbnail
  FROM Clubs c
  INNER JOIN Memberships m ON c.id = m.club_id
  WHERE m.member_id = ?`;
  connection.query(sql, [id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

router.post('/club_added', function(req, res) {
  clubName = req.body.name;
  clubDescription = req.body.description;
  clubCategory = req.body.category;
  thumbnail = req.body.thumbnail;
  const managerId = req.session.user_id;
  sql = `INSERT INTO Clubs (name, description, category, location, manager_id, thumbnail) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [clubName, clubDescription, clubCategory, 'Adelaide', managerId, thumbnail];

  // eslint-disable-next-line consistent-return
  connection.query(sql, values, (err_club, result_club, field_club) => {
    connection.release();
    if (err_club) {
      // eslint-disable-next-line no-console
      console.error(err_club);
      return res.status(500).send('Error creating club');
    }

    const newClubId = result_club.insertId;
    // eslint-disable-next-line no-console
    console.log(`New club ${clubName} created with ID ${newClubId}`);

    let query = "INSERT INTO Memberships(club_id, member_id) VALUES (?, ?)";
    // eslint-disable-next-line consistent-return
    connection.query(query, [newClubId, managerId], (err_join, result_join) => {
      connection.release();
      if (err_join) {
        // eslint-disable-next-line no-console
        console.error(err_join);
        res.status(500).send('Error joining club');
      } else {
        res.sendStatus(200);
      }
      // eslint-disable-next-line no-console
      // console.log('Joining is successful');
    });
  });
});


router.post('/event_added', function(req, res) {
  eventName = req.body.eventName;
  eventstart_time = req.body.eventstart_time;
  eventend_time = req.body.eventend_time;
  eventLocation = req.body.eventLocation;
  eventDescription = req.body.eventDescription;
  eventCategory = req.body.eventCategory;
  CreatorId = req.session.user;
  ClubId = req.query.id;
  eventThumbnail = req.body.eventThumbnail;

  connection = req.dbConnection;
  sql = `SELECT
          c.name as name, u.email as email
         FROM
          Memberships m
         JOIN
          Users u ON u.id = m.member_id
         JOIN
          Clubs c ON c.id = m.club_id
         WHERE
          m.club_id = ? AND m.mail_noti_event = 1`;
  connection.query(sql, [req.query.id], function(err, result, field) {
    connection.release();
    if (err) {
      // eslint-disable-next-line no-console
      throw err;
    } else {
      for (let i = 0; i < result.length; i++) {
        transporter.sendMail({
          from: "quangnguyentechno@gmail.com",
          to: result[i].email,
          subject: "Universe new events",
          text: "Hi there, There is a brand new event from " + result[i].name + " called as " + eventDescription
                + ". This event will start at: " + eventstart_time + " and end at: " + eventend_time
                + "and it will be located at: " + eventLocation + ". Please come and join us if you are interested",
          auth: {
            user: "quangnguyentechno@gmail.com",
            refreshToken: refreshToken,
            accessToken: accessToken
          }
        });
      }
    }
  });

  sql = `INSERT INTO Events (name, start_time, end_time, location, description, category, creator_id, club_id, thumbnail) VALUES ('${eventName}', '${eventstart_time}', '${eventend_time}', '${eventLocation}', '${eventDescription}', '${eventCategory}', '${CreatorId}', '${ClubId}', '${eventThumbnail}')`;
  connection.query(sql, function(err4, result4, field4) {
    connection.release();
    if (err4) {
      // eslint-disable-next-line no-console
      res.status(500).send('An error occurred while creating the event');
    } else {
      res.status(200).send('Event created successfully');
    }
  });
});

router.post('/edit_event', function(req, res) {
    const eventId = req.query.id;
    eventName = req.body.eventName;
    eventstart_time = req.body.eventstart_time;
    eventend_time = req.body.eventend_time;
    eventLocation = req.body.eventLocation;
    eventDescription = req.body.eventDescription;
    eventCategory = req.body.eventCategory;
    eventThumbnail = req.body.eventThumbnail;

    sql =
    `UPDATE Events
    SET name = ?,
      start_time = ?,
      end_time = ?,
      location = ?,
      description = ?,
      category = ?,
      thumbnail = ?
    WHERE id = ?;`;

    connection = req.dbConnection;
    connection.query(sql, [eventName, eventstart_time, eventend_time, eventLocation, eventDescription, eventCategory, eventThumbnail, eventId], function(err4, result4, field4) {
      connection.release();
      if (err4) {
        res.status(500).send('An error occurred while editing the event');
      } else {
        res.status(200).send('Event edited successfully');
      }
    });
});

router.post('/edit_club', function(req, res) {
  const clubid = req.query.id;
  clubName = req.body.clubName;
  clubDescription = req.body.clubDescription;
  clubCategory = req.body.clubCategory;
  clubAvatar = req.body.clubAvatar;

  sql = `
  UPDATE Clubs
  SET name = ?,
      description = ?,
      category = ?,
      thumbnail = ?
  WHERE id = ?;
  `;

  connection = req.dbConnection;
  connection.query(sql, [clubName, clubDescription, clubCategory, clubAvatar, clubid], function(err4, result4, field4) {
    connection.release();
    if (err4) {
      res.status(500).send('An error occurred while editing the club');
    } else {
      res.status(200).send('Event edited successfully');
    }
  });
});


router.post('/profile_info', requireLogin, function(req, res) {
  connection = req.dbConnection;
  id = req.session.user_id;
  const info = req.body;
  sql = `UPDATE Profiles SET name = ?, phone = ?, address_line_1 = ?, address_line_2 = ?, city = ?,
  state = ?, zipcode = ?, country = ?, school = ?, degree = ?, student_id = ?, hobbies = ?, bio = ?
  WHERE user_id = ?`;
  const values = [info.name, info.phone, info.address_line_1, info.address_line_2,
  info.city, info.state, info.zipcode, info.country, info.school, info.degree, info.student_id,
  info.hobbies, info.bio, id];
  // console.log(post);
  connection.query(sql, values, (error, results, fields) => {
    connection.release();
    if (error) { res.sendStatus(500); }
    res.json(results);
  });
});

router.post('/fetch_users', function(req, res){
    connection = req.dbConnection;
    let emails;
    let admins;
    let num_clubs;
    let ids;
    let total_ids;
    const obj = {};

    sql = `SELECT id, email, is_admin from Users`;
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        emails = results.map((row) => row.email);
        admins = results.map((row) => (row.is_admin ? "admin" : "user"));
        total_ids = results.map((row) => row.id);
      }
    });

    sql = `select member_id, COUNT(*) as num_clubs from Memberships GROUP BY member_id;`;
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        num_clubs = results.map((row) => row.num_clubs);
        ids = results.map((row) => row.member_id);
        // make a object with key as ids and value as num_clubs
        for (let i = 0; i < ids.length; i++) {
          obj[ids[i]] = num_clubs[i];
        }
      }
      res.json({ emails, admins, num_clubs, ids, obj, total_ids });
    });
});


router.post('/set_admin', function(req, res){
  connection = req.dbConnection;
  PromoteEmail = req.body.PromoteEmail;
  sql = `UPDATE Users SET is_admin = 1 WHERE email = ?`;
  connection.query(sql, PromoteEmail, (error, results, fields) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        // eslint-disable-next-line no-console
        console.log("Successfully update user to admin");
      }
  });
});

router.post('/delete_user', function(req, res){
    connection = req.dbConnection;
    deleteEmail = req.body.deleteEmail;
    sql = `DELETE FROM Users WHERE email = ?`;
    connection.query(sql, deleteEmail, (error, results, fields) => {
        connection.release();
        if (error) {
          throw error;
        } else {
          // eslint-disable-next-line no-console
          console.log("Successfully delete user");
        }
    });
});

router.post('/delete_club', function(req, res){
  connection = req.dbConnection;
  deleteName = req.body.deleteName;
  sql = `DELETE FROM Clubs WHERE name = ?`;
  connection.query(sql, deleteName, (error, results, fields) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        // eslint-disable-next-line no-console
        console.log("Successfully delete club");
      }
  });
});

router.get('/fetch_events', function(req, res){
  connection = req.dbConnection;
  sql = `
  SELECT e.*,
    CASE WHEN r.event_id IS NOT NULL THEN 1 ELSE 0 END AS is_participant,
    (
      SELECT COUNT(*) FROM RSVPs r2 WHERE r2.event_id = e.id
    ) AS attendees
  FROM Events e
  LEFT JOIN RSVPs r ON e.id = r.event_id AND r.participant_id = ?
  GROUP BY e.id`;
  connection.query(sql, [req.session.user_id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/fetch_clubs', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT c.*,
    CASE WHEN m.club_id IS NOT NULL THEN 1 ELSE 0 END AS is_member,
    (
      SELECT COUNT(*) FROM Memberships m2 WHERE m2.club_id = c.id
    ) AS members
  FROM Clubs c
  LEFT JOIN Memberships m ON c.id = m.club_id AND m.member_id = ?
  GROUP BY c.id`;
  connection.query(sql, [req.session.user_id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.post('/fetch_clubs_admin', function(req, res){
  connection = req.dbConnection;
  sql = `SELECT name, description, thumbnail from Clubs`;
  connection.query(sql, (error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      const name = results.map((row) => row.name);
      const description = results.map((row) => row.description);
      const thumbnails = results.map((row) => row.thumbnail);
      res.json({ name, description, thumbnails });
    }
  });
});


router.post('/join_club', function(req, res) {
  connection = req.dbConnection;
  sql = "INSERT INTO Memberships VALUES (?, ?, ?, ?)";
  connection.query(sql, [req.body.club_id, req.session.user_id, 0, 0], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/join_event', function(req, res) {
  connection = req.dbConnection;
  sql = "INSERT INTO RSVPs VALUES (?, ?)";
  connection.query(sql, [req.body.event_id, req.session.user_id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/post_added', function(req, res) {
  connection = req.dbConnection;
  notification = req.body.content;
  is_public = req.body.preference;
  time = req.body.time;
  CreatorId = req.session.user_id;
  ClubId = req.query.id;
  if (is_public === "public") {
    is_public = 1;
  } else {
    is_public = 0;
  }

  sql = `SELECT
          c.name as name,  u.email as email
         FROM
          Memberships m
         JOIN
          Users u ON u.id = m.member_id
         JOIN
          Clubs c ON c.id = m.club_id
         WHERE
          m.club_id = ? AND m.mail_noti_update = 1`;
  connection.query(sql, [req.query.id], function(err, result, field) {
    connection.release();
    if (err) {
      // eslint-disable-next-line no-console
      throw err;
    } else {
      for (let i = 0; i < result.length; i++) {
        transporter.sendMail({
          from: "quangnguyentechno@gmail.com",
          to: result[i].email,
          subject: "Universe updates",
          text: "Hi, there is an update from " + result[i].name + ". Please check it out at universe.com.au",
          auth: {
            user: "quangnguyentechno@gmail.com",
            refreshToken: refreshToken,
            accessToken: accessToken
          }
        });
      }
    }
  });

  sql = `INSERT INTO Updates (text, is_public, time_created, creator_id,  club_id) VALUES ('${notification}', '${is_public}', '${time}', '${CreatorId}', '${ClubId}')`;
  connection.query(sql, (error, results, fields) => {
    connection.release();
    if(error) {
      throw error;
    } else {
      res.status(200).send('Update created successfully');
    }
  });
});

router.get('/fetch_eventsProfile', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT e.id, e.name, e.start_time, e.location, e.thumbnail, e.category, e.description,
    CASE WHEN r.event_id IS NOT NULL THEN 1 ELSE 0 END AS is_participant,
    (
      SELECT COUNT(*) FROM RSVPs r2 WHERE r2.event_id = e.id
    ) AS attendees,
    CASE WHEN e.creator_id = ? THEN 1 ELSE 0 END AS is_admin
  FROM Events e
  LEFT JOIN RSVPs r ON e.id = r.event_id AND r.participant_id = ?
  WHERE e.id = ?
  GROUP BY e.id`;
  connection.query(
                  sql,
                  [req.session.user_id, req.session.user_id, req.query.id],
                  (error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      if (results.length > 0 && req.session.is_admin === 1) {
        // eslint-disable-next-line no-param-reassign
        results[0].is_admin = 1;
      }
      res.json(results);
    }
  }
);
});

router.get('/fetch_eventsClub', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT c.id, c.name, c.description, c.location, c.thumbnail,
    (
      SELECT COUNT(*) FROM Memberships m2 WHERE m2.club_id = c.id
    ) AS members,
    CASE WHEN m.member_id IS NOT NULL THEN 1 ELSE 0 END AS is_member
  FROM Clubs c
  LEFT JOIN Memberships m ON c.id = m.club_id AND m.member_id = ?
  INNER JOIN Events e ON c.id = e.club_id
  WHERE e.id = ?
  GROUP BY c.id`;
  connection.query(sql, [req.session.user_id, req.query.id],(error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/fetch_members', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT u.email,
    CASE WHEN p.name IS NOT NULL THEN p.name ELSE ' ' END AS name
  FROM Users u
  INNER JOIN Memberships m ON m.member_id = u.id
  INNER JOIN Clubs c ON c.id = m.club_id
  LEFT JOIN Profiles p ON p.user_id = u.id
  WHERE c.id = ?`;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/fetch_rsvps', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT u.email,
    CASE WHEN p.name IS NOT NULL THEN p.name ELSE ' ' END AS name
  FROM Users u
  INNER JOIN RSVPs r ON r.participant_id = u.id
  INNER JOIN Events e ON e.id = r.event_id
  LEFT JOIN Profiles p ON p.user_id = u.id
  WHERE e.id = ?`;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});

router.get('/fetch_clubsProfile', function(req, res) {
  connection = req.dbConnection;
  sql = `
  SELECT c.id, c.name, c.description, c.location, c.thumbnail,
    (
      SELECT COUNT(*) FROM Memberships m2 WHERE m2.club_id = c.id
    ) AS members,
    CASE WHEN m.member_id IS NOT NULL THEN 1 ELSE 0 END AS is_member,
    (
      SELECT COUNT(*) FROM Events e2 WHERE e2.club_id = c.id
    ) AS event_counts,
    CASE WHEN c.manager_id = ? THEN 1 ELSE 0 END AS is_admin,
    m.mail_noti_event, m.mail_noti_update
  FROM Clubs c
  LEFT JOIN Memberships m ON c.id = m.club_id AND m.member_id = ?
  LEFT JOIN Events e ON c.id = e.club_id
  WHERE c.id = ?
  GROUP BY c.id`;
  connection.query(
                  sql,
                  [req.session.user_id, req.session.user_id, req.query.id],
                  (error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    }
    if (results.length > 0 && req.session.is_admin === 1) {
      // eslint-disable-next-line no-param-reassign
      results[0].is_admin = 1;
    }
    res.json(results);
  }
);
});

router.get('/fetch_clubevents', function(req, res){
  connection = req.dbConnection;
  sql = `
  SELECT e.id, e.name, e.start_time, e.location, e.thumbnail,
    CASE WHEN r.event_id IS NOT NULL THEN 1 ELSE 0 END AS is_participant,
    (
      SELECT COUNT(*) FROM RSVPs r2 WHERE r2.event_id = e.id
    ) AS attendees
  FROM Events e
  LEFT JOIN RSVPs r ON e.id = r.event_id AND r.participant_id = ?
  WHERE e.club_id = ?
  GROUP BY e.id`;
  connection.query(sql, [req.session.user_id, req.query.id],(error, results, fields) => {
    connection.release();
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});


router.post('/signup_noti', function(req, res) {
  // eslint-disable-next-line prefer-destructuring
  const club_name = req.body.club_name;
  transporter.sendMail({
    from: "quangnguyentechno@gmail.com",
    to: req.session.email,
    subject: "Universe Club Subsciprtion",
    text: "Hi there, you have just subcribed to " + club_name + ". You will receive notifications from us about new events from now on. Thank you for your interest in our club.",
    auth: {
      user: "quangnguyentechno@gmail.com",
      refreshToken: refreshToken,
      accessToken: accessToken
    }
  });

  connection = req.dbConnection;
  sql = `UPDATE  Memberships
         SET mail_noti_event = 1
         WHERE club_id = ?;
        `;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    }
  });

  sql = `SELECT mail_noti_event from Memberships
         WHERE club_id = ?
        `;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.json({ mail_noti: results[0].mail_noti_event });
    }
  });
});

router.post('/signup_noti_update', function(req, res) {
  // eslint-disable-next-line prefer-destructuring
  const club_name = req.body.club_name;
  transporter.sendMail({
    from: "quangnguyentechno@gmail.com",
    to: req.session.email,
    subject: "Universe Club Subsciprtion",
    text: "Hi there, you have just subcribed to " + club_name + ". You will receive notifications from us about new updates from now on. Thank you for your interest in our club.",
    auth: {
      user: "quangnguyentechno@gmail.com",
      refreshToken: refreshToken,
      accessToken: accessToken
    }
  });

  connection = req.dbConnection;
  sql = `UPDATE  Memberships
         SET mail_noti_update = 1
         WHERE club_id = ?;
        `;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    }
  });

  sql = `SELECT mail_noti_update from Memberships
         WHERE club_id = ?
        `;
  connection.query(sql, [req.query.id], (error, results, fields) => {
    connection.release();
    if (error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.json({ mail_noti_update: results[0].mail_noti_update });
    }
  });
});

router.get('/fetch_all_clubs_posts', function(req, res) {
  connection = req.dbConnection;
  sql = `
    SELECT f.*, c.name, c.thumbnail,
    CASE WHEN l.user_id IS NOT NULL THEN 1 ELSE 0 END AS is_liked
    FROM Updates f
    JOIN Clubs c on f.club_id = c.id
    LEFT JOIN Likes l ON f.id = l.post_id AND l.user_id = ?
    WHERE f.is_public = 1
    ORDER BY f.time_created DESC
    LIMIT 5;
  `;
  connection.query(sql, [req.session.user_id], function(error, results, fields) {
    connection.release();
    if(error) {
      res.sendStatus(500);
      throw error;
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});

router.get('/fetch_my_clubs_posts', function(req, res) {
  connection = req.dbConnection;
  UserId = req.session.user_id;
  sql = `
    SELECT f.*, c.name, c.thumbnail,
    CASE WHEN l.user_id IS NOT NULL THEN 1 ELSE 0 END AS is_liked
    FROM Updates f
    JOIN Clubs c on f.club_id = c.id
    LEFT JOIN Likes l ON f.id = l.post_id AND l.user_id = ?
    WHERE f.club_id IN (SELECT m.club_id FROM Memberships m WHERE m.member_id = ?)
    ORDER BY f.time_created DESC
    LIMIT 5;
  `;
  connection.query(sql, [UserId, UserId], function(error, results, fields) {
    connection.release();
    if(error) {
      res.sendStatus(500);
      throw error;
    } else {
      res.json(results);
    }
  });
});


router.post('/like_post', function(req, res) {
  connection = req.dbConnection;
  const PostId = req.body.id;
  UserId = req.session.user_id;
  sql = `
    SELECT COUNT(*) AS likes FROM Likes WHERE post_id = ? AND user_id = ?;
  `;
  connection.query(sql, [PostId, UserId], function(error, results, fields) {
    connection.release();
    if(error) {
      res.sendStatus(500);
      throw error;
    } else {
      // eslint-disable-next-line prefer-destructuring
      const likes = results[0].likes;
      var sql2;
      if(likes) {
        sql2 = `DELETE FROM Likes WHERE post_id = ? AND user_id = ?;`;
      } else {
        sql2 = `INSERT INTO Likes (post_id, user_id) VALUES (?, ?)`;
      }
      connection.query(sql2, [PostId, UserId], function(error2, results2, fields2) {
        connection.release();
        if(error2) {
          res.sendStatus(500);
          throw error2;
        } else {
          var sql3 = `UPDATE Updates SET likes = (SELECT COUNT(*) FROM Likes WHERE post_id = ?) WHERE id = ?;`;
          connection.query(sql3, [PostId, PostId], function(error3, results3, fields3) {
            connection.release();
            if(error3) {
              res.sendStatus(500);
              throw error3;
            } else {
              res.status(200).send('Post liked successfully');
            }
          });
        }
      });
    }
  });
});


module.exports = router;
