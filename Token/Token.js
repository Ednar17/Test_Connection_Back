const express = require('express');
const jwt = require('jsonwebtoken')


const app = express();

/*****************************************************
 *                      GET
 *****************************************************/

exports.getTokenProtection = (req, res) => {
         console.log("Recu : GET /token/");
        jwt.verify(req.token,'my_secret_key',function(err,data){
            if(err){
                res.sendStatus(403);
            }else{
                res.json ({
                    text : 'this is protected',
                    data:data
                });
            }
        })
    
    };

/*****************************************************
 *                      POST
 *****************************************************/

exports.postTokenCreateToken = (req, res) => {
    console.log("Recu : POST /token/"+req.params.login);
    const login = req.body.login;
    const password = req.body.password;
  
    // Partie a modifier pour l'annuaire de la faculté 
    const users = [
      { login: 'Sami', password: 'bidule' },
      { login: 'Adam', password: 'bidule' },
      { login: 'Samuel', password: 'bidule' },
      { login: 'Bastien', password: 'bidule' },
    ];
  
    // Vérifier si les informations de connexion sont valides en parcourant le tableau d'utilisateurs
    const user = users.find(u => u.login === login && u.password === password);
  
   if (user) {
    const token = jwt.sign({ user }, 'my_secret_key');
    res.status(201).send({ token });
  } else {
    res.status(401).send('Identifiants invalides');
  }
}


/*****************************************************
 *                      Protection Token 
 *****************************************************/

  exports.ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader !== undefined && bearerHeader !== null) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(401);
    }
  }
