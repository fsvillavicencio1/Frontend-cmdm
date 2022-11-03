import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


const SERVICE_API = 'http://localhost:8081/cmdm/services/';
const SERVICE_API_AZURE = 'https://prod-49.eastus2.logic.azure.com:443/workflows/47c4a422bf8745099ff2ff6ac93f5e03/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9g623ShbKSK9zGa0v04p3RY1YLe4YFrVjGzNxSDQLcc';
const SERVICE_API_EMAIL = 'https://prod-53.eastus2.logic.azure.com:443/workflows/344b41cea2af418fa8abca356e4418fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DeS4uTENIbg1W8ZRsQixnB_uRDCFXWN1gSgmV_3TOE0';
const UPDATE_RUC_LOGIC_APP = "https://prod-25.eastus2.logic.azure.com:443/workflows/ba2e772f85d2493b84d6e723450589ee/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cNR-TqWuEcpMAPNIFjLfOs2KG2jjUj5b8TM8zmkPc34";
/*const SRI_API = 'https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/obtenerPorNumerosRuc';*/

/*const DJANDO_API = 'http://127.0.0.1:8000/api/';*/
const DJANDO_API = 'https://app-digicom.azurewebsites.net/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /*Empresas*/
  updateEmpresaNombre(id:number, razonSocial: string, ruc: string, direccion: string, telefono: string, correo: string, paginaWeb: string, empleadosHombres: Number, empleadosMujeres: Number, tipo: string, actividad: string, perteneceAsociacion: string, quiereAsociacion: string, provincia: string, imagen: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-microempresa-nombre/' + id, {
      razonSocial,
      ruc,
      direccion,
      telefono,
      correo,
      paginaWeb,
      empleadosHombres,
      empleadosMujeres,
      tipo,
      actividad,
      perteneceAsociacion,
      quiereAsociacion,
      provincia,
      imagen
    });
  }

  updateEmpresaRuc(id:number, razonSocial: string, ruc: string, direccion: string, telefono: string, correo: string, paginaWeb: string, empleadosHombres: Number, empleadosMujeres: Number, tipo: string, actividad: string, perteneceAsociacion: string, quiereAsociacion: string, provincia: string, imagen: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-microempresa-ruc/' + id, {
      razonSocial,
      ruc,
      direccion,
      telefono,
      correo,
      paginaWeb,
      empleadosHombres,
      empleadosMujeres,
      tipo,
      actividad,
      perteneceAsociacion,
      quiereAsociacion,
      provincia,
      imagen
    });
  }
  
  updateEmpresaDetalles(id:number, razonSocial: string, ruc: string, direccion: string, telefono: string, correo: string, paginaWeb: string, empleadosHombres: Number, empleadosMujeres: Number, tipo: string, actividad: string, perteneceAsociacion: string, quiereAsociacion: string, provincia: string, imagen: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-microempresa-detalles/' + id, {
      razonSocial,
      ruc,
      direccion,
      telefono,
      correo,
      paginaWeb,
      empleadosHombres,
      empleadosMujeres,
      tipo,
      actividad,
      perteneceAsociacion,
      quiereAsociacion,
      provincia,
      imagen
    });
  }

  getEmpresa(id: number): Observable<any> {
    return this.http.get(SERVICE_API + 'get-microempresa-user/' + id, { responseType: 'json' });
  }

  getEmpresaId(id: number): Observable<any> {
    return this.http.get(SERVICE_API + 'microempresa/' + id, { responseType: 'json' });
  }

  updateEmpresaRUC_JSON(ruc_antiguo: string, ruc_nuevo: string): Observable<any> {
    return this.http.post(UPDATE_RUC_LOGIC_APP, {
      ruc_antiguo,
      ruc_nuevo
    }, httpOptions);
  }

  getAllEmpresas(): Observable<any> {
    return this.http.get(SERVICE_API + 'microempresas', { responseType: 'json' });
  }

  /*Tipos de microempresas*/
  getTipos(): Observable<any> {
    return this.http.get(SERVICE_API + 'tipos-microempresa', {responseType: 'json'});
  }

  getTipoId(id: number): Observable<any>{
    return this.http.get(SERVICE_API + 'tipo-microempresa/' + id, {responseType: 'json'})
  }

  registerTipo(tipo: string): Observable<any> {
    return this.http.post(SERVICE_API + 'tipo-microempresa', {
      tipo
    });
  }

  updateTipo(id:number, tipo: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-tipo-microempresa/' + id, {
      tipo
    });
  }

  deleteTipo(id: number): Observable<any> {
    return this.http.delete(SERVICE_API + 'delete-tipo-microempresa/' + id, {responseType: 'text'})
  }

  /*Actividades de microrempresas*/
  getActividades(): Observable<any> {
    return this.http.get(SERVICE_API + 'actividades-microempresa', {responseType: 'json'});
  }

  getActividadId(id: number): Observable<any>{
    return this.http.get(SERVICE_API + 'actividad-microempresa/' + id, {responseType: 'json'})
  }

  registerActividad(actividad: string): Observable<any> {
    return this.http.post(SERVICE_API + 'actividad-microempresa', {
      actividad
    });
  }

  updateActividad(id:number, actividad: string): Observable<any> {
    return this.http.put(SERVICE_API + 'update-actividad-microempresa/' + id, {
      actividad
    });
  }

  deleteActividad(id: number): Observable<any> {
    return this.http.delete(SERVICE_API + 'delete-actividad-microempresa/' + id, {responseType: 'text'})
  }

  /*Imagenes*/

  cargarImagen(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    return this.http.post(SERVICE_API + 'upload', formData, { responseType: 'text' });
  }


  /*Correo a estudiantes*/

  sendEmailStudent(email: string, cuerpo: string, url: string): Observable<any> {
    return this.http.post(SERVICE_API_EMAIL, {
      email,
      cuerpo,
      url
    }, httpOptions);
  }

  /*POSTS*/

  getPublicaciones(): Observable<any> {
    return this.http.get(SERVICE_API + 'posts', {responseType: 'json'});
  }

  registerPublicacion(fecha: string, titulo: string, descripcion: string, imagen: string, autor: string): Observable<any> {
    return this.http.post(SERVICE_API + 'post', {
      fecha,
      titulo,
      descripcion, 
      imagen,
      autor
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

  /*Metodos para API DJANGO*/
  getResultadosEmpresaCompetitividad(ruc: String, password: String): Observable<any> {
    return this.http.get(DJANDO_API + 'competitividad/' + ruc + '/' + password, { responseType: 'json' });
  }

  getResultadosPromedioCompetitividad(actividad: String): Observable<any> {
    return this.http.get(DJANDO_API + 'comp-promedio/' + actividad, { responseType: 'json' });
  }

  getResultadosEmpresaMadurez(ruc: String, password: String): Observable<any> {
    return this.http.get(DJANDO_API + 'madurez/' + ruc + '/' + password, { responseType: 'json' });
  }

  getResultadosPromedioMadurez(actividad: String): Observable<any> {
    return this.http.get(DJANDO_API + 'mad-promedio/' + actividad, { responseType: 'json' });
  }

  getEstadisticas(): Observable<any>{
    return this.http.get(DJANDO_API + 'estadisticas/', { responseType: 'json'});
  }



}

