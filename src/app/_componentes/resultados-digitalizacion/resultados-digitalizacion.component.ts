import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from '../../_services/user.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resultados-digitalizacion',
  templateUrl: './resultados-digitalizacion.component.html',
  styleUrls: ['./resultados-digitalizacion.component.css']
})
export class ResultadosDigitalizacionComponent implements OnInit {
  @ViewChild('content', {static:false}) el!: ElementRef;
  empresa?: { ruc: string };
  form: any = {
    ruc: null,
    password: null
  };
  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  state = '';
  datos_empresa: any = [];
  promedios = {
    promedio1: 0,
    promedio2: 0,
    promedio3: 0,
    promedio4: 0,
    promediototal: 0,
  };
  colores: any = [];
  color_promedio = '';
  niveles: any = [];

   /*Variables para obtener ultimos datos*/
   razon_social = '';
   ruc = '';
   tipo = '';
   actividad = '';
   provincia = '';
   fecha = ''
   dimension1 = 0;
   dimension2 = 0;
   dimension3 = 0;
   dimension4 = 0;
   
   /** */
  porcentajes: any = [
    {
      "No existe": "0 %",
      "Muy Bajo": "0.1 % - 20.99 %",
      "Bajo": "21 % - 40.99 %",
      "Mediano": "41 % - 60.99 %",
      "Alto": "61 % - 80.99 %",
      "Muy Alto": "81 % - 100 %"
    }
  ];
  colores_rec: any = [
    {
      "No existe": "#808080",
      "Muy Bajo": "#E02525",
      "Bajo": "#E1770D",
      "Mediano": "#CCC01D",
      "Alto": "#5BCD18",
      "Muy Alto": "#17942E"
    }
  ];

