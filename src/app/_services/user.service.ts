import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


const SERVICE_API = 'http://localhost:8081/cmdm/services/';
const SERVICE_API_AZURE = 'https://prod-49.eastus2.logic.azure.com:443/workflows/47c4a422bf8745099ff2ff6ac93f5e03/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9g623ShbKSK9zGa0v04p3RY1YLe4YFrVjGzNxSDQLcc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getEmpresa(id: number): Observable<any> {
    return this.http.get(SERVICE_API + 'get-microempresa-user/' + id, { responseType: 'json' });
  }

  getActividad(): Observable<any> {
    return this.http.get(SERVICE_API + 'actividad', {responseType: 'json'});
  }

  cargarImagen(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    return this.http.post(SERVICE_API + 'upload', formData, { responseType: 'text' });
  }

  updateEmpresa(id:number, empresa: string, ruc: string, mision: string, vision: string, imagen: string, actividad: []): Observable<any> {
    return this.http.put(SERVICE_API + 'update-microempresa/' + id, {
      empresa,
      ruc,
      mision,
      vision,
      imagen,
      actividad
    });
  }

  updateEmpresaDetalles(id:number, empresa: string, ruc: string, mision: string, vision: string, imagen: string, actividad: []): Observable<any> {
    return this.http.put(SERVICE_API + 'update-microempresa-detalles/' + id, {
      empresa,
      ruc,
      mision,
      vision,
      imagen,
      actividad
    });
  }

  getEmpresaId(id: number): Observable<any> {
    return this.http.get(SERVICE_API + 'microempresa/' + id, { responseType: 'json' });
  }

  updateEmpresaJSON(empresa_antes: string, empresa_ahora: string): Observable<any> {
    return this.http.post(SERVICE_API_AZURE, {
      empresa_antes,
      empresa_ahora
    
    }, httpOptions);
  }

  getAllEmpresas(): Observable<any> {
    return this.http.get(SERVICE_API + 'microempresas', { responseType: 'json' });
  }

}

