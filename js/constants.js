GS = 64; // Grid size
MIN_PS = 1.55; // Min player speed
MIN_ZS = 1; // Min zombie speed
MAX_ZPD = 15; // Max zombie path distance (in nodes)
INV_TIME = 800; // Invincibility time (in ms)
MIN_BD = 900; // Min biting duration (in ms)
MAX_SOLD = 3; // max number of soldiers
ITEMS = {
  AM: 2,
  MG: 3,
  SG: 4,
  FL: 5
}
INPUT = {
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
DROP_RATE = 0.3;
AMMO_BOX = 30;
WH = '#fff';
BL = '#000';
FN = 'sans-serif';
