import { Calculator } from '../types/calculator';

// Sports Calculators (8 total)
export const sportsCalculators: Calculator[] = [
  {
    id: 'fantasy-sports-points',
    title: 'Fantasy Sports Points Calculator',
    description: 'Calculate fantasy football, basketball, and baseball points based on player stats.',
    category: 'Sports',
    inputs: [
      { id: 'sport', label: 'Sport', type: 'select', required: true, options: [
        { value: 'football', label: 'Fantasy Football' },
        { value: 'basketball', label: 'Fantasy Basketball' },
        { value: 'baseball', label: 'Fantasy Baseball' }
      ]},
      { id: 'passing_yards', label: 'Passing Yards', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'passing_tds', label: 'Passing TDs', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'interceptions', label: 'Interceptions', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'rushing_yards', label: 'Rushing Yards', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'rushing_tds', label: 'Rushing TDs', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'receptions', label: 'Receptions', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'receiving_yards', label: 'Receiving Yards', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'receiving_tds', label: 'Receiving TDs', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'points_scored', label: 'Points Scored (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'rebounds', label: 'Rebounds (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'assists', label: 'Assists (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'steals', label: 'Steals (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'blocks', label: 'Blocks (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'turnovers', label: 'Turnovers (Basketball)', type: 'number', required: false, placeholder: '0', defaultValue: 0 }
    ],
    formula: 'Fantasy Points = (stats × point values) based on league scoring system',
    calculate: (inputs) => {
      const sport = inputs.sport;
      let fantasyPoints = 0;
      const breakdown = [];
      
      if (sport === 'football') {
        const passingYards = parseFloat(inputs.passing_yards) || 0;
        const passingTds = parseFloat(inputs.passing_tds) || 0;
        const interceptions = parseFloat(inputs.interceptions) || 0;
        const rushingYards = parseFloat(inputs.rushing_yards) || 0;
        const rushingTds = parseFloat(inputs.rushing_tds) || 0;
        const receptions = parseFloat(inputs.receptions) || 0;
        const receivingYards = parseFloat(inputs.receiving_yards) || 0;
        const receivingTds = parseFloat(inputs.receiving_tds) || 0;
        
        // Standard PPR scoring
        const passingPoints = (passingYards * 0.04) + (passingTds * 4) - (interceptions * 2);
        const rushingPoints = (rushingYards * 0.1) + (rushingTds * 6);
        const receivingPoints = (receptions * 1) + (receivingYards * 0.1) + (receivingTds * 6);
        
        fantasyPoints = passingPoints + rushingPoints + receivingPoints;
        breakdown.push(`Passing: ${passingPoints.toFixed(1)} pts`);
        breakdown.push(`Rushing: ${rushingPoints.toFixed(1)} pts`);
        breakdown.push(`Receiving: ${receivingPoints.toFixed(1)} pts`);
        
      } else if (sport === 'basketball') {
        const points = parseFloat(inputs.points_scored) || 0;
        const rebounds = parseFloat(inputs.rebounds) || 0;
        const assists = parseFloat(inputs.assists) || 0;
        const steals = parseFloat(inputs.steals) || 0;
        const blocks = parseFloat(inputs.blocks) || 0;
        const turnovers = parseFloat(inputs.turnovers) || 0;
        
        // Standard basketball scoring
        fantasyPoints = points + (rebounds * 1.2) + (assists * 1.5) + (steals * 3) + (blocks * 3) - (turnovers * 1);
        breakdown.push(`Points: ${points} pts`);
        breakdown.push(`Rebounds: ${(rebounds * 1.2).toFixed(1)} pts`);
        breakdown.push(`Assists: ${(assists * 1.5).toFixed(1)} pts`);
        breakdown.push(`Steals: ${(steals * 3).toFixed(1)} pts`);
        breakdown.push(`Blocks: ${(blocks * 3).toFixed(1)} pts`);
        breakdown.push(`Turnovers: -${turnovers} pts`);
      }
      
      return {
        results: [
          { value: fantasyPoints, label: 'Fantasy Points', format: 'decimal' },
          { value: sport.charAt(0).toUpperCase() + sport.slice(1), label: 'Sport' }
        ],
        explanation: [`Total Fantasy Points: ${fantasyPoints.toFixed(2)}`],
        steps: breakdown
      };
    },
    tags: ['fantasy', 'football', 'basketball', 'baseball'],
    complexity: 'Basic'
  },
  
  {
    id: 'sports-betting-odds',
    title: 'Sports Betting Odds Calculator',
    description: 'Convert between American, Decimal, and Fractional odds formats.',
    category: 'Sports',
    inputs: [
      { id: 'input_format', label: 'Input Format', type: 'select', required: true, options: [
        { value: 'american', label: 'American (+/-100)' },
        { value: 'decimal', label: 'Decimal (2.00)' },
        { value: 'fractional', label: 'Fractional (1/1)' }
      ]},
      { id: 'odds_value', label: 'Odds Value', type: 'text', required: true, placeholder: 'Enter odds' }
    ],
    formula: 'Odds conversion formulas between American, Decimal, and Fractional formats',
    calculate: (inputs) => {
      const inputFormat = inputs.input_format;
      const oddsValue = inputs.odds_value.trim();
      
      let american, decimal, fractional, impliedProbability;
      
      try {
        if (inputFormat === 'american') {
          american = parseFloat(oddsValue);
          if (american > 0) {
            decimal = (american / 100) + 1;
            fractional = `${american}/100`;
            impliedProbability = 100 / (american + 100);
          } else {
            decimal = (100 / Math.abs(american)) + 1;
            fractional = `100/${Math.abs(american)}`;
            impliedProbability = Math.abs(american) / (Math.abs(american) + 100);
          }
        } else if (inputFormat === 'decimal') {
          decimal = parseFloat(oddsValue);
          if (decimal >= 2) {
            american = (decimal - 1) * 100;
          } else {
            american = -100 / (decimal - 1);
          }
          fractional = `${Math.round((decimal - 1) * 100)}/100`;
          impliedProbability = 1 / decimal;
        } else if (inputFormat === 'fractional') {
          const parts = oddsValue.split('/');
          if (parts.length !== 2) throw new Error('Invalid fractional format');
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          fractional = `${numerator}/${denominator}`;
          decimal = (numerator / denominator) + 1;
          if (decimal >= 2) {
            american = (decimal - 1) * 100;
          } else {
            american = -100 / (decimal - 1);
          }
          impliedProbability = denominator / (numerator + denominator);
        }
        
        return {
          results: [
            { value: american > 0 ? `+${american.toFixed(0)}` : american.toFixed(0), label: 'American' },
            { value: decimal.toFixed(2), label: 'Decimal' },
            { value: fractional, label: 'Fractional' },
            { value: (impliedProbability * 100).toFixed(2), label: 'Implied Probability', unit: '%' }
          ],
          explanation: [`Odds converted from ${inputFormat} format`],
          steps: [
            `Input: ${oddsValue} (${inputFormat})`,
            `American: ${american > 0 ? '+' : ''}${american.toFixed(0)}`,
            `Decimal: ${decimal.toFixed(2)}`,
            `Fractional: ${fractional}`,
            `Implied Probability: ${(impliedProbability * 100).toFixed(2)}%`
          ]
        };
      } catch (error) {
        throw new Error('Invalid odds format. Please check your input.');
      }
    },
    tags: ['betting', 'odds', 'probability'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'player-statistics',
    title: 'Player Statistics Calculator',
    description: 'Advanced sports analytics and performance metrics for player evaluation.',
    category: 'Sports',
    inputs: [
      { id: 'games_played', label: 'Games Played', type: 'number', required: true, placeholder: 'Number of games' },
      { id: 'points', label: 'Total Points', type: 'number', required: true, placeholder: 'Total points scored' },
      { id: 'field_goals_made', label: 'Field Goals Made', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'field_goals_attempted', label: 'Field Goals Attempted', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'three_pointers_made', label: '3-Pointers Made', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'three_pointers_attempted', label: '3-Pointers Attempted', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'free_throws_made', label: 'Free Throws Made', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'free_throws_attempted', label: 'Free Throws Attempted', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'rebounds', label: 'Total Rebounds', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'assists', label: 'Total Assists', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'minutes', label: 'Total Minutes', type: 'number', required: false, placeholder: '0', defaultValue: 0 }
    ],
    formula: 'Various efficiency and per-game statistics',
    calculate: (inputs) => {
      const games = parseFloat(inputs.games_played);
      const points = parseFloat(inputs.points);
      const fgm = parseFloat(inputs.field_goals_made) || 0;
      const fga = parseFloat(inputs.field_goals_attempted) || 0;
      const tpm = parseFloat(inputs.three_pointers_made) || 0;
      const tpa = parseFloat(inputs.three_pointers_attempted) || 0;
      const ftm = parseFloat(inputs.free_throws_made) || 0;
      const fta = parseFloat(inputs.free_throws_attempted) || 0;
      const rebounds = parseFloat(inputs.rebounds) || 0;
      const assists = parseFloat(inputs.assists) || 0;
      const minutes = parseFloat(inputs.minutes) || 0;
      
      if (!games || games <= 0) throw new Error('Games played must be greater than 0');
      
      const ppg = points / games;
      const rpg = rebounds / games;
      const apg = assists / games;
      const mpg = minutes / games;
      
      const fgPercentage = fga > 0 ? (fgm / fga) * 100 : 0;
      const tpPercentage = tpa > 0 ? (tpm / tpa) * 100 : 0;
      const ftPercentage = fta > 0 ? (ftm / fta) * 100 : 0;
      
      // Player Efficiency Rating (simplified)
      const per = minutes > 0 ? ((points + rebounds + assists) * games) / minutes : 0;
      
      return {
        results: [
          { value: ppg, label: 'Points Per Game', format: 'decimal' },
          { value: rpg, label: 'Rebounds Per Game', format: 'decimal' },
          { value: apg, label: 'Assists Per Game', format: 'decimal' },
          { value: mpg, label: 'Minutes Per Game', format: 'decimal' },
          { value: fgPercentage, label: 'Field Goal %', format: 'decimal', unit: '%' },
          { value: tpPercentage, label: '3-Point %', format: 'decimal', unit: '%' },
          { value: ftPercentage, label: 'Free Throw %', format: 'decimal', unit: '%' },
          { value: per, label: 'Player Efficiency Rating', format: 'decimal' }
        ],
        explanation: [`Player averages over ${games} games`],
        steps: [
          `PPG: ${points} ÷ ${games} = ${ppg.toFixed(1)}`,
          `RPG: ${rebounds} ÷ ${games} = ${rpg.toFixed(1)}`,
          `APG: ${assists} ÷ ${games} = ${apg.toFixed(1)}`,
          `FG%: ${fgm}/${fga} = ${fgPercentage.toFixed(1)}%`
        ]
      };
    },
    tags: ['basketball', 'player', 'statistics', 'efficiency'],
    complexity: 'Advanced'
  },
  
  {
    id: 'team-performance-metrics',
    title: 'Team Performance Metrics',
    description: 'Team comparison and analysis tools for evaluating team effectiveness.',
    category: 'Sports',
    inputs: [
      { id: 'wins', label: 'Wins', type: 'number', required: true, placeholder: 'Number of wins' },
      { id: 'losses', label: 'Losses', type: 'number', required: true, placeholder: 'Number of losses' },
      { id: 'points_for', label: 'Points For', type: 'number', required: true, placeholder: 'Total points scored' },
      { id: 'points_against', label: 'Points Against', type: 'number', required: true, placeholder: 'Total points allowed' },
      { id: 'home_wins', label: 'Home Wins', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'home_losses', label: 'Home Losses', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'away_wins', label: 'Away Wins', type: 'number', required: false, placeholder: '0', defaultValue: 0 },
      { id: 'away_losses', label: 'Away Losses', type: 'number', required: false, placeholder: '0', defaultValue: 0 }
    ],
    formula: 'Win %, Point Differential, Strength metrics',
    calculate: (inputs) => {
      const wins = parseFloat(inputs.wins);
      const losses = parseFloat(inputs.losses);
      const pointsFor = parseFloat(inputs.points_for);
      const pointsAgainst = parseFloat(inputs.points_against);
      const homeWins = parseFloat(inputs.home_wins) || 0;
      const homeLosses = parseFloat(inputs.home_losses) || 0;
      const awayWins = parseFloat(inputs.away_wins) || 0;
      const awayLosses = parseFloat(inputs.away_losses) || 0;
      
      if (wins < 0 || losses < 0) throw new Error('Wins and losses must be non-negative');
      
      const totalGames = wins + losses;
      const winPercentage = totalGames > 0 ? (wins / totalGames) * 100 : 0;
      const pointDifferential = pointsFor - pointsAgainst;
      const avgPointsFor = totalGames > 0 ? pointsFor / totalGames : 0;
      const avgPointsAgainst = totalGames > 0 ? pointsAgainst / totalGames : 0;
      
      const homeGames = homeWins + homeLosses;
      const homeWinPct = homeGames > 0 ? (homeWins / homeGames) * 100 : 0;
      const awayGames = awayWins + awayLosses;
      const awayWinPct = awayGames > 0 ? (awayWins / awayGames) * 100 : 0;
      
      // Strength of Schedule indicator (simplified)
      const sosIndicator = avgPointsAgainst > 0 ? avgPointsFor / avgPointsAgainst : 1;
      
      return {
        results: [
          { value: `${wins}-${losses}`, label: 'Record' },
          { value: winPercentage, label: 'Win Percentage', format: 'decimal', unit: '%' },
          { value: pointDifferential, label: 'Point Differential', format: 'integer' },
          { value: avgPointsFor, label: 'Avg Points For', format: 'decimal' },
          { value: avgPointsAgainst, label: 'Avg Points Against', format: 'decimal' },
          { value: homeWinPct, label: 'Home Win %', format: 'decimal', unit: '%' },
          { value: awayWinPct, label: 'Away Win %', format: 'decimal', unit: '%' },
          { value: sosIndicator, label: 'Offensive Rating', format: 'decimal' }
        ],
        explanation: [`Team performance over ${totalGames} games`],
        steps: [
          `Win %: ${wins}/${totalGames} = ${winPercentage.toFixed(1)}%`,
          `Point Differential: ${pointsFor} - ${pointsAgainst} = ${pointDifferential > 0 ? '+' : ''}${pointDifferential}`,
          `Average Points For: ${pointsFor}/${totalGames} = ${avgPointsFor.toFixed(1)}`,
          `Average Points Against: ${pointsAgainst}/${totalGames} = ${avgPointsAgainst.toFixed(1)}`
        ]
      };
    },
    tags: ['team', 'performance', 'analysis', 'metrics'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'running-pace-calculator',
    title: 'Running Pace Calculator',
    description: 'Calculate running paces, split times, and race predictions for various distances.',
    category: 'Sports',
    inputs: [
      { id: 'calculation_type', label: 'Calculation Type', type: 'select', required: true, options: [
        { value: 'pace_from_time', label: 'Calculate Pace from Time & Distance' },
        { value: 'time_from_pace', label: 'Calculate Time from Pace & Distance' },
        { value: 'split_times', label: 'Calculate Split Times' }
      ]},
      { id: 'distance', label: 'Distance', type: 'number', required: true, placeholder: 'Distance', step: 0.1 },
      { id: 'distance_unit', label: 'Distance Unit', type: 'select', required: true, options: [
        { value: 'miles', label: 'Miles' },
        { value: 'kilometers', label: 'Kilometers' },
        { value: 'meters', label: 'Meters' }
      ]},
      { id: 'time_hours', label: 'Hours', type: 'number', required: false, placeholder: '0', defaultValue: 0, min: 0 },
      { id: 'time_minutes', label: 'Minutes', type: 'number', required: false, placeholder: '0', defaultValue: 0, min: 0, max: 59 },
      { id: 'time_seconds', label: 'Seconds', type: 'number', required: false, placeholder: '0', defaultValue: 0, min: 0, max: 59 },
      { id: 'pace_minutes', label: 'Pace Minutes', type: 'number', required: false, placeholder: '0', defaultValue: 0, min: 0 },
      { id: 'pace_seconds', label: 'Pace Seconds', type: 'number', required: false, placeholder: '0', defaultValue: 0, min: 0, max: 59 }
    ],
    formula: 'Pace = Time / Distance, Time = Pace × Distance',
    calculate: (inputs) => {
      const calculationType = inputs.calculation_type;
      const distance = parseFloat(inputs.distance);
      const distanceUnit = inputs.distance_unit;
      const hours = parseFloat(inputs.time_hours) || 0;
      const minutes = parseFloat(inputs.time_minutes) || 0;
      const seconds = parseFloat(inputs.time_seconds) || 0;
      const paceMinutes = parseFloat(inputs.pace_minutes) || 0;
      const paceSeconds = parseFloat(inputs.pace_seconds) || 0;
      
      if (!distance || distance <= 0) throw new Error('Distance must be greater than 0');
      
      // Convert distance to miles for consistency
      let distanceInMiles = distance;
      if (distanceUnit === 'kilometers') distanceInMiles = distance * 0.621371;
      else if (distanceUnit === 'meters') distanceInMiles = distance * 0.000621371;
      
      if (calculationType === 'pace_from_time') {
        const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
        if (totalTimeInSeconds <= 0) throw new Error('Total time must be greater than 0');
        
        const paceInSecondsPerMile = totalTimeInSeconds / distanceInMiles;
        const paceMin = Math.floor(paceInSecondsPerMile / 60);
        const paceSec = Math.floor(paceInSecondsPerMile % 60);
        
        // Calculate splits for common distances
        const mileTime = paceInSecondsPerMile;
        const kmTime = paceInSecondsPerMile * 0.621371;
        
        return {
          results: [
            { value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, label: 'Pace per Mile' },
            { value: `${Math.floor(kmTime/60)}:${Math.floor(kmTime%60).toString().padStart(2, '0')}`, label: 'Pace per Kilometer' },
            { value: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`, label: 'Total Time' },
            { value: distance, label: 'Distance', unit: distanceUnit }
          ],
          explanation: [`Pace calculated from ${distance} ${distanceUnit} in ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`],
          steps: [
            `Total time: ${totalTimeInSeconds} seconds`,
            `Distance: ${distanceInMiles.toFixed(2)} miles`,
            `Pace: ${totalTimeInSeconds}s ÷ ${distanceInMiles.toFixed(2)} = ${paceInSecondsPerMile.toFixed(0)}s per mile`,
            `Pace: ${paceMin}:${paceSec.toString().padStart(2, '0')} per mile`
          ]
        };
      } else if (calculationType === 'time_from_pace') {
        const paceInSeconds = (paceMinutes * 60) + paceSeconds;
        if (paceInSeconds <= 0) throw new Error('Pace must be greater than 0');
        
        const totalTimeInSeconds = paceInSeconds * distanceInMiles;
        const totalHours = Math.floor(totalTimeInSeconds / 3600);
        const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const totalSeconds = Math.floor(totalTimeInSeconds % 60);
        
        return {
          results: [
            { value: `${totalHours}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`, label: 'Predicted Time' },
            { value: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`, label: 'Pace per Mile' },
            { value: distance, label: 'Distance', unit: distanceUnit }
          ],
          explanation: [`Time predicted for ${distance} ${distanceUnit} at ${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} pace`],
          steps: [
            `Pace: ${paceInSeconds} seconds per mile`,
            `Distance: ${distanceInMiles.toFixed(2)} miles`,
            `Time: ${paceInSeconds}s × ${distanceInMiles.toFixed(2)} = ${totalTimeInSeconds.toFixed(0)}s`,
            `Time: ${totalHours}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`
          ]
        };
      }
      
      return {
        results: [{ value: 'Invalid calculation type', label: 'Error' }],
        explanation: ['Please select a valid calculation type'],
        steps: []
      };
    },
    tags: ['running', 'pace', 'marathon', 'training'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'swimming-time-calculator',
    title: 'Swimming Time Calculator',
    description: 'Calculate swimming times, paces, and performance metrics for pool and open water.',
    category: 'Sports',
    inputs: [
      { id: 'stroke', label: 'Swimming Stroke', type: 'select', required: true, options: [
        { value: 'freestyle', label: 'Freestyle' },
        { value: 'backstroke', label: 'Backstroke' },
        { value: 'breaststroke', label: 'Breaststroke' },
        { value: 'butterfly', label: 'Butterfly' },
        { value: 'individual_medley', label: 'Individual Medley' }
      ]},
      { id: 'pool_length', label: 'Pool Length', type: 'select', required: true, options: [
        { value: '25_yards', label: '25 Yards' },
        { value: '25_meters', label: '25 Meters' },
        { value: '50_meters', label: '50 Meters' },
        { value: 'open_water', label: 'Open Water' }
      ]},
      { id: 'distance', label: 'Distance', type: 'number', required: true, placeholder: 'Swimming distance' },
      { id: 'distance_unit', label: 'Distance Unit', type: 'select', required: true, options: [
        { value: 'yards', label: 'Yards' },
        { value: 'meters', label: 'Meters' },
        { value: 'miles', label: 'Miles' },
        { value: 'kilometers', label: 'Kilometers' }
      ]},
      { id: 'time_minutes', label: 'Time Minutes', type: 'number', required: true, placeholder: 'Minutes', min: 0 },
      { id: 'time_seconds', label: 'Time Seconds', type: 'number', required: true, placeholder: 'Seconds', min: 0, max: 59 }
    ],
    formula: 'Pace per 100 units, SWOLF score, efficiency metrics',
    calculate: (inputs) => {
      const stroke = inputs.stroke;
      const poolLength = inputs.pool_length;
      const distance = parseFloat(inputs.distance);
      const distanceUnit = inputs.distance_unit;
      const timeMinutes = parseFloat(inputs.time_minutes);
      const timeSeconds = parseFloat(inputs.time_seconds);
      
      if (!distance || distance <= 0) throw new Error('Distance must be greater than 0');
      if (timeMinutes < 0 || timeSeconds < 0) throw new Error('Time must be non-negative');
      
      const totalTimeInSeconds = (timeMinutes * 60) + timeSeconds;
      if (totalTimeInSeconds <= 0) throw new Error('Total time must be greater than 0');
      
      // Convert distance to meters for consistency
      let distanceInMeters = distance;
      if (distanceUnit === 'yards') distanceInMeters = distance * 0.9144;
      else if (distanceUnit === 'miles') distanceInMeters = distance * 1609.34;
      else if (distanceUnit === 'kilometers') distanceInMeters = distance * 1000;
      
      // Calculate pace per 100m
      const paceFor100m = (totalTimeInSeconds / distanceInMeters) * 100;
      const pace100mMinutes = Math.floor(paceFor100m / 60);
      const pace100mSeconds = Math.floor(paceFor100m % 60);
      
      // Calculate average speed
      const speedMPS = distanceInMeters / totalTimeInSeconds; // meters per second
      const speedKMH = speedMPS * 3.6; // km/h
      
      // Stroke-specific efficiency factors (approximate)
      const strokeFactors = {
        freestyle: 1.0,
        backstroke: 1.1,
        breaststroke: 1.4,
        butterfly: 1.2,
        individual_medley: 1.15
      };
      
      const strokeFactor = strokeFactors[stroke] || 1.0;
      const efficiencyRating = (100 / (paceFor100m * strokeFactor)) * 10;
      
      return {
        results: [
          { value: `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`, label: 'Total Time' },
          { value: `${pace100mMinutes}:${pace100mSeconds.toString().padStart(2, '0')}`, label: 'Pace per 100m' },
          { value: speedMPS, label: 'Speed', format: 'decimal', unit: 'm/s' },
          { value: speedKMH, label: 'Speed', format: 'decimal', unit: 'km/h' },
          { value: efficiencyRating, label: 'Efficiency Rating', format: 'decimal' },
          { value: stroke.charAt(0).toUpperCase() + stroke.slice(1).replace('_', ' '), label: 'Stroke' }
        ],
        explanation: [`Swimming performance for ${distance} ${distanceUnit} ${stroke}`],
        steps: [
          `Distance: ${distanceInMeters.toFixed(0)} meters`,
          `Time: ${totalTimeInSeconds} seconds`,
          `Pace per 100m: ${paceFor100m.toFixed(1)}s`,
          `Average Speed: ${speedMPS.toFixed(2)} m/s`
        ]
      };
    },
    tags: ['swimming', 'pace', 'pool', 'open water'],
    complexity: 'Intermediate'
  },
  
  {
    id: 'sports-tournament-organizer',
    title: 'Sports Tournament Organizer',
    description: 'Create and manage sports tournament brackets and scheduling.',
    category: 'Sports',
    inputs: [
      { id: 'tournament_type', label: 'Tournament Type', type: 'select', required: true, options: [
        { value: 'single_elimination', label: 'Single Elimination' },
        { value: 'double_elimination', label: 'Double Elimination' },
        { value: 'round_robin', label: 'Round Robin' },
        { value: 'swiss', label: 'Swiss System' }
      ]},
      { id: 'num_teams', label: 'Number of Teams', type: 'number', required: true, placeholder: 'Total teams', min: 2, max: 64 },
      { id: 'match_duration', label: 'Match Duration (minutes)', type: 'number', required: false, placeholder: '60', defaultValue: 60 },
      { id: 'break_between_matches', label: 'Break Between Matches (minutes)', type: 'number', required: false, placeholder: '15', defaultValue: 15 },
      { id: 'courts_available', label: 'Courts/Fields Available', type: 'number', required: false, placeholder: '1', defaultValue: 1, min: 1 }
    ],
    formula: 'Tournament structure calculations based on bracket type',
    calculate: (inputs) => {
      const tournamentType = inputs.tournament_type;
      const numTeams = parseInt(inputs.num_teams);
      const matchDuration = parseInt(inputs.match_duration) || 60;
      const breakTime = parseInt(inputs.break_between_matches) || 15;
      const courtsAvailable = parseInt(inputs.courts_available) || 1;
      
      if (!numTeams || numTeams < 2) throw new Error('Must have at least 2 teams');
      if (numTeams > 64) throw new Error('Maximum 64 teams supported');
      
      let totalMatches, rounds, estimatedTime;
      const matchWithBreak = matchDuration + breakTime;
      
      if (tournamentType === 'single_elimination') {
        totalMatches = numTeams - 1;
        rounds = Math.ceil(Math.log2(numTeams));
        const matchesPerRound = Math.ceil(totalMatches / rounds);
        const roundDuration = Math.ceil(matchesPerRound / courtsAvailable) * matchWithBreak;
        estimatedTime = rounds * roundDuration;
        
      } else if (tournamentType === 'double_elimination') {
        totalMatches = (numTeams - 1) * 2; // Worst case scenario
        rounds = Math.ceil(Math.log2(numTeams)) * 2;
        estimatedTime = rounds * Math.ceil(2 / courtsAvailable) * matchWithBreak;
        
      } else if (tournamentType === 'round_robin') {
        totalMatches = (numTeams * (numTeams - 1)) / 2;
        rounds = numTeams - 1;
        const matchesPerRound = Math.floor(numTeams / 2);
        const roundDuration = Math.ceil(matchesPerRound / courtsAvailable) * matchWithBreak;
        estimatedTime = rounds * roundDuration;
        
      } else if (tournamentType === 'swiss') {
        rounds = Math.ceil(Math.log2(numTeams));
        totalMatches = rounds * Math.floor(numTeams / 2);
        const matchesPerRound = Math.floor(numTeams / 2);
        const roundDuration = Math.ceil(matchesPerRound / courtsAvailable) * matchWithBreak;
        estimatedTime = rounds * roundDuration;
      }
      
      const hours = Math.floor(estimatedTime / 60);
      const minutes = estimatedTime % 60;
      
      // Calculate byes if needed
      const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(numTeams)));
      const byes = nextPowerOf2 - numTeams;
      
      return {
        results: [
          { value: tournamentType.replace('_', ' ').toUpperCase(), label: 'Tournament Type' },
          { value: numTeams, label: 'Teams', format: 'integer' },
          { value: totalMatches, label: 'Total Matches', format: 'integer' },
          { value: rounds, label: 'Rounds', format: 'integer' },
          { value: byes, label: 'Byes Needed', format: 'integer' },
          { value: `${hours}h ${minutes}m`, label: 'Estimated Duration' },
          { value: courtsAvailable, label: 'Courts Used', format: 'integer' }
        ],
        explanation: [`${tournamentType.replace('_', ' ')} tournament with ${numTeams} teams`],
        steps: [
          `Tournament Type: ${tournamentType.replace('_', ' ')}`,
          `Teams: ${numTeams}`,
          `Total Matches: ${totalMatches}`,
          `Rounds: ${rounds}`,
          `Estimated Time: ${hours}h ${minutes}m`
        ]
      };
    },
    tags: ['tournament', 'bracket', 'scheduling', 'organization'],
    complexity: 'Advanced'
  },
  
  {
    id: 'athletic-performance-tracker',
    title: 'Athletic Performance Tracker',
    description: 'Track and analyze athletic progress over time with performance metrics.',
    category: 'Sports',
    inputs: [
      { id: 'sport_type', label: 'Sport Type', type: 'select', required: true, options: [
        { value: 'running', label: 'Running' },
        { value: 'swimming', label: 'Swimming' },
        { value: 'cycling', label: 'Cycling' },
        { value: 'weightlifting', label: 'Weightlifting' },
        { value: 'general', label: 'General Athletics' }
      ]},
      { id: 'baseline_performance', label: 'Baseline Performance', type: 'number', required: true, placeholder: 'Initial performance value' },
      { id: 'current_performance', label: 'Current Performance', type: 'number', required: true, placeholder: 'Current performance value' },
      { id: 'performance_unit', label: 'Performance Unit', type: 'select', required: true, options: [
        { value: 'time_seconds', label: 'Time (seconds)' },
        { value: 'distance_meters', label: 'Distance (meters)' },
        { value: 'weight_lbs', label: 'Weight (lbs)' },
        { value: 'weight_kg', label: 'Weight (kg)' },
        { value: 'speed_mph', label: 'Speed (mph)' },
        { value: 'speed_kph', label: 'Speed (km/h)' },
        { value: 'repetitions', label: 'Repetitions' },
        { value: 'points', label: 'Points/Score' }
      ]},
      { id: 'training_days', label: 'Training Days', type: 'number', required: true, placeholder: 'Days of training', min: 1 },
      { id: 'training_sessions', label: 'Training Sessions', type: 'number', required: false, placeholder: 'Total sessions', defaultValue: 0 },
      { id: 'goal_performance', label: 'Goal Performance', type: 'number', required: false, placeholder: 'Target performance' }
    ],
    formula: 'Performance improvement rate, goal achievement metrics',
    calculate: (inputs) => {
      const sportType = inputs.sport_type;
      const baseline = parseFloat(inputs.baseline_performance);
      const current = parseFloat(inputs.current_performance);
      const performanceUnit = inputs.performance_unit;
      const trainingDays = parseInt(inputs.training_days);
      const trainingSessions = parseInt(inputs.training_sessions) || 0;
      const goalPerformance = parseFloat(inputs.goal_performance);
      
      if (!baseline || !current) throw new Error('Baseline and current performance required');
      if (!trainingDays || trainingDays < 1) throw new Error('Training days must be at least 1');
      
      // Determine if lower values are better (like time) or higher values are better (like distance, weight)
      const lowerIsBetter = performanceUnit.includes('time_seconds');
      
      let improvementValue, improvementPercentage;
      if (lowerIsBetter) {
        improvementValue = baseline - current; // Positive improvement means lower time
        improvementPercentage = ((baseline - current) / baseline) * 100;
      } else {
        improvementValue = current - baseline; // Positive improvement means higher value
        improvementPercentage = ((current - baseline) / baseline) * 100;
      }
      
      const dailyImprovement = improvementValue / trainingDays;
      const sessionsPerDay = trainingSessions > 0 ? trainingSessions / trainingDays : 1;
      
      // Calculate goal progress if goal is provided
      let goalProgress: number | string = 'N/A';
      let goaldaysToTarget = 'N/A';
      
      if (goalPerformance) {
        let remainingImprovement;
        if (lowerIsBetter) {
          remainingImprovement = current - goalPerformance;
        } else {
          remainingImprovement = goalPerformance - current;
        }
        
        if (dailyImprovement > 0) {
          const daysToGoal = Math.ceil(remainingImprovement / dailyImprovement);
          goaldaysToTarget = daysToGoal > 0 ? `${daysToGoal} days` : 'Goal achieved';
          
          if (lowerIsBetter) {
            goalProgress = ((baseline - current) / (baseline - goalPerformance)) * 100;
          } else {
            goalProgress = ((current - baseline) / (goalPerformance - baseline)) * 100;
          }
        }
      }
      
      // Performance rating
      let rating = 'Needs Improvement';
      if (Math.abs(improvementPercentage) >= 20) rating = 'Excellent';
      else if (Math.abs(improvementPercentage) >= 10) rating = 'Very Good';
      else if (Math.abs(improvementPercentage) >= 5) rating = 'Good';
      else if (Math.abs(improvementPercentage) >= 1) rating = 'Fair';
      
      return {
        results: [
          { value: baseline, label: 'Baseline Performance', format: 'decimal' },
          { value: current, label: 'Current Performance', format: 'decimal' },
          { value: improvementValue, label: 'Total Improvement', format: 'decimal' },
          { value: improvementPercentage, label: 'Improvement %', format: 'decimal', unit: '%' },
          { value: dailyImprovement, label: 'Daily Improvement Rate', format: 'decimal' },
          { value: sessionsPerDay, label: 'Sessions per Day', format: 'decimal' },
          { value: goalProgress !== 'N/A' ? (goalProgress as number) : 'N/A', label: 'Goal Progress', format: goalProgress !== 'N/A' ? 'decimal' : undefined, unit: goalProgress !== 'N/A' ? '%' : undefined },
          { value: rating, label: 'Performance Rating' }
        ],
        explanation: [`Athletic performance tracking for ${sportType} over ${trainingDays} days`],
        steps: [
          `Baseline: ${baseline} ${performanceUnit.replace('_', ' ')}`,
          `Current: ${current} ${performanceUnit.replace('_', ' ')}`,
          `Improvement: ${improvementValue > 0 ? '+' : ''}${improvementValue.toFixed(2)}`,
          `Percentage: ${improvementPercentage > 0 ? '+' : ''}${improvementPercentage.toFixed(1)}%`,
          `Daily Rate: ${dailyImprovement.toFixed(4)} per day`
        ]
      };
    },
    tags: ['athletics', 'performance', 'tracking', 'progress'],
    complexity: 'Advanced'
  }
];

export default sportsCalculators;