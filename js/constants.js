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
  MEDIKIT: 1,
  AMMO: 2,
  PISTOL: 3,
  SHOTGUN: 4,
  FLAME: 5
}
INPUT = {
  LEFT: 65,   // A
  RIGHT: 68,  // D
  UP: 87,     // W
  DOWN: 83,   // S
  ENTER: 13,  // Enter
}
DIR = {
  LEFT: 'l',
  RIGHT: 'r',
  UP: 'u',
  DOWN: 'd'
}
WEAPONS= {
  PISTOL: {
    ID: 'PISTOL',
    DELAY: 50,
    SPEED: 50,
    SIZE: 10,
    DAM: 1
  },
  SHOTGUN: {
    ID: 'SHOTGUN',
    DELAY: 300,
    SPEED: 30,
    SIZE: 16,
    DAM: 3
  },
  FLAME: {
    ID: 'FLAME',
    DELAY: 40,
    SPEED: 7,
    SIZE: 60
  }
}
VACCINE_PICKUP_DELAY = 1500; // ms
DROP_RATE = 0.5;
AMMO_PER_BOX = 30;

// ZQSD for frenchies
