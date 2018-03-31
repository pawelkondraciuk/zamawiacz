import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { OrdersService } from '../../shared/services/orders.service';
import { NewOrderInputData } from './../../shared/models/order';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  private createOrderForm: FormGroup;

  constructor(
    private router: Router,
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

  public onFormSubmit(newOrderData: NewOrderInputData) {
    this.createOrder(newOrderData);
  }

  public createOrder(data: NewOrderInputData) {
    this.ordersService.createOrder(data)
      .subscribe((res) => {
        this.router.navigateByUrl('/orders');
      });
  }

}
