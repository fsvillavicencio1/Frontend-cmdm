import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-mi-empresa',
  templateUrl: './mi-empresa.component.html',
  styleUrls: ['./mi-empresa.component.css']
})
export class MiEmpresaComponent implements OnInit {
  isExpanded: boolean = false;
  isLoggedIn = false;

  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMicroBoard = this.roles.includes('ROLE_MICRO');
      this.username = user.username;
    }
  }

}
