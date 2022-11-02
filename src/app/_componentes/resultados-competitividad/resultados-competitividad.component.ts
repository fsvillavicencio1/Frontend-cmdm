import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from '../../_services/user.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resultados-competitividad',
  templateUrl: './resultados-competitividad.component.html',
  styleUrls: ['./resultados-competitividad.component.css']
})
export class ResultadosCompetitividadComponent implements OnInit {
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
    promedio5: 0,
    promedio6: 0,
    promedio7: 0,
    promedio8: 0,
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
  dimension5 = 0;
  dimension6 = 0;
  dimension7 = 0;
  dimension8 = 0;

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
      "No existe": "Comenzar con el desarrollo de la estrategia definiendo: misión, valores y visión; y además, revisar la situación en su entorno competitivo y operativo (externo e interno), especialmente los cambios que han ocurrido desde la última vez que diseñó su estrategia.",
      "Muy Bajo": "Planificar la estrategia mediante el desarrollo de objetivos, medidas, metas, iniciativas y presupuestos estratégicos. Para esto se debe: crear mapas estratégicos, seleccionar medidas y objetivos, elegir iniciativas estratégicas, establecer el presupuesto para financiar las iniciativas estratégicas y crear equipos temáticos.",
      "Bajo": "Vincular la estrategia de la empresa con las estrategias de sus unidades funcionales y de negocios individuales. Todos los empleados deben comprender la estrategia y deben estar motivados para ayudar a la empresa a tener éxito con la estrategia. Para esto se debe alinear: las unidades de negocio, las unidades de apoyo y los empleados.",
      "Mediano": "Alinear sus actividades de mejora de procesos con prioridades estratégicas, además, el financiamiento de los recursos para operar el negocio debe ser coherente con el plan estratégico. Para esto se debe: mejorar los procesos clave y desarrollar el plan de capacidad de recursos.",
      "Alto": "Examinar el desempeño funcional y departamental para abordar los problemas que han surgido o persisten, para lo cual, se deben llevar a cabo reuniones de revisión de la estrategia para discutir los indicadores e iniciativas del Cuadro de Mando Integral (Balanced Scorecard) de la unidad y evaluar el progreso y las barreras para la ejecución de la estrategia.",
      "Muy Alto": "Probar si los supuestos estratégicos fundamentales siguen siendo válidos. Actualizar la estrategia implica modificar el mapa estratégico y el Cuadro de Mando Integral de la organización, dando origen a un ciclo de mejora continua en la planeación estratégica."
    },
    {
      "No existe": "Concientizar a la organización para enfocar su gestión hacia la mejora continua, a través de procesos de capacitación y formación continua en temas de calidad. Planificar sistema de gestión de la calidad identificando necesidades de clientes en relación a la satisfacción en función de la calidad de productos y/o servicios ofrecidos por la empresa.",
      "Muy Bajo": "Comunicar a todo el personal sobre procesos en la gestión de la calidad dentro de la empresa, beneficios y oportunidades para alcanzar mayor productividad. Implementar la calidad como política de trabajo en la empresa. Diseñar un sistema de documentación que responda al modelo de gestión aplicable para cada tipo de empresa, de tal manera que se genere una cultura de transparencia y comunicación efectiva.",
      "Bajo": "Implantar el sistema de gestión de la calidad en todos los niveles de la empresa y con el involucramiento de todas las personas que laboran en la organización, de tal manera que se fomente la calidad como eje central en el modelo de negocio de la empresa. Aplicar procesos de automatización y uso de tecnologías que apoyen a la regulación de procesos de calidad en la empresa.",
      "Mediano": "Dar seguimiento y continuidad al sistema de gestión de la calidad en la empresa, y aplicar estrategias de medición del sistema de gestión de la calidad para evaluar resultados y efectividad de manera periódica.",
      "Alto": "Fomentar la mejora continua como filosofía de negocio, gestionando procesos que permitan la reducción de errores y de desperdicios. Uso efectivo de materias primas, aumentando la eficiencia de la empresa en sus procesos productivos y prestación de servicios a los clientes.",
      "Muy Alto": "Gestionar la implementación de estrategias de control de calidad a través del uso de sistemas basados en el uso de la tecnología y redes de comunicación. Aplicar procesos de certificación que permitan la acreditación de la empresa en relación a su gestión con enfoque en calidad y mejora continua. La mejora continua permitirá optimizar y estandarizar procesos, creando valor para el consumidor y con ello generar leAltod."
    },
    {
      "No existe": "Iniciar con la desagregación de las actividades primarias y de apoyo de la empresa dentro del proceso productivo o de servicio.",
      "Muy Bajo": "Implementar controles en las diferentes áreas involucradas en el proceso productivo o servicio.",
      "Bajo": "Determinar las fuentes de competitividad de las partes o aspectos de la empresa que contribuyen a la generación de valor para el cliente. Planificar la producción acorde a la demanda del mercado y el proceso productivo y de servicio cuenta con cierto grado de flexibilidad para adaptarse a las demandas del mercado y acorde la capacidad instalada de su empresa.",
      "Mediano": "Incorporar de la tecnología en algunas actividades del proceso productivo o de servicio. Fortalecer las áreas de comunicación y servicio al cliente con las TI, así de conocer el nivel de satisfacción del cliente y sus tendencias de consumo.",
      "Alto": "Incorporar a las actividades primarias y de apoyo de la cadena productiva los procesos de innovación para satisfacer de manera la experiencia del cliente y a generar ventajas competitivas en el mercado.",
      "Muy Alto": "Fortalecer el proceso productivo y todas las áreas de la empresa, con el apoyo tecnológico. Establecer en la empresa un sistema de D+I+i que les permita ser competitivas en el largo plazo."
    },
    {
      "No existe": "Diseñar un plan y estrategia de merchandising con la finalidad de incrementar la colocación y visibilización de los productos y/o servicios en el mercado.",
      "Muy Bajo": "Diseñar un plan y estrategia de merchadasing basado en el perfil del cliente y en un ciclo de mejora continua.",
      "Bajo": "Fortalecer y evolucionar a estrategias de marketing en base a la satisfacción del cliente, a sus sugerencias y necesidades. Establece indicadores y metas.",
      "Mediano": "Integrar a la estrategia de marketing un enfoque 360 que involucre a todos los productos y servicios orientados al cliente. Utiliza la información que genera de sus clientes para la toma de decisiones.",
      "Alto": "Diseñar e implementar una estrategia de marketing digital que además de un enfoque personalizado hacia el cliente, llega a él a través de diferentes canales tradicionales y digitales, trasladando el concepto de la marca al punto de venta .",
      "Muy Alto": "Su estrategia de marketing deberá integrar ampliamente las posibilidades de las nuevas tecnologías de información, adaptando las estrategias al segmento de cliente además de su perfil y características más digitales, trasladando además del concepto de marca la experiencia de compra. Además, se maneja como una estrategia de comunicación y no solo de ventas. Aplica herramientas de analítica para el mejoramiento de la estrategia."
    },
    {
      "No existe": "Implementar un sistema contable básico acorde a la actividad de la empresa que permite medir la evolución del patrimonio y el resultado periódico de la empresa y se realizan estados financieros de manera mensual y periódica acorde a su actividad económica.",
      "Muy Bajo": "Implementar un sistema de costos que le permita interpretar los costos de adquisición, producción, distribución, administración y financiamiento.",
      "Bajo": "Establecer controles y procesos adecuados para la recuperación y cobranza de las ventas a crédito y de manejo de inventarios de las mercancías o materiales para la producción.",
      "Mediano": "Establecer una planificación financiera sostenible considerando todos los gastos programados, metas de crecimiento, inversiones en tecnología, implementación de políticas de sostenibilidad que le permitan minimizar sus riesgos que se enfrenta toda empresa. Definir métricas necesarias para evaluar los objetivos propuestos por la organización en las diferentes áreas funcionales; así como la incorporación de políticas de un plan financiero sostenible.",
      "Alto": "Tomar decisiones apoyadas con la generación de información de datos en tipo real, la inclusión de las nuevas tecnologías debe apoyar a la gestión financiera de manera ágil y oportuna. Integrar la tecnológica en todas las áreas de la empresa, el acceso a la generación de reportes e información es más accesible gracias al uso de soluciones modernas como el cloud, así como a los controles de calidad en los procesos y de seguridad del sistema de la empresa.",
      "Muy Alto": "Incluir dentro de la planificación financiera, los rubros necesarios relacionados con la sostenibilidad de la empresa, así como la transformación digital de las áreas y procesos de la empresa."
    },
    {
      "No existe": "Concientizar a la organización sobre la relevancia de gestionar adecuadamente el talento humano como base fundamental para potenciar el desempeño y logro de objetivos. Analizar la necesidad de implementar un sistema de gestión del talento humano para optimar el uso de recursos dentro de la empresa y mejorar la calidad de productos y/o servicios ofrecidos por la misma.",
      "Muy Bajo": "Diseñar un plan de gestión del talento humano para que se aplique de manera adecuada el proceso de reclutamiento, selección, contratación, capacitación y promoción del personal dentro de la empresa. Definir objetivos, metas y actores; estableciendo con claridad roles y funciones, de tal manera que todo el personal conozca niveles jerárquicos y líneas de mando (manual de procesos y funciones). Implementar políticas que promuevan el liderazgo y la motivación a través del trabajo colaborativo. Establecer estrategias y acciones de salud y seguridad ocupacional. Fortalecer el sentido de pertenencia, que se produzca en los empleados la sensación de que son parte de la empresa e intégralos a los procesos de crecimiento.",
      "Bajo": "Desarrollar procesos de capacitación permanente para el personal. Potenciar el trabajo en equipo. Promover el desarrollo de competencias y habilidades para una mejor gestión de tareas en toda la organización. Retroalimentar oportunamente las actividades dentro de la empresa, considerar la opinión de tus colaboradores como parte del proceso de toma de decisiones. Mejorar la comunicación interna y relaciones laborales para optimizar recursos y lograr metas y objetivos organizacionales.",
      "Mediano": "Aplicar procesos de división y especialización en puestos de trabajo, considerando la experiencia y trayectoria profesional de los empleados. Implementar programas de incentivos económicos y no económicos.",
      "Alto": "Implementar los círculos de calidad como estrategia para fortalecer el desempeño grupal y mejorar el trabajo colaborativo a través de los equipos autodirigidos. Fomentar el trabajo autónomo como estrategia de desarrollo y experiencia laboral.",
      "Muy Alto": "Aplicar procesos de evaluación permanente del desempeño a través de la implementación de sistemas automatizados que aseguren información oportuna para la toma de decisiones en relación a estándares e indicadores."
    },
    {
      "No existe": "Es necesario identificar y definir una estrategia de adopción de gestión ambiental, los requerimientos, entrada, proceso y salidas; y en general para la planeación, diseño e implementación de procesos ambientales",
      "Muy Bajo": "Es necesario identificar y definir una estrategia de adopción de gestión ambiental, los requerimientos, entrada, proceso y salidas; y en general para la planeación, diseño e implementación de procesos ambientales. Diseñar un plan y estrategia de gestión ambiental basado en el perfil de la empresa u cliente y la concientización de cumplirlas regularmente.",
      "Bajo": "Es necesario realizar una campaña de socialización, difusión y regularización de los procesos y estrategias ambientales de la empresa y cliente.",
      "Mediano": "Implementar técnicas de diagnóstico para los procesos y técnicas ambientales a los actores involucrados en la empresa y clientes. Establecer estrategias de gestión y cumplimiento de las estrategias o estándares ambientales para los integrantes de la organización.",
      "Alto": "Establecer políticas de certificaciones o reconocimientos para garantizar un proceso formal y estandarizado para la empresa. Ajustar la estrategia de planeación de la adopción de procesos ambientales a la estrategia organizacional",
      "Muy Alto": "Analizar y realizar los ajustes necesarios a la estrategia ambientales. Socialización y difusión de los resultados obtenidos en la implementación de procesos ambientales. Establecer, documentar y socializar los procesos o técnicas ambientales implementadas para ser replicadas en otras organizaciones."
    },
    {
      "No existe": "Identificar la necesidad de adoptar tecnologías y sistemas de la información.",
      "Muy Bajo": "Preparar la organización para la adopción de tecnologías y sistemas de la información (cadena de valor, procesos primarios y secundarios). Identificar y definir la estrategia para la planeación, diseño e implementación de las tecnologías de la información. Realizar la planeación de una estrategia de gestión de sistemas y tecnologías de la información que aporte a la estrategia organizacional de la empresa.",
      "Bajo": "Realizar un diagnóstico de los sistemas de información que dispone la empresa; ¿Están aportando a lograr los objetivos de la empresa? ¿Están siendo gestionados adecuadamente? ¿Se pueden mejorar?. Planear y diseñar una estrategia de gestión de sistemas y tecnologías de la información que aporte a la estrategia organizacional de la empresa.",
      "Mediano": "Revisar la estrategia de gestión de los sistemas de información en la empresa, sus entradas, proceso y salidas. Implementar, adoptar o mejorar la estrategia de gestión de sistemas y tecnologías de la información que permita alinear la TI a la estrategia organizacional, aporten valor, ventaja competitiva y generen innovación a la empresa. Evaluar la incorporación de tecnologías para la digitalización orientadas a la gestión de datos, nube, seguridad de la información.",
      "Alto": "Evaluar con miras a la mejora de la estrategia de digitalización de la empresa, enfatizar en la incorporación de ciberseguridad, protección de endpoints, nube híbrida, etc.",
      "Muy Alto": "Analizar y realizar los ajustes necesarios a la estrategia de digitalización de la empresa."
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

    this.userService.getResultadosEmpresaCompetitividad(ruc, password).subscribe(
      data => {

        if (data.message == 'Success') {
          this.datos_empresa = data.competitividad;
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
    this.dimension5 = this.datos_empresa[len - 1]['dimension5'];
    this.dimension6 = this.datos_empresa[len - 1]['dimension6'];
    this.dimension7 = this.datos_empresa[len - 1]['dimension7'];
    this.dimension8 = this.datos_empresa[len - 1]['dimension8'];

    this.obtener_colores();
    this.obtener_niveles();
    this.obtener_promedios();
  }

  obtener_promedios() {
    this.userService.getResultadosPromedioCompetitividad(this.actividad).subscribe(
      data => {
        //this.promedios = data.promedios;
        this.promedios.promedio1 = data.promedios['dimension1__avg'].toFixed(2);
        this.promedios.promedio2 = data.promedios['dimension2__avg'].toFixed(2);
        this.promedios.promedio3 = data.promedios['dimension3__avg'].toFixed(2);
        this.promedios.promedio4 = data.promedios['dimension4__avg'].toFixed(2);
        this.promedios.promedio5 = data.promedios['dimension5__avg'].toFixed(2);
        this.promedios.promedio6 = data.promedios['dimension6__avg'].toFixed(2);
        this.promedios.promedio7 = data.promedios['dimension7__avg'].toFixed(2);
        this.promedios.promedio8 = data.promedios['dimension8__avg'].toFixed(2);
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
    if (this.dimension1 >= 0 && this.dimension1 < 4.09) {
      this.niveles[0] = 'Muy Bajo'
    }
    else if (this.dimension1 >= 4.09 && this.dimension1 < 7.99) {
      this.niveles[0] = 'Bajo'
    }
    else if (this.dimension1 >= 7.99 && this.dimension1 < 11.89) {
      this.niveles[0] = 'Mediano'
    }
    else if (this.dimension1 >= 11.89 && this.dimension1 < 15.79) {
      this.niveles[0] = 'Alto'
    }
    else {
      this.niveles[0] = 'Muy Alto'
    }
     /*Dimension 2*/
     if (this.dimension2 >= 0 && this.dimension2 < 1.092) {
      this.niveles[1] = 'Muy Bajo'
    }
    else if (this.dimension2 >= 1.092 && this.dimension2 < 2.13) {
      this.niveles[1] = 'Bajo'
    }
    else if (this.dimension2 >= 2.13 && this.dimension2 < 3.17) {
      this.niveles[1] = 'Mediano'
    }
    else if (this.dimension2 >= 3.17 && this.dimension2 < 4.21) {
      this.niveles[1] = 'Alto'
    }
    else {
      this.niveles[1] = 'Muy Alto'
    }
    /*Dimension 3*/
    if (this.dimension3 >= 0 && this.dimension3 < 4.64) {
      this.niveles[2] = 'Muy Bajo'
    }
    else if (this.dimension3 >= 4.64 && this.dimension3 < 9.06) {
      this.niveles[2] = 'Bajo'
    }
    else if (this.dimension3 >= 9.06 && this.dimension3 < 13.48) {
      this.niveles[2] = 'Mediano'
    }
    else if (this.dimension3 >= 13.48 && this.dimension3 < 17.9) {
      this.niveles[2] = 'Alto'
    }
    else {
      this.niveles[2] = 'Muy Alto'
    }
    /*Dimension 4*/
    if (this.dimension4 >= 0 && this.dimension4 < 2.18) {
      this.niveles[3] = 'Muy Bajo'
    }
    else if (this.dimension4 >= 2.18 && this.dimension4 < 4.26) {
      this.niveles[3] = 'Bajo'
    }
    else if (this.dimension4 >= 4.26 && this.dimension4 < 6.34) {
      this.niveles[3] = 'Mediano'
    }
    else if (this.dimension4 >= 6.34 && this.dimension4 < 8.42) {
      this.niveles[3] = 'Alto'
    }
    else {
      this.niveles[3] = 'Muy Alto'
    }
    /*Dimension 5*/
    if (this.dimension5 >= 0 && this.dimension5 < 1.63) {
      this.niveles[4] = 'Muy Bajo'
    }
    else if (this.dimension5 >= 1.63 && this.dimension5 < 3.19) {
      this.niveles[4] = 'Bajo'
    }
    else if (this.dimension5 >= 3.19 && this.dimension5 < 4.75) {
      this.niveles[4] = 'Mediano'
    }
    else if (this.dimension5 >= 4.75 && this.dimension5 < 6.31) {
      this.niveles[4] = 'Alto'
    }
    else {
      this.niveles[4] = 'Muy Alto'
    }
    /*Dimension 6*/
    if (this.dimension6 >= 0 && this.dimension6 < 3.54) {
      this.niveles[5] = 'Muy Bajo'
    }
    else if (this.dimension6 >= 3.54 && this.dimension6 < 6.92) {
      this.niveles[5] = 'Bajo'
    }
    else if (this.dimension6 >= 6.92 && this.dimension6 < 10.3) {
      this.niveles[5] = 'Mediano'
    }
    else if (this.dimension6 >= 10.3 && this.dimension6 < 13.68) {
      this.niveles[5] = 'Alto'
    }
    else {
      this.niveles[5] = 'Muy Alto'
    }
    /*Dimension 7*/
    if (this.dimension7 >= 0 && this.dimension7 < 1.63) {
      this.niveles[6] = 'Muy Bajo'
    }
    else if (this.dimension7 >= 1.63 && this.dimension7 < 3.19) {
      this.niveles[6] = 'Bajo'
    }
    else if (this.dimension7 >= 3.19 && this.dimension7 < 4.75) {
      this.niveles[6] = 'Mediano'
    }
    else if (this.dimension7 >= 4.75 && this.dimension7 < 6.31) {
      this.niveles[6] = 'Alto'
    }
    else {
      this.niveles[6] = 'Muy Alto'
    }
    /*Dimension 8*/
    if (this.dimension8 >= 0 && this.dimension8 < 2.18) {
      this.niveles[7] = 'Muy Bajo'
    }
    else if (this.dimension8 >= 2.18 && this.dimension8 < 4.26) {
      this.niveles[7] = 'Bajo'
    }
    else if (this.dimension8 >= 4.26 && this.dimension8 < 6.34) {
      this.niveles[7] = 'Mediano'
    }
    else if (this.dimension8 >= 6.34 && this.dimension8 < 8.42) {
      this.niveles[7] = 'Alto'
    }
    else {
      this.niveles[7] = 'Muy Alto'
    }

    this.cargar_recomendaciones();
  }

  cargar_recomendaciones(){
    console.log("Hola")
    this.resultados = [
      {
        dimension: "Planeación Estratégica",
        nivel: this.niveles[0],
        recomendacion: this.recomendaciones[0][this.niveles[0]],
        porcentaje: this.porcentajes[0][this.niveles[0]],
        color: this.colores_rec[0][this.niveles[0]]
      },
      {
        dimension: "Aseguramiento de la calidad",
        nivel: this.niveles[1],
        recomendacion: this.recomendaciones[1][this.niveles[1]],
        porcentaje: this.porcentajes[0][this.niveles[1]],
        color: this.colores_rec[0][this.niveles[1]]
      },
      {
        dimension: "Cadena de valor",
        nivel: this.niveles[2],
        recomendacion: this.recomendaciones[2][this.niveles[2]],
        porcentaje: this.porcentajes[0][this.niveles[2]],
        color: this.colores_rec[0][this.niveles[2]]
      },
      {
        dimension: "Marketing",
        nivel: this.niveles[3],
        recomendacion: this.recomendaciones[3][this.niveles[3]],
        porcentaje: this.porcentajes[0][this.niveles[3]],
        color: this.colores_rec[0][this.niveles[3]]
      },
      {
        dimension: "Contabilidad y Finanzas",
        nivel: this.niveles[4],
        recomendacion: this.recomendaciones[4][this.niveles[4]],
        porcentaje: this.porcentajes[0][this.niveles[4]],
        color: this.colores_rec[0][this.niveles[4]]
      },
      {
        dimension: "Gestión de Talento Humano",
        nivel: this.niveles[5],
        recomendacion: this.recomendaciones[5][this.niveles[5]],
        porcentaje: this.porcentajes[0][this.niveles[5]],
        color: this.colores_rec[0][this.niveles[5]]
      },
      {
        dimension: "Gestión Ambiental",
        nivel: this.niveles[6],
        recomendacion: this.recomendaciones[6][this.niveles[6]],
        porcentaje: this.porcentajes[0][this.niveles[6]],
        color: this.colores_rec[0][this.niveles[6]]
      },
      {
        dimension: "Sistemas de Información",
        nivel: this.niveles[7],
        recomendacion: this.recomendaciones[7][this.niveles[7]],
        porcentaje: this.porcentajes[0][this.niveles[7]],
        color: this.colores_rec[0][this.niveles[7]]
      }
    ]
    console.log(this.resultados)
  }

  generatePDF(){
    let pdf = new jsPDF('l', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("RecomendacionesCompetitividad.pdf");
      }
    })
  }

}
