// a service's responsibility is to manage application logic

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable() // attach metadata to the class
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: 'Lucky',
      age: 7,
      breed: 'Maine Coon',
    },
    {
      name: 'Toasty',
      age: 3,
      breed: 'Bengal',
    },
    {
      name: 'Bluestar',
      age: 12,
      breed: 'Shorthair',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }
}
