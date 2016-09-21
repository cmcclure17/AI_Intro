var concorde = require('./TSP_utilities/concordeFileReader');
var agent = {};

// Locate each of the search agents that could be used
agent['brute'] = require('./Project1/brute');
agent['bfs'] = require('./Project2/bfs.js');
agent['dfs'] = require('./Project2/dfs.js');

// Process the user input data, and select the appropriate agent if that agent exists
var args = process.argv.slice(2);
if(!((args[0]) in agent))
{
  console.error('Unknown search agent:' + args[0] +'. Terminating process.');
}
console.log('Searching using \'' + args[0] + '\' agent');
var active_agent = agent[(args[0])];

// Check that the user specified file exists
var path = concorde.verify(args, active_agent.path());
// Parse the concorde file and extract the data
var data = concorde.readFile(path);

console.log(data.dimension + ' cities to path. \n')
var best_trial = active_agent.process(data);

if('route_simplest' in best_trial)
{
    console.log('Path with least nodes found:' + best_trial.route_simplest);
}
console.log('Optimal distance path found:' + best_trial.route_shortest);
console.log('Distance required to transverse:' + best_trial.distance);

// To run: node tsp.js agent_type file