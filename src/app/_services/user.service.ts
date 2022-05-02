import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


const SERVICE_API = 'http://localhost:8081/cmdm/services/';
const SERVICE_API_AZURE = 'https://prod-49.eastus2.logic.azure.com:443/workflows/47c4a422bf8745099ff2ff6ac93f5e03/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9g623ShbKSK9zGa0v04p3RY1YLe4YFrVjGzNxSDQLcc';
const SERVICE_API_EMAIL = 'https://prod-53.eastus2.logic.azure.com:443/workflows/344b41cea2af418fa8abca356e4418fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DeS4uTENIbg1W8ZRsQixnB_uRDCFXWN1gSgmV_3TOE0';
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

  getActividadId(id: number): Observable<any>{
    return this.http.get(SERVICE_API + 'actividad-id/' + id, {responseType: 'json'})
  }

  registerActividad(actividad: string): Observable<any> {
    return this.http.post(SERVICE_API + 'actividad', {
      actividad
    });
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

  updateActividad(id:number, actividad: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-actividad/' + id, {
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

  sendEmailStudent(email: string, cuerpo: string, url: string): Observable<any> {
    return this.http.post(SERVICE_API_EMAIL, {
      email,
      cuerpo,
      url
    }, httpOptions);
  }

  getAllEmpresas(): Observable<any> {
    return this.http.get(SERVICE_API + 'microempresas', { responseType: 'json' });
  }

  /*POSTS*/

  getPublicaciones(): Observable<any> {
    return this.http.get(SERVICE_API + 'posts', {responseType: 'json'});
  }

  registerPublicacion(titulo: string, descripcion: string, imagen: string): Observable<any> {
    return this.http.post(SERVICE_API + 'post', {
      titulo,
      descripcion, 
      imagen
    });
  }

  getPublicacionesId(id: number): Observable<any> {
    return this.http.get(SERVICE_API + 'post-id/' + id, {responseType: 'json'});
  }

  getPublicacionNombre(nombre: String): Observable<any> {
    return this.http.get(SERVICE_API + 'post-nombre/' + nombre, {responseType: 'json'});
  }

  updatePublicacion(id:number, titulo: string, descripcion: string, imagen: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-post/' + id, {
      titulo,
      descripcion,
      imagen
    });
  }

  updatePublicacionDetalles(id:number, titulo: string, descripcion: string, imagen: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-post-detalles/' + id, {
      titulo,
      descripcion,
      imagen
    });
  }

  deletePublicacion(id: number): Observable<any> {
    return this.http.delete(SERVICE_API + 'delete-post/' + id, {responseType: 'text'})
  }

}

