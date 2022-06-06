import { ICarouselItem } from './Icarousel-item.metadata';

export const CAROUSEL_DATA_ITEMS: ICarouselItem[] = [
    {
        id: 1,
        title: {
            first: 'Competitividad del sector microempresarial'
        },
        subtitle: 'Ingresa y evalúate para conocer la competitividad de tu microempresa.',
        link: '/mi-empresa/evaluacion-competitividad',
        image: '../../../assets/Home/home.jpg',
        marginLeft: 0
    },

    {
        id: 2,
        title: {
            first: 'Madurez digital del sector microempresarial'
        },
        subtitle: 'Ingresa y evalúate para conocer la madurez digital de tu microempresa.',
        link: '/mi-empresa/evaluacion-madurez-digital',
        image: '../../../assets/Home/home2.jpg',
        marginLeft: 0
    },

    {
        id: 3,
        title: {
            first: 'Proyecto Madurez digital & Competitividad'
        },
        subtitle: 'Conoce acerca de los objetivos del proyecto y sus beneficios a la sociedad',
        link: '/proyecto',
        image: '../../../assets/Home/home3.jpg',
        marginLeft: 0
    }
];