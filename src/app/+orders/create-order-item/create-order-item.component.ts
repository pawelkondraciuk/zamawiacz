import {
  Component,
  OnInit,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { OrderItemInputData } from './../../shared/models/orderItem';

import { OrderItemsService } from './../../shared/services/orderItems.service';

import { OrderItem } from '../../shared/models/orderItem';

@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.css']
})
export class CreateOrderItemComponent implements OnInit {

  public orderItemForm: FormGroup;
  private currentOrderId: string;

  constructor(
    private formBuilder: FormBuilder,
    private orderItemsService: OrderItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentOrderId = this.activatedRoute.snapshot.params.id;
    this.orderItemForm = this.formBuilder.group({
      name: [null, [
       Validators.required,
       Validators.minLength(3)
      ]],
      price: [null, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]]
    });
  }

  public onFormSubmit(formValue: OrderItemInputData) {
    this.addNewOrderItem(this.currentOrderId, formValue);
  }

  public addNewOrderItem(orderId: string, orderItemData: OrderItemInputData) {
    this.orderItemsService.createOrderItem(orderId, orderItemData)
    .subscribe((orderItem: OrderItem) => this.router.navigateByUrl('orders'));
  }
}
