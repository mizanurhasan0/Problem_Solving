// Problem: Mojo Simulation
/*
@input: An integer representing the initial number of mojos.
@output: An integer representing the total number of mojos after all possible exchanges.
*/
function mojoSimulation(input) {
    let mojos = input;
    let totalMojos = input;

    // Continue exchanging mojos while we have at least 3 mojos
    while (mojos >= 3) {
        let newMojos = Math.floor(mojos / 3); // Exchange number of mojos
        totalMojos += newMojos; // add to total mojos

        // Update mojos: remaining mojos + new mojos from exchange
        mojos = mojos % 3 + newMojos;
    }
    return totalMojos;
}

const initialMojos = 12; // Example initial of total mojos
const result = mojoSimulation(initialMojos); // function call with initial mojos
console.log(`Total = ${result || 0} Mojos consumed`);