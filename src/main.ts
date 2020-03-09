import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import '@angular/compiler';
if (environment.production) {
  enableProdMode();
}
let members = JSON.parse(localStorage.getItem('members'));
if(!members) {
  const arr: Array<{id: number, name: string, department: string}> = [
    {
      id : 113242,
      name: 'Member One',
      department: 'IT'
    },
    {
      id : 232324,
      name: 'Member Two',
      department: 'IT'
    },
    {
      id : 335353,
      name: 'Member Three',
      department: 'Marketing'
    },
    {
      id : 434353,
      name: 'Member Four',
      department: 'HR'
    },
    {
      id : 532554,
      name: 'Member Five',
      department: 'Marketing'
    },
    {
      id : 642343,
      name: 'Member Six',
      department: 'Netowrking'
    },
    {
      id : 735363,
      name: 'Member Seven',
      department: 'HR'
    },
    {
      id : 835353,
      name: 'Member Eight',
      department: 'Management'
    },
    {
      id : 934364,
      name: 'Member Nine',
      department: 'Management'
    },
    {
      id : 134343,
      name: 'Member Ten',
      department: 'IT'
    },
    {
      id : 153657,
      name: 'Member Eleven',
      department: 'Management'
    },
    {
      id : 157686,
      name: 'Member Tweleve',
      department: 'Networking'
    },
  ];
  localStorage.setItem('members',JSON.stringify(arr))
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
