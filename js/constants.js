GRID_SIZE = 64;
MIN_PLAYER_SPEED = 1.55;
MZS = 1; // Min zombie speed
MAX_ZOMBIE_PATH_DISTANCE = 15; // Nodes
INVINCIBILITY_TIME = 800; // ms
INTENSITY_PER_ATTACK = 50;
INTENSITY_DECAY = 0.5 // per second
MEDIKIT_DURATION = 1500; // ms
MIN_BITING_DURATION = 900; // ms
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
WEAPONS= {
  MG: {
    ID: 'MACHINEGUN',
    DELAY: 50,
    SPEED: 50,
    SIZE: 10,
    DAM: 1
  },
  SG: {
    ID: 'SHOTGUN',
    DELAY: 300,
    SPEED: 30,
    SIZE: 16,
    DAM: 5
  },
  FL: {
    ID: 'FLAME',
    DELAY: 40,
    SPEED: 7,
    SIZE: 60
  }
}
VACCINE_PICKUP_DELAY = 1500; // ms
DROP_RATE = 0.4;
AMMO_PER_BOX = 30;

// ZQSD for frenchies
