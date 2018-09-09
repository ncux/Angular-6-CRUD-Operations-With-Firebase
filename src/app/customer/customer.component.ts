import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerService.form.controls;

  ngOnInit() {
  }

  submitCustomerForm() {
    this.submitted = true;
    if (this.customerService.form.valid) {
      if (this.customerService.form.get('$key').value == null) {
        // create new customer record
        this.customerService.saveCustomer(this.customerService.form.value);
      } else {
        // update customer record
        this.customerService.updateCustomer(this.customerService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.customerService.form.reset();
    }
  }

}
