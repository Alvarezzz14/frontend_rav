export const getDepartmentDescription = (name) => {
    const descriptions = {
        Amazonas:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed odio imperdiet...",
        Antioquia:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien non nisl vehicula...",
        Arauca:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque magna et facilisis...",
        Atlantico:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at velit sit amet erat sagittis...",
        Bolivar:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat elit a facilisis...",
        Boyacá:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere enim id urna egestas...",
        Caldas:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac sapien non dolor tincidunt...",
        Caquetá:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam a odio...",
        Casanare:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, nisi eget elementum...",
        Cauca:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lorem a justo gravida...",
        Cesar:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui vel elit cursus sodales...",
        Chocó:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus dolor id velit vehicula...",
        Cundinamarca:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel dui id neque varius...",
        Cordoba:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet risus a nibh facilisis...",
        Guainia:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac turpis at lectus vestibulum...",
        Guaviare:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt turpis sed purus...",
        Huila:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum felis ac ligula gravida...",
        La_Guajira:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at massa sed metus...",
        Magdalena:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et justo id mauris ultricies...",
        Meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in neque eu orci fermentum...",
        Nariño:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget risus eu elit venenatis...",
        Norte_de_Santander:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis dui eu...",
        Putumayo:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed eros tincidunt, placerat...",
        Quindio:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod orci eget vehicula...",
        Risaralda:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet leo non nulla iaculis...",
        San_Andres_Providencia_y_Santa_Catalina:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        Santander:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget urna sit amet dui...",
        Sucre:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper justo id lacus...",
        Tolima:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ligula ut est vehicula...",
        Valle_del_Cauca:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec dui...",
        Vaupés:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt arcu id turpis...",
        Vichada:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum dui sed ligula...",
    };
    return descriptions[name] || "No description available.";
};
