import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from './../../shared/models/order';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      this.ordersService.getById(this.activatedRoute.snapshot.params.id)
        .subscribe((order: Order) => {
          this.currentOrder = order;
          this.populateOrderForm(order);
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
        console.log(data);
      });
  }
}