  /**Recomendaciones */
  recomendaciones: any = [
    {
      "No existe": "El concepto crecimiento digital hace referencia a la utilización de las tecnologías digitales como palanca de crecimiento de la empresa. Se necesita que la empresa reconozca la oportunidad que brinda el crecimiento digital para contribuir a aumentar sus ingresos y reducir sus costes a través de procesos más eficientes, una mejor colaboración y nuevas ofertas de productos y servicio.",
      "Muy Bajo": "La empresa debe identificar oportunidades de crecimiento digital.",
      "Bajo": "Hemos empezado a buscar oportunidades de crecimiento sustentadas en lo digital. La empresa debe identificar líderes que pongan en marcha, coordinen y supervise iniciativas digitales, y además, promuevan la implementación de estas por parte de los empleados.",
      "Mediano": "Hemos detectado algunas oportunidades de crecimiento digital. La empresa debe iniciar su proceso de digitalización y revisar que su estrategia incluya posibilidades de crecimiento basadas en lo digital.",
      "Alto": "Identificamos oportunidades de crecimiento sustentadas en lo digital, pero no de forma sistemática. La empresa tiene actualizada su estrategia que incluye posibilidades de crecimiento basadas en lo digital y además, motiva a los empleados a emprender iniciativas digitales dentro de la misma.",
      "Muy Alto": "Identificamos oportunidades de crecimiento sustentadas en lo digital de forma sistemática. Las iniciativas digitales deben tener alta prioridad en la empresa, y su estrategia de crecimiento e innovación debe estar acompañada de una visión digital única. La visión digital única implica construir un modelo mental compartido por los miembros de la organización favorable y proclive a la digitalización de la empresa."
    },
    {
      "No existe": "La empresa debe contar con una estrategia de crecimiento digital elaborada participativamente con sus empleados. Esta estrategia debe estar basada en el aprovechamiento de las oportunidades de crecimiento que brindan las tecnologías digitales y la incorporación y aplicación de las mismas en la organización.",
      "Muy Bajo": "La empresa debe identificar a los empleados que implementan iniciativas digitales de manera individual o influyen para la adopción en su entorno, esto para incentivar el liderazgo que promueva la digitalización de la empresa.",
      "Bajo": "La empresa debe identificar líderes que pongan en marcha, coordinen y supervise iniciativas digitales, y además, promuevan la implementación de estas por parte de los empleados.",
      "Mediano": "La empresa debe iniciar su proceso de digitalización y revisar que su estrategia incluya posibilidades de crecimiento basadas en lo digital.",
      "Alto": "La empresa tiene actualizada su estrategia que incluye posibilidades de crecimiento basadas en lo digital y además, motiva a los empleados a emprender iniciativas digitales dentro de la misma.",
      "Muy Alto": "Las iniciativas digitales deben tener alta prioridad en la empresa, y su estrategia de crecimiento e innovación debe estar acompañada de una visión digital única. La visión digital única implica construir un modelo mental compartido por los miembros de la organización favorable y proclive a la digitalización de la empresa."
    },
    {
      "No existe": "La empresa debe contar con un modelo de negocio digital elaborada partir de los objetivos de la empresa. Este modelo de negocio debe estar enmarada con estrategias de proyectos o metodologías para implantar iniciativas de digitalización apoyados en procesos y habilidades de digitalización.",
      "Muy Bajo": "La empresa debe mantener una mínima comunicación digital con los clientes fundamentados en proyectos de digitalización, estableciendo procesos mínimos de digitalización y habilidades básicas para la empresa.",
      "Bajo": "La empresa debe identificar nuevos modelos de negocio basados en estrategias y procesos digitales, la utilización de plataformas web de comunicación con el cliente es un punto estratégico para la comunicación entre actores, acompañado de metodologías ágiles para los procesos.",
      "Mediano": "La empresa debe mejorar su proceso de digitalización utilizando nuevos canales de digitalización también realizando medidas de aceptación en el mercado digital. La empresa debe mostrar resultados en base a datos de los clientes.",
      "Alto": "La empresa tiene contar con un modelo de negocio digital que genere recursos económicos, contando con una reputación alta en el ámbito digital y reforzando los procesos y estrategias ágiles con todos los actores involucrados.",
      "Muy Alto": "Las empresa debe mantener su presencia digital midiendo y difundiendo resultados en diferentes medios de comunicación. La empresa debe gestionar procesos de consultoría para otras empresas que están creciendo. La empresa debe mantener activo los procesos ágiles que dan buenos resultaos y mantienen en buena reputación lo logrado."
    },
    {
      "No existe": "El gestionar recursos para la transformación digital, implica contar con habilidades digitales dentro de la organización, el tener procesos digitalizados, una tecnología y seguridad mínima, así como realizar inversiones enfocadas hacia la digitalización. Se necesita que la empresa reconozca la importancia de asignar y gestionar recursos enfocados a la transformación digital como una estrategia de competitividad y crecimiento.",
      "Muy Bajo": "Si bien se registran algunas acciones que dan cuenta de una gestión de recursos inicial para la transformación digital, la empresa tiene que fortalecer la formación de habilidades digitales, la digitalización de procesos, la adopción de tecnologías, así como la inversión en iniciativas tecnológicas.",
      "Bajo": "La empresa debe fortalecer las habilidades digitales en varios ámbitos o áreas de negocio, iniciar la digitalización de procesos con interacción externa, a integrar la tecnología como parte de la estrategia y que ello se refleje como una inversión en las iniciativas tecnológicas.",
      "Mediano": "La empresa debe ampliar la cobertura de áreas con habilidades digitales y plantear programas específicos para el desarrollo de las mismas, la digitalización de procesos deberá ser más amplia y fortalecer la interacción con agentes externos, la tecnología tiene que dar soporte a los procesos críticos del a organización garantizando la seguridad necesaria.",
      "Alto": "Los programas de formación digital tienen que cubrir a todos los empleados en la empresa, además de implantar un modelo de gestión formal para monitorear la digitalización de los procesos, la implementación de soluciones tecnológicas tiene que obedecer a una estrategia integrada, planificación e inversión.",
      "Muy Alto": "La empresa tiene una gestión adecuada de recursos enfocados a la transformación digital, es importante su evaluación continua para actualizar constantemente las estrategias tecnológicas en función de sus indicadores de competitividad, y actualizar los planes de formación, digitalización e inversión necesarios."
    },
  ]
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  resultados: any = [{ dimension: '', nivel: '', recomendacion: '', porcentaje: '', color: '' }];

