import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('')
  });

  getAllCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  saveCustomer(customer) {
    this.customerList.push({fullname: customer.fullname, email: customer.email, phone: customer.phone, location: customer.location});
  }

  populateForm(customer) {
    this.form.setValue(customer);
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key, {fullname: customer.fullname, email: customer.email, phone: customer.phone, location: customer.location});
  }

  deleteCustomer($key) {
    this.customerList.remove($key);
  }

}
