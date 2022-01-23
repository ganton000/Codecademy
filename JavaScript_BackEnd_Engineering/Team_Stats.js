/*
We want to create and extract information about your favorite sports team. 
Basketball, soccer, tennis, or water polo, you pick it. 
It’s your job to create data using the JavaScript data structures at your disposal: 
arrays, objects, etc.
Once created, you can manipulate these data structures as well as gain insights from them. 
For example, you might want to get the total number of games your team has played, 
or the average score of all of their games.
*/


const team = {
    _players: [],
    _games: [],
  
    get players(){
      return this._players;
    },
    get games(){
      return this._games;
    },
    set players(obj){
      this._players.push(obj);
    },
    set games(obj){
      this._games.push(obj);
    },
    addGamesToTeam(obj) {
      if (obj) {
        this.games = obj;
        }
      },
    addPlayersToTeam(obj) {
      if (obj){
        this.players = obj;
        }
      }
  };
  
  const monstGames = (opponent, teamPoints, opponentPoints) =>{
    return {
      opponent,
      teamPoints,
      opponentPoints
    }
  };
  
  let opponent_teams = ['Knicks', 'Jets','Lakers'];
  
  for (const opp_team of opponent_teams){
    team.addGamesToTeam(monstGames(opp_team, Math.floor(Math.random()*100 + 40), Math.floor(Math.random()*100 + 40)));
  };
  
  
  let players = [
    {firstName: 'Ariel',
    lastName: 'Adamas',
    age: 12
    },
    {firstName: 'Oskie',
    lastName: 'Escobar',
    age: 30},
    {firstName: 'Haroldo',
    lastName: 'Haroldus',
    age: 7}
  ];
  
  for (let player of players){
    team.addPlayersToTeam = player;
  };
  
  
  console.log(team)