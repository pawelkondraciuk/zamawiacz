import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Order } from './../../shared/models/order';
import { OrdersService } from './../../shared/services/orders.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {

  private currentOrder: Order;
  private editOrderForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.editOrderForm = this.formBuilder.group({
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
    const orderId = this.activatedRoute.snapshot.params.id;
    if (orderId) {
      this.ordersService.getOrders()
        .subscribe((orders: Order[]) => {
          const currentOrder = orders.find((order: Order) => order.id === orderId);
          this.currentOrder = currentOrder;
          this.populateOrderForm(currentOrder);
        });
    } else {
      throw new Error('No order ID in url param');
    }
  }

  private populateOrderForm(order: Order) {
    this.editOrderForm.setValue({
      name: order.name,
      deliveryCost: order.deliveryCost,
      paymentMethod: order.paymentMethod,
    });
  }

  public onFormSubmit(formData: any) {
    const newOrderData = Object.assign({}, this.currentOrder, formData);
    this.ordersService.updateOrder(newOrderData)
      .subscribe((data) => {
        this.router.navigateByUrl('/orders');
      });
  }
}
