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
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

}
