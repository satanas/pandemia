GS = 64; // Grid size
MIN_PS = 1.55; // Min player speed
MIN_ZS = 1; // Min zombie speed
MAX_ZPD = 15; // Max zombie path distance (in nodes)
MIN_BD = 900; // Min biting duration (in ms)
LIVES = 3; // max number of soldiers
IT = {
  A: 2,
  M: 3,
  S: 4,
  F: 5
}
IN = {
  L: [65, 81, 37],  // A - Q
  R: [68, 39],      // D
  U: [87, 90, 38],  // W - Z
  D: [83, 40],      // S
  E: [13],          // Enter
}
DIR = {
  LEFT: 'l',
  RIGHT: 'r',
  UP: 'u',
  DOWN: 'd'
}
WPN = {
  MG: {
    ID: 'MACHINEGUN',
    DL: 50,
    SP: 50,
    SI: 10
  },
  SG: {
    ID: 'SHOTGUN',
    DL: 300,
    SP: 30,
    SI: 16
  },
  FL: {
    ID: 'FLAME',
    DL: 40,
    SP: 7,
    SI: 60
  }
}
VACC_PD = 1300; // Vaccine pick up delay (in ms)
DROP = 0.3;
AMMO = 10;
// Colors
WH = '#fff'; // White
BL = '#000'; // Black
RD = '#f00'; // Red

// Player and NPC colors
FC = '#5a5a5a'; // Eyes color
AC = '#4b4e44'; // Arms color
HC = '#f3c17f'; // Hands color

FN = 'sans-serif';
