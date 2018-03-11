import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  public columnsHeaders = ['title', 'orderer'];
  public tableData = [
    { title: 'Tytuł', orderer: 'Karol' },
    { title: 'Tytuł1', orderer: 'Paweł' },
    { title: 'Tytuł22', orderer: 'Viking' },
    { title: 'Tytuł3', orderer: 'Ogórek' },
    { title: 'Tytuł4', orderer: 'Lemoniada' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
