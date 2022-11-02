import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recomenadaciones-competitividad',
  templateUrl: './recomenadaciones-competitividad.component.html',
  styleUrls: ['./recomenadaciones-competitividad.component.css']
})
export class RecomenadacionesCompetitividadComponent implements OnInit {
  //niveles?: { nivel: string};
  //@ViewChild('content') invoiceElement!: ElementRef;
  @ViewChild('content', {static:false}) el!: ElementRef;
  niveles = '';
  empresa = '';
  porcentajes: any = [
    {
      "No existe": "0 %",
      "Muy Baja": "0.1 % - 20.99 %",
      "Baja": "21 % - 40.99 %",
      "Mediana": "41 % - 60.99 %",
      "Alta": "61 % - 80.99 %",
      "Muy Alta": "81 % - 100 %"
    }
  ];
  colores: any = [
    {
      "No existe": "#808080",
      "Muy Baja": "#E02525",
      "Baja": "#E1770D",
      "Mediana": "#CCC01D",
      "Alta": "#5BCD18",
      "Muy Alta": "#17942E"
    }
  ];
  niveleSeparados: any = [];
  recomendaciones: any = [
    {
      "No existe": "Comenzar con el desarrollo de la estrategia definiendo: misión, valores y visión; y además, revisar la situación en su entorno competitivo y operativo (externo e interno), especialmente los cambios que han ocurrido desde la última vez que diseñó su estrategia.",
      "Muy Baja": "Planificar la estrategia mediante el desarrollo de objetivos, medidas, metas, iniciativas y presupuestos estratégicos. Para esto se debe: crear mapas estratégicos, seleccionar medidas y objetivos, elegir iniciativas estratégicas, establecer el presupuesto para financiar las iniciativas estratégicas y crear equipos temáticos.",
      "Baja": "Vincular la estrategia de la empresa con las estrategias de sus unidades funcionales y de negocios individuales. Todos los empleados deben comprender la estrategia y deben estar motivados para ayudar a la empresa a tener éxito con la estrategia. Para esto se debe alinear: las unidades de negocio, las unidades de apoyo y los empleados.",
      "Mediana": "Alinear sus actividades de mejora de procesos con prioridades estratégicas, además, el financiamiento de los recursos para operar el negocio debe ser coherente con el plan estratégico. Para esto se debe: mejorar los procesos clave y desarrollar el plan de capacidad de recursos.",
      "Alta": "Examinar el desempeño funcional y departamental para abordar los problemas que han surgido o persisten, para lo cual, se deben llevar a cabo reuniones de revisión de la estrategia para discutir los indicadores e iniciativas del Cuadro de Mando Integral (Balanced Scorecard) de la unidad y evaluar el progreso y las barreras para la ejecución de la estrategia.",
      "Muy Alta": "Probar si los supuestos estratégicos fundamentales siguen siendo válidos. Actualizar la estrategia implica modificar el mapa estratégico y el Cuadro de Mando Integral de la organización, dando origen a un ciclo de mejora continua en la planeación estratégica."
    },
    {
      "No existe": "Concientizar a la organización para enfocar su gestión hacia la mejora continua, a través de procesos de capacitación y formación continua en temas de calidad. Planificar sistema de gestión de la calidad identificando necesidades de clientes en relación a la satisfacción en función de la calidad de productos y/o servicios ofrecidos por la empresa.",
      "Muy Baja": "Comunicar a todo el personal sobre procesos en la gestión de la calidad dentro de la empresa, beneficios y oportunidades para alcanzar mayor productividad. Implementar la calidad como política de trabajo en la empresa. Diseñar un sistema de documentación que responda al modelo de gestión aplicable para cada tipo de empresa, de tal manera que se genere una cultura de transparencia y comunicación efectiva.",
      "Baja": "Implantar el sistema de gestión de la calidad en todos los niveles de la empresa y con el involucramiento de todas las personas que laboran en la organización, de tal manera que se fomente la calidad como eje central en el modelo de negocio de la empresa. Aplicar procesos de automatización y uso de tecnologías que apoyen a la regulación de procesos de calidad en la empresa.",
      "Mediana": "Dar seguimiento y continuidad al sistema de gestión de la calidad en la empresa, y aplicar estrategias de medición del sistema de gestión de la calidad para evaluar resultados y efectividad de manera periódica.",
      "Alta": "Fomentar la mejora continua como filosofía de negocio, gestionando procesos que permitan la reducción de errores y de desperdicios. Uso efectivo de materias primas, aumentando la eficiencia de la empresa en sus procesos productivos y prestación de servicios a los clientes.",
      "Muy Alta": "Gestionar la implementación de estrategias de control de calidad a través del uso de sistemas basados en el uso de la tecnología y redes de comunicación. Aplicar procesos de certificación que permitan la acreditación de la empresa en relación a su gestión con enfoque en calidad y mejora continua. La mejora continua permitirá optimizar y estandarizar procesos, creando valor para el consumidor y con ello generar lealtad."
    },
    {
      "No existe": "Iniciar con la desagregación de las actividades primarias y de apoyo de la empresa dentro del proceso productivo o de servicio.",
      "Muy Baja": "Implementar controles en las diferentes áreas involucradas en el proceso productivo o servicio.",
      "Baja": "Determinar las fuentes de competitividad de las partes o aspectos de la empresa que contribuyen a la generación de valor para el cliente. Planificar la producción acorde a la demanda del mercado y el proceso productivo y de servicio cuenta con cierto grado de flexibilidad para adaptarse a las demandas del mercado y acorde la capacidad instalada de su empresa.",
      "Mediana": "Incorporar de la tecnología en algunas actividades del proceso productivo o de servicio. Fortalecer las áreas de comunicación y servicio al cliente con las TI, así de conocer el nivel de satisfacción del cliente y sus tendencias de consumo.",
      "Alta": "Incorporar a las actividades primarias y de apoyo de la cadena productiva los procesos de innovación para satisfacer de manera la experiencia del cliente y a generar ventajas competitivas en el mercado.",
      "Muy Alta": "Fortalecer el proceso productivo y todas las áreas de la empresa, con el apoyo tecnológico. Establecer en la empresa un sistema de D+I+i que les permita ser competitivas en el largo plazo."
    },
    {
      "No existe": "Diseñar un plan y estrategia de merchandising con la finalidad de incrementar la colocación y visibilización de los productos y/o servicios en el mercado.",
      "Muy Baja": "Diseñar un plan y estrategia de merchadasing basado en el perfil del cliente y en un ciclo de mejora continua.",
      "Baja": "Fortalecer y evolucionar a estrategias de marketing en base a la satisfacción del cliente, a sus sugerencias y necesidades. Establece indicadores y metas.",
      "Mediana": "Integrar a la estrategia de marketing un enfoque 360 que involucre a todos los productos y servicios orientados al cliente. Utiliza la información que genera de sus clientes para la toma de decisiones.",
      "Alta": "Diseñar e implementar una estrategia de marketing digital que además de un enfoque personalizado hacia el cliente, llega a él a través de diferentes canales tradicionales y digitales, trasladando el concepto de la marca al punto de venta .",
      "Muy Alta": "Su estrategia de marketing deberá integrar ampliamente las posibilidades de las nuevas tecnologías de información, adaptando las estrategias al segmento de cliente además de su perfil y características más digitales, trasladando además del concepto de marca la experiencia de compra. Además, se maneja como una estrategia de comunicación y no solo de ventas. Aplica herramientas de analítica para el mejoramiento de la estrategia."
    },
    {
      "No existe": "Implementar un sistema contable básico acorde a la actividad de la empresa que permite medir la evolución del patrimonio y el resultado periódico de la empresa y se realizan estados financieros de manera mensual y periódica acorde a su actividad económica.",
      "Muy Baja": "Implementar un sistema de costos que le permita interpretar los costos de adquisición, producción, distribución, administración y financiamiento.",
      "Baja": "Establecer controles y procesos adecuados para la recuperación y cobranza de las ventas a crédito y de manejo de inventarios de las mercancías o materiales para la producción.",
      "Mediana": "Establecer una planificación financiera sostenible considerando todos los gastos programados, metas de crecimiento, inversiones en tecnología, implementación de políticas de sostenibilidad que le permitan minimizar sus riesgos que se enfrenta toda empresa. Definir métricas necesarias para evaluar los objetivos propuestos por la organización en las diferentes áreas funcionales; así como la incorporación de políticas de un plan financiero sostenible.",
      "Alta": "Tomar decisiones apoyadas con la generación de información de datos en tipo real, la inclusión de las nuevas tecnologías debe apoyar a la gestión financiera de manera ágil y oportuna. Integrar la tecnológica en todas las áreas de la empresa, el acceso a la generación de reportes e información es más accesible gracias al uso de soluciones modernas como el cloud, así como a los controles de calidad en los procesos y de seguridad del sistema de la empresa.",
      "Muy Alta": "Incluir dentro de la planificación financiera, los rubros necesarios relacionados con la sostenibilidad de la empresa, así como la transformación digital de las áreas y procesos de la empresa."
    },
    {
      "No existe": "Concientizar a la organización sobre la relevancia de gestionar adecuadamente el talento humano como base fundamental para potenciar el desempeño y logro de objetivos. Analizar la necesidad de implementar un sistema de gestión del talento humano para optimar el uso de recursos dentro de la empresa y mejorar la calidad de productos y/o servicios ofrecidos por la misma.",
      "Muy Baja": "Diseñar un plan de gestión del talento humano para que se aplique de manera adecuada el proceso de reclutamiento, selección, contratación, capacitación y promoción del personal dentro de la empresa. Definir objetivos, metas y actores; estableciendo con claridad roles y funciones, de tal manera que todo el personal conozca niveles jerárquicos y líneas de mando (manual de procesos y funciones). Implementar políticas que promuevan el liderazgo y la motivación a través del trabajo colaborativo. Establecer estrategias y acciones de salud y seguridad ocupacional. Fortalecer el sentido de pertenencia, que se produzca en los empleados la sensación de que son parte de la empresa e intégralos a los procesos de crecimiento.",
      "Baja": "Desarrollar procesos de capacitación permanente para el personal. Potenciar el trabajo en equipo. Promover el desarrollo de competencias y habilidades para una mejor gestión de tareas en toda la organización. Retroalimentar oportunamente las actividades dentro de la empresa, considerar la opinión de tus colaboradores como parte del proceso de toma de decisiones. Mejorar la comunicación interna y relaciones laborales para optimizar recursos y lograr metas y objetivos organizacionales.",
      "Mediana": "Aplicar procesos de división y especialización en puestos de trabajo, considerando la experiencia y trayectoria profesional de los empleados. Implementar programas de incentivos económicos y no económicos.",
      "Alta": "Implementar los círculos de calidad como estrategia para fortalecer el desempeño grupal y mejorar el trabajo colaborativo a través de los equipos autodirigidos. Fomentar el trabajo autónomo como estrategia de desarrollo y experiencia laboral.",
      "Muy Alta": "Aplicar procesos de evaluación permanente del desempeño a través de la implementación de sistemas automatizados que aseguren información oportuna para la toma de decisiones en relación a estándares e indicadores."
    },
    {
      "No existe": "Es necesario identificar y definir una estrategia de adopción de gestión ambiental, los requerimientos, entrada, proceso y salidas; y en general para la planeación, diseño e implementación de procesos ambientales",
      "Muy Baja": "Es necesario identificar y definir una estrategia de adopción de gestión ambiental, los requerimientos, entrada, proceso y salidas; y en general para la planeación, diseño e implementación de procesos ambientales. Diseñar un plan y estrategia de gestión ambiental basado en el perfil de la empresa u cliente y la concientización de cumplirlas regularmente.",
      "Baja": "Es necesario realizar una campaña de socialización, difusión y regularización de los procesos y estrategias ambientales de la empresa y cliente.",
      "Mediana": "Implementar técnicas de diagnóstico para los procesos y técnicas ambientales a los actores involucrados en la empresa y clientes. Establecer estrategias de gestión y cumplimiento de las estrategias o estándares ambientales para los integrantes de la organización.",
      "Alta": "Establecer políticas de certificaciones o reconocimientos para garantizar un proceso formal y estandarizado para la empresa. Ajustar la estrategia de planeación de la adopción de procesos ambientales a la estrategia organizacional",
      "Muy Alta": "Analizar y realizar los ajustes necesarios a la estrategia ambientales. Socialización y difusión de los resultados obtenidos en la implementación de procesos ambientales. Establecer, documentar y socializar los procesos o técnicas ambientales implementadas para ser replicadas en otras organizaciones."
    },
    {
      "No existe": "Identificar la necesidad de adoptar tecnologías y sistemas de la información.",
      "Muy Baja": "Preparar la organización para la adopción de tecnologías y sistemas de la información (cadena de valor, procesos primarios y secundarios). Identificar y definir la estrategia para la planeación, diseño e implementación de las tecnologías de la información. Realizar la planeación de una estrategia de gestión de sistemas y tecnologías de la información que aporte a la estrategia organizacional de la empresa.",
      "Baja": "Realizar un diagnóstico de los sistemas de información que dispone la empresa; ¿Están aportando a lograr los objetivos de la empresa? ¿Están siendo gestionados adecuadamente? ¿Se pueden mejorar?. Planear y diseñar una estrategia de gestión de sistemas y tecnologías de la información que aporte a la estrategia organizacional de la empresa.",
      "Mediana": "Revisar la estrategia de gestión de los sistemas de información en la empresa, sus entradas, proceso y salidas. Implementar, adoptar o mejorar la estrategia de gestión de sistemas y tecnologías de la información que permita alinear la TI a la estrategia organizacional, aporten valor, ventaja competitiva y generen innovación a la empresa. Evaluar la incorporación de tecnologías para la digitalización orientadas a la gestión de datos, nube, seguridad de la información.",
      "Alta": "Evaluar con miras a la mejora de la estrategia de digitalización de la empresa, enfatizar en la incorporación de ciberseguridad, protección de endpoints, nube híbrida, etc.",
      "Muy Alta": "Analizar y realizar los ajustes necesarios a la estrategia de digitalización de la empresa."
    },
  ]
  resultados: any = [{ dimension: '', nivel: '', recomendacion: '', porcentaje: '', color: '' }];
  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.niveles = String(this.rutaActiva.snapshot.params?.['niveles']);
    this.niveleSeparados = this.niveles.split("-");
    this.empresa = this.niveleSeparados[8];
    this.resultados = [
      {
        dimension: "Planeación Estratégica",
        nivel: this.niveleSeparados[0],
        recomendacion: this.recomendaciones[0][this.niveleSeparados[0]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[0]],
        color: this.colores[0][this.niveleSeparados[0]]
      },
      {
        dimension: "Aseguramiento de la calidad",
        nivel: this.niveleSeparados[1],
        recomendacion: this.recomendaciones[1][this.niveleSeparados[1]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[1]],
        color: this.colores[0][this.niveleSeparados[1]]
      },
      {
        dimension: "Cadena de valor",
        nivel: this.niveleSeparados[2],
        recomendacion: this.recomendaciones[2][this.niveleSeparados[2]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[2]],
        color: this.colores[0][this.niveleSeparados[2]]
      },
      {
        dimension: "Marketing",
        nivel: this.niveleSeparados[3],
        recomendacion: this.recomendaciones[3][this.niveleSeparados[3]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[3]],
        color: this.colores[0][this.niveleSeparados[3]]
      },
      {
        dimension: "Contabilidad y Finanzas",
        nivel: this.niveleSeparados[4],
        recomendacion: this.recomendaciones[4][this.niveleSeparados[4]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[4]],
        color: this.colores[0][this.niveleSeparados[4]]
      },
      {
        dimension: "Gestión de Talento Humano",
        nivel: this.niveleSeparados[5],
        recomendacion: this.recomendaciones[5][this.niveleSeparados[5]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[5]],
        color: this.colores[0][this.niveleSeparados[5]]
      },
      {
        dimension: "Gestión Ambiental",
        nivel: this.niveleSeparados[6],
        recomendacion: this.recomendaciones[6][this.niveleSeparados[6]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[6]],
        color: this.colores[0][this.niveleSeparados[6]]
      },
      {
        dimension: "Sistemas de Información",
        nivel: this.niveleSeparados[7],
        recomendacion: this.recomendaciones[7][this.niveleSeparados[7]],
        porcentaje: this.porcentajes[0][this.niveleSeparados[7]],
        color: this.colores[0][this.niveleSeparados[7]]
      }
    ]
  }

  generatePDF(){
    let pdf = new jsPDF('p', 'pt', 'a3');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("RecomendacionesCompetitividad" + this.empresa + ".pdf");
      }
    })
  }

}
