import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customersArray = [];
  showDeletedMessage: boolean;
  searchTerm: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customersArray = customers.map(customer => {return {$key: customer.key, ...customer.payload.val()};});
    });
  }

  deleteCustomer($key) {
    if (confirm('Delete this record?!')) {this.customerService.deleteCustomer($key)}
    this.showDeletedMessage = true;
    setTimeout(() => this.showDeletedMessage = false, 3000);
  }

  filterCondition(customer) {
    return customer.fullname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1;
  }

}
