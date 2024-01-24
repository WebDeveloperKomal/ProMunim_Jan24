import { Component } from '@angular/core';
import { ComplianceModel } from './compliance.component.model';

import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent {
  SearchText : any ;
  page = 1;
  pageSize = 10 ;
  currentPage: number = 1;
  countries: ComplianceModel[] | undefined;
  collectionSize =100;
  complianceList:ComplianceModel[]=[];

    
  permissions: any;
  Perstring:any;
  insertcompliance!:boolean;
  deletecompliance!:boolean;
  updatecompliance!:boolean;
  view!:boolean;
  viewRM!:boolean;
  viewbranch!:boolean;
  viewall!:boolean;


  constructor(private apiService:ApiService, private router:Router) {}
 
  ngOnInit(){
    this.Perstring = localStorage.getItem('permissions');
    if (this.Perstring) {
      this.permissions = JSON.parse(this.Perstring);
      this.permissions.forEach((permission: number) => {
        if (permission === 1112){this.insertcompliance = true};
        if (permission === 1113){this.deletecompliance = true};
        if (permission === 1114){this.updatecompliance = true};
        if (permission === 1115){this.view = true};
        if (permission === 1116){this.viewRM = true};
        if (permission === 1117){this.viewbranch = true};
        if (permission === 1118){this.viewall = true};
      });
    } else {
      console.log('No permissions data found in local storage.');
    };

    this.apiService.allCompliances().subscribe(
      (res:any)=>{this.complianceList=res.data;
        this.collectionSize = this.complianceList.length;
      },
      (error:any)=>{console.error(error);
      }
    )
  }


  edit(id:number){
    this.router.navigate([`/set/view-compliance/`+id]);
  }

  delete(id:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      }).then((result) => {
      if (result.isConfirmed) 
      {
        this.apiService.deleteCompliance(id).subscribe(
          (response:any)=>{
            console.log(response.data); 
            Swal.fire({
              title: "Record Deleted!",
              icon: "success"
            });
          },
          (error:any)=>{
            console.error(error);
            Swal.fire({
              title: "Error!",
              icon: "error"
            });
          }
        );
        // setInterval(()=>{window.location.reload()},1000);        
      }
    });
    
  }

  applyFilter(): void {
    if (!this.SearchText) {
      
      this.complianceList = [...this.complianceList];
      return;
    }
    const searchString = this.SearchText.toLowerCase();
    this.complianceList = this.complianceList.filter((data) =>
      data.complianceName.toLowerCase().includes(searchString) ||
      data.taxLink.toLowerCase().includes(searchString) ||
      data.complianceDueDate.toLowerCase().includes(searchString)||
      (data.complianceDueDate !== null && !isNaN(data.complianceDueDate) && data.complianceDueDate.toString().includes(searchString)) 
    );
  }
  
  
  refreshCountries() {
    this.countries = this.complianceList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
}