  constructor(private rutaActiva: ActivatedRoute, private userService: UserService,) {}
  
  ngOnInit(): void {

    this.empresa = {
      ruc: this.rutaActiva.snapshot.params?.['ruc'],
    };

    var ruc_valido = this.empresa.ruc.split("'").join('');
    this.form.ruc = ruc_valido;  
  }

  onSubmit(): void {
    this.loading = true;
    const { ruc, password } = this.form;

    this.userService.getResultadosEmpresaMadurez(ruc, password).subscribe(
      data => {

        if (data.message == 'Success') {
          this.datos_empresa = data.madurez;
          this.obtener_ultimos_datos();
        }
        else {
          this.isLoginFailed = true;
          this.loading = false;
          this.state = data.message;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  obtener_ultimos_datos() {
    var len = this.datos_empresa.length;
    this.razon_social = this.datos_empresa[len - 1]['razon_social'];
    this.ruc = this.datos_empresa[len - 1]['ruc'];
    this.tipo = this.datos_empresa[len - 1]['tipo'];
    this.actividad = this.datos_empresa[len - 1]['actividad'];
    this.provincia = this.datos_empresa[len - 1]['provincia'];
    this.fecha = this.datos_empresa[len - 1]['fecha'];
    this.dimension1 = this.datos_empresa[len - 1]['dimension1'];
    this.dimension2 = this.datos_empresa[len - 1]['dimension2'];
    this.dimension3 = this.datos_empresa[len - 1]['dimension3'];
    this.dimension4 = this.datos_empresa[len - 1]['dimension4'];

    this.obtener_colores();
    this.obtener_niveles();
    this.obtener_promedios();
  }

  obtener_promedios() {
    this.userService.getResultadosPromedioMadurez(this.actividad).subscribe(
      data => {
        //this.promedios = data.promedios;
        this.promedios.promedio1 = data.promedios['dimension1__avg'].toFixed(2);
        this.promedios.promedio2 = data.promedios['dimension2__avg'].toFixed(2);
        this.promedios.promedio3 = data.promedios['dimension3__avg'].toFixed(2);
        this.promedios.promedio4 = data.promedios['dimension4__avg'].toFixed(2);
        this.promedios.promediototal = data.promedios['total__avg'].toFixed(2);

        this.loading = false;
        this.isLoggedIn = true;

        /*Obtener color del promedio*/
        if (this.promedios.promediototal > 0 && this.promedios.promediototal <= 20.99) {
          this.color_promedio = '#E02525';
        }
        else if (this.promedios.promediototal > 21 && this.promedios.promediototal <= 40.99) {
          this.color_promedio = '#E1770D';
        }
        else if (this.promedios.promediototal > 41 && this.promedios.promediototal <= 60.99) {
          this.color_promedio = '#CCC01D';
        }
        else if (this.promedios.promediototal > 61 && this.promedios.promediototal <= 80.99) {
          this.color_promedio = '#5BCD18';
        }
        else {
          this.color_promedio = '#17942E';
        }
      }
    );

  }

  obtener_colores() {
    /*Obtener el color de la competitividad total*/
    for (let i = 0; i < this.datos_empresa.length; i++) {
      if (this.datos_empresa[i]['total'] > 0 && this.datos_empresa[i]['total'] <= 20.99) {
        this.colores[i] = '#E02525';
      }
      else if (this.datos_empresa[i]['total'] > 21 && this.datos_empresa[i]['total'] <= 40.99) {
        this.colores[i] = '#E1770D';
      }
      else if (this.datos_empresa[i]['total'] > 41 && this.datos_empresa[i]['total'] <= 60.99) {
        this.colores[i] = '#CCC01D';
      }
      else if (this.datos_empresa[i]['total'] > 61 && this.datos_empresa[i]['total'] <= 80.99) {
        this.colores[i] = '#5BCD18';
      }
      else {
        this.colores[i] = '#17942E';
      }
    }
  }

  obtener_niveles() {
    /*Dimension 1*/
    if (this.dimension1 >= 0 && this.dimension1 < 5.25) {
      this.niveles[0] = 'Muy Bajo'
    }
    else if (this.dimension1 >= 5.25 && this.dimension1 < 10.25) {
      this.niveles[0] = 'Bajo'
    }
    else if (this.dimension1 >= 10.25 && this.dimension1 < 15.25) {
      this.niveles[0] = 'Mediano'
    }
    else if (this.dimension1 >= 15.25 && this.dimension1 < 20.25) {
      this.niveles[0] = 'Alto'
    }
    else {
      this.niveles[0] = 'Muy Alto'
    }
     /*Dimension 2*/
     if (this.dimension2 >= 0 && this.dimension2 < 5.25) {
      this.niveles[1] = 'Muy Bajo'
    }
    else if (this.dimension2 >= 5.25 && this.dimension2 < 10.25) {
      this.niveles[1] = 'Bajo'
    }
    else if (this.dimension2 >= 10.25 && this.dimension2 < 15.25) {
      this.niveles[1] = 'Mediano'
    }
    else if (this.dimension2 >= 15.25 && this.dimension2 < 20.25) {
      this.niveles[1] = 'Alto'
    }
    else {
      this.niveles[1] = 'Muy Alto'
    }
    /*Dimension 3*/
    if (this.dimension3 >= 0 && this.dimension3 < 5.25) {
      this.niveles[2] = 'Muy Bajo'
    }
    else if (this.dimension3 >= 5.25 && this.dimension3 < 10.25) {
      this.niveles[2] = 'Bajo'
    }
    else if (this.dimension3 >= 10.25 && this.dimension3 < 15.25) {
      this.niveles[2] = 'Mediano'
    }
    else if (this.dimension3 >= 15.25 && this.dimension3 < 20.25) {
      this.niveles[2] = 'Alto'
    }
    else {
      this.niveles[2] = 'Muy Alto'
    }
    /*Dimension 4*/
    if (this.dimension4 >= 0 && this.dimension4 < 5.25) {
      this.niveles[3] = 'Muy Bajo'
    }
    else if (this.dimension4 >= 5.25 && this.dimension4 < 10.25) {
      this.niveles[3] = 'Bajo'
    }
    else if (this.dimension4 >= 10.25 && this.dimension4 < 15.25) {
      this.niveles[3] = 'Mediano'
    }
    else if (this.dimension4 >= 15.25 && this.dimension4 < 20.25) {
      this.niveles[3] = 'Alto'
    }
    else {
      this.niveles[3] = 'Muy Alto'
    }

    this.cargar_recomendaciones();
  }

  cargar_recomendaciones(){
    console.log("Hola")
    this.resultados = [
      {
        dimension: "Identificar oportunidades potenciales de crecimiento digital",
        nivel: this.niveles[0],
        recomendacion: this.recomendaciones[0][this.niveles[0]],
        porcentaje: this.porcentajes[0][this.niveles[0]],
        color: this.colores_rec[0][this.niveles[0]]
      },
      {
        dimension: "Desarrollar una estrategia y mentalidad de crecimiento digital",
        nivel: this.niveles[1],
        recomendacion: this.recomendaciones[1][this.niveles[1]],
        porcentaje: this.porcentajes[0][this.niveles[1]],
        color: this.colores_rec[0][this.niveles[1]]
      },
      {
        dimension: "Aprovechar las oportunidades potenciales de crecimiento sustentado en lo digital",
        nivel: this.niveles[2],
        recomendacion: this.recomendaciones[2][this.niveles[2]],
        porcentaje: this.porcentajes[0][this.niveles[2]],
        color: this.colores_rec[0][this.niveles[2]]
      },
      {
        dimension: "Gestionar recursos para la transformación digital",
        nivel: this.niveles[3],
        recomendacion: this.recomendaciones[3][this.niveles[3]],
        porcentaje: this.porcentajes[0][this.niveles[3]],
        color: this.colores_rec[0][this.niveles[3]]
      }
    ]
    console.log(this.resultados)
  }

  generatePDF(){
    let pdf = new jsPDF('l', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("RecomendacionesMadurezDigital.pdf");
      }
    })
  }

}
