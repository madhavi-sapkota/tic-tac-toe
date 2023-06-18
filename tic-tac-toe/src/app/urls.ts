import { isDevMode } from '@angular/core';

const serverUrl = isDevMode()
  ? 'http://localhost:8080'
  : 'https://play-tic-tac-toe.azurewebsites.net';

export { serverUrl };
