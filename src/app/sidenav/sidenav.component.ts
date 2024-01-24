import { Component, Input, SecurityContext } from '@angular/core';
import { SidenavtoggleService } from '../Shared/sidenavtoggle.service';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
 @Input() sideNavStatus: boolean = false;
  isFeesDropdownVisible: boolean = false;
  iscustomerServiceVisible: boolean = false;
  isReportDropdownVisible : boolean = false;
  isacknowDropdownVisible : boolean = false ;
  isinsureinvestDropdownVisible : boolean = false;
  ismyaccountDropdown : boolean= false ;
  showSideNav = true;
  constructor(private sharedService: SidenavtoggleService,private router:Router) {
    this.sharedService.currentSideNavState.subscribe(
      (state) => (this.showSideNav = state)
    );
  }


  signout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "You Are LoggedOut!"
    }); 
  }



  toggleFeesDropdown() {
    this.isFeesDropdownVisible = !this.isFeesDropdownVisible;
    
  }

  togglecustomerService() {
    this.iscustomerServiceVisible = !this.iscustomerServiceVisible;
  }

  toggleReportDropdown(){
    this.isReportDropdownVisible = !this.isReportDropdownVisible;
  }
  toggleacknowDropdown(){
   this.isacknowDropdownVisible = !this.isacknowDropdownVisible ;
  }

  toggleinsureinvestDropdown(){
 this.isinsureinvestDropdownVisible = !this.isinsureinvestDropdownVisible;
}

  togglemyaccountDropdown(){
  this.ismyaccountDropdown = !this.ismyaccountDropdown ;
  }
}
function toggleDropdown(event: any) {
  var dropdownContent = event.target.parentElement.nextElementSibling;
  dropdownContent.classList.toggle("show");
}



