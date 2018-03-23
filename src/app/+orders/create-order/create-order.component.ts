import { OrderInputData } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OrdersService } from '../../shared/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  private createOrderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
  ) {
    this.createOrderForm = this.formBuilder.group({
      name: [null, [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      deliveryCost: [null, [
          Validators.pattern(/^[0-9]*$/),
        ]
      ],
      paymentMethod: ['cash', [
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit() {
  }

  public onFormSubmit(newOrderData: OrderInputData) {
    this.createOrder(newOrderData);
  }

  public createOrder(data: OrderInputData) {
    this.ordersService.createOrder(data)
      .subscribe((res) => {
        console.log(res);
      });
  }

}
