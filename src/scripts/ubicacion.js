//********COLOR TAMAÑO Y FORMA DE ICONOS */
L.DivIconoEnumerado = L.Icon.extend({
    options:{
        iconUrl:'sources/images/marcadores/marcador2.png',//<---cambiar icono
        number:'',
        status:'',
        EstudioVenc:'',
        shadowUrl:null,
        iconSize: new L.Point(25,25),
        iconAnchor: new L.Point(12.5,25),
        popupAnchor: new L.Point(0,-40),
        className:'dev-de-icono'
    },
    createIcon:function(){
        var div = document.createElement('div');
        var img =this._createImg(this.options['iconUrl']);
        //img.setAttribute("style","width:10px");
        var numdiv = document.createElement('div');
        let vFechaHoy=new Date();
        let vFechaEstudio=new Date(this.options['EstudioVenc']);
        let vEstatusEstudio;
        if(vFechaEstudio!='Invalid Date'){
            if(vFechaHoy>=vFechaEstudio){
                vEstatusEstudio='vencido';
            }else{
                vEstatusEstudio='vigente';
            };
            switch(this.options['status']){
                case 'Activo':
                    if(vEstatusEstudio=='vigente'){
                        numdiv.setAttribute ( "class", "numero_estudioVigente" );  
                    }else{
                        numdiv.setAttribute ( "class", "numero_estudioVencido" ); 
                    }
                    break;
                case 'Activo / Falta de documentos':
                    if(vEstatusEstudio=='vigente'){
                        numdiv.setAttribute ( "class", "numeroPendiente_estudioVigente" );  
                    }else{
                        numdiv.setAttribute ( "class", "numeroPendiente_estudioVencido" ); 
                    }
                    break;
                case 'Sin Estatus':
                    if(vEstatusEstudio=='vigente'){
                        numdiv.setAttribute ( "class", "numeroSinEstatus_estudioVigente" ); 
                    }else{
                        numdiv.setAttribute ( "class", "numeroSinEstatus_estudioVencido" ); 
                    }
                    break;
                default:
                    numdiv.setAttribute ( "class", "numeroBaja" );
                    break;
            }
        }else{
            if (this.options['status']=="Activo") {
                numdiv.setAttribute ( "class", "numero" );
            } else {
                if (this.options['status']=="Activo / Falta de documentos") {
                    numdiv.setAttribute ( "class", "numeroPendiente" );
                } else if(this.options['status']=="Sin Estatus") {
                    numdiv.setAttribute ( "class", "numeroSinEstatus" );
                }else{
                    numdiv.setAttribute ( "class", "numeroBaja" );
                };                
            } 
        };
        numdiv.innerHTML=this.options['number'] || '';
        div.appendChild(img);
        div.appendChild(numdiv);
        this._setIconStyles(div,'icon');
        return div;
    },
    createShadow:function(){
        return null;
    }
});
//********COLOR TAMAÑO Y FORMA DE ICONOS */

//********LLENAR FILTROS */
function MesLetra(vMesNumero){
    switch (vMesNumero) {
        case 1:
            return "Enero"
            break;
        case 2:
            return "Febrero"
            break;
        case 3:
            return "Marzo"
            break;
        case 4:
            return "Abril"
            break;
        case 5:
            return "Mayo"
            break;
        case 6:
            return "Junio"
            break;
        case 7:
            return "Julio"
            break;
        case 8:
            return "Agosto"
            break;
        case 9:
            return "Septiembre"
            break;
        case 10:
            return "Octubre"
            break;
        case 11:
            return "Noviembre"
            break;
        case 12:
            return "Diciembre"
            break;
        default:
            break;
    }
};
//********LLENAR FILTROS */

//********CARGAR LOS ELEMENTOS AL MAPA */
function CargarElementosDeMapaConID(Datos){
    for (i in Datos){
        if(Datos[i].UbicacionX==='1100'){

        }
        else{
            let fecha=new Date(Datos[i].Calibracion);
            let vFechaCal=MesLetra(fecha.getMonth()+1)+ " " + fecha.getFullYear();
            let fechaEst=new Date(Datos[i].Estudio);
            let vFechaEst=fechaEst.getFullYear()+" "+MesLetra(fechaEst.getMonth()+1);

            var Marcador = new L.Marker(
                                new xy(Datos[i].UbicacionX,Datos[i].UbicacionY),
                                {
                                    icon: new L.DivIconoEnumerado(
                                        {
                                            number:Datos[i].Gage_iD,
                                            status:Datos[i].Estatus,
                                            EstudioVenc:Datos[i].Estudio
                                        }
                                    ),
                                    tags:[
                                        Datos[i].Estatus,
                                        Datos[i].Tipo,
                                        vFechaCal,
                                        vFechaEst
                                    ]
                                }).addTo(map);
            Marcador.bindPopup(html_info(Datos));

            function onMarClick1(e){
                console.log(e.latlng.lng);
                console.log(e.latlng.lat);
                map.setView(xy(e.latlng.lng, e.latlng.lat+160), 1);
            };
            Marcador.on('click',onMarClick1);
        };
    };
    //*****FILTROS POR TAGS */
    L.control.tagFilterButton({
        data:['Activo','Activo / Falta de documentos','No Activo / Baja'],
        filterOnEveryClick: true,
        icon:'<div>Estatus</div>'
    }).addTo(map);
    L.control.tagFilterButton({
        data:[  '1.01 - Final Gage (Checking Fixture)',
                '2.01 - Gage GO - NO GO',
                '3.01 - Vernier / Caliper',
                '3.02 - Escala / Scale',
                '3.03 - Flexometro / Tape measure',
                '3.04 - Micrometro / Micrometer',
                '3.05 - Regla de vidrio / Glass calibration scale',
                '3.06 - Bloques patron / Gage blocks',
                '3.07 - Masa patron / Standard weight',
                '3.08 - Tacometro digital / Digital tachometer',
                '3.09 - Termohigrometro / Termo-higrometer',
                '3.10 - Manometro digital / Digital manometer',
                '3.11 - Termometro / Calibrator thermometer',
                '3.12 - Regla de Acero',
                '4.01 - Termometro / Thermometer',
                '4.02 - Indicador digital / Drop indicator',
                '4.03 - Cronometro / Stopwatch',
                '4.04 - Medidor de brillo / Gloss meter',
                '4.05 - Video gage',
                '4.06 - Durometro / Durometer',
                '4.07 - Celda de carga / Load cell',
                '4.08 - Testing machine INSTRON',
                '4.09 - MDR 2000 Rheometer',
                '4.10 - MV 2000 Mooney',
                '4.11 - Microscopio / Miscroscope',
                '4.12 - Bascula / Weigh Scale',
                '4.13 - Crockmeter',
                '4.14 - Bytewise standard',
                '4.15 - Jalador / Puller',
                '4.16 - Comparador Optico / Optical comparator 10X',
                '4.17 - Bomba peristaltica / Peristaltic Pump',
                '4.18 - Copa Zhan / Zhan Cup',
                '4.19 - Chatillon',
                '4.20 - Navaja Insercion/Extraccion',
                '4.21 - Sistema de Medicion',
                '4.22 - Torquimetro / Torque Screwdriver',
                '4.23 - Comparador Digital',
                '5.01 - Controlador de Temperatura',
                '5.02 - Instrumento de Extrusion'
                ],
        filterOnEveryClick:true,
        icon:'<div>Tipo</div>'
    }).addTo(map);
    let vFechaHoy= new Date();
    let dia=vFechaHoy.getDate();
    let vmes=vFechaHoy.getMonth()+1;
    let anio=vFechaHoy.getFullYear();
    let vmeses=[ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    let vCont=0;
    let vMesesTags=[];
    for (let i = 0; i <=12; i++) {
        if(typeof(vmeses[vmes+i-1])!='undefined'){
            vMesesTags.push(vmeses[vmes+i-1]+ " "+ anio); 
        }else{
                vMesesTags.push(vmeses[vCont]+" "+ parseInt(anio+1));
                vCont++;
        }
                
    };
    L.control.tagFilterButton({
        data:vMesesTags,
        filterOnEveryClick: true,
        icon:'<div>Vence Calibracion</div>'
    }).addTo(map);
    let vFechaHoy2= new Date();
    let dia2=vFechaHoy2.getDate();
    let vmes2=vFechaHoy2.getMonth()+1;
    let anio2=vFechaHoy2.getFullYear();
    let vmeses2=[ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    let vCont2=0;
    let vMesesTags2=[];
    for (let i = 0; i <=12; i++) {
        if(typeof(vmeses2[vmes2+i-1])!='undefined'){
            vMesesTags2.push(anio2-2+ " "+ vmeses2[vmes2+i-1]); 
        }else{
            vMesesTags2.push(parseInt(anio2+1)+" "+vmeses2[vCont2]);
            vCont2++;
        }
                
    };
    L.control.tagFilterButton({
        data:vMesesTags2,
        filterOnEveryClick:true,
        icon:'<div>Vence Estudio</div>'
    }).addTo(map);
    jQuery('.easy-button-button').click(function() {
        target = jQuery('.easy-button-button').not(this);
        target.parent().find('.tag-filter-tags-container').css({
            'display' : 'none',
        });
    });



    //*****FILTROS POR TAGS */

};
//********CARGAR LOS ELEMENTOS AL MAPA */
function fVisibles(){
    filtroID();
};

//******INFORMACION QUE SE MUESTRA */
function html_info(Datos){
    let Ruta;
    if (typeof(Datos[i].Ruta)=='undefined') {
        //Ruta="noFound.png";
        Ruta=Datos[i].Ruta;
    } else {
        Ruta=Datos[i].Ruta;
    }
    switch (Datos[i].Estatus) {
        case 'Activo':
            var InfoHTML=   
                    '<table style="width:100%"><tbody>'+
                    '<tr><td><div id="bgEnBloob">'+Datos[i].Gage_iD+'</div></td></tr>'+
                    '<tr><td><input type="checkbox" id="zoomCheck"><label for="zoomCheck"><img class="imagenGage" src="sources'+ '&#47' +'images'+ '&#47' +'Galeria'+ '&#47'+Ruta+'" alt="" style="max-width: 100%;align-items: center;"></label></td></tr>'+
                    '<tr><td><div id="div-Bloob">Descripcion:'+ Datos[i].Descripcion+'</font></div></td></tr>'+
                    '<tr><td><div id="div-Bloob">Vence Calibracion: '+Datos[i].Calibracion+'</font></div></td></tr>'+
                    '</tbody></table>'+
                    '<div style="text-align:center"><font size="1">[ X: '+Datos[i].UbicacionX+' , Y: '+Datos[i].UbicacionY+' ]</font>';
            break;

         case 'Activo / Falta de documentos':
            var InfoHTML=   
                    '<table style="width:100%"><tbody>'+
                    '<tr><td><div id="bgEnBloob">'+Datos[i].Gage_iD+'</div></td></tr>'+
                    '<tr><td><input type="checkbox" id="zoomCheck"><label for="zoomCheck"><img class="imagenGage" src="sources'+ '&#47' +'images'+ '&#47' +'Galeria'+ '&#47'+Ruta+'" alt="" style="max-width: 100%;align-items: center;"></label></td></tr>'+
                    '<tr><td><div id="div-Bloob">Descripcion:'+ Datos[i].Descripcion+'</font></div></td></tr>'+
                    '<tr><td><div id="div-Bloob">Vence Calibracion: '+Datos[i].Calibracion+'</font></div></td></tr>'+
                    '</tbody></table>'+
                    '<div style="text-align:center"><font size="1">[ X: '+Datos[i].UbicacionX+' , Y: '+Datos[i].UbicacionY+' ]</font>';
             break;

         case 'No Activo / Baja':
            var InfoHTML=   
                    '<table style="width:100%"><tbody>'+
                    '<tr><td><div id="bgEnBloob">'+Datos[i].Gage_iD+'</div></td></tr>'+
                    '<tr><td><input type="checkbox" id="zoomCheck"><label for="zoomCheck"><img class="imagenGage" src="sources'+ '&#47' +'images'+ '&#47' +'Galeria'+ '&#47'+Ruta+'" alt="" style="max-width: 100%;align-items: center;"></label></td></tr>'+
                    '<tr><td><div id="div-Bloob">Descripcion:'+ Datos[i].Descripcion+'</font></div></td></tr>'+
                    '<tr><td><div id="div-Bloob">Vence Calibracion: '+Datos[i].Calibracion+'</font></div></td></tr>'+
                    '</tbody></table>'+
                    '<div style="text-align:center"><font size="1">[ X: '+Datos[i].UbicacionX+' , Y: '+Datos[i].UbicacionY+' ]</font>';
            break;
    
        default:
            break;
    }
    return InfoHTML;
}

var DATOSS;
var ExcelAJSON2=function(){
    this.parseExcel=function(file){
        var reader=new FileReader();
        reader.onload=function(e){
            var data=e.target.result;
            var workbook=XLSX.read(data,{type:'binary'});
            for(let i=0;i<workbook.SheetNames.length;i++){
                if(workbook.SheetNames[i]=="UBICACIONES"){
                    workbook.SheetNames.forEach(function(sheetName){
                        var XL_row_object=XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object=JSON.stringify(XL_row_object);
                        var Datos=JSON.parse(json_object);
                        DATOSS=Datos;//<<<-----------------------------------180523
                        DescargarJSON(Datos,"UBICACIONES");
                        CargarElementosDeMapaConID(Datos);
                    });
                }
            };
        };
        reader.onerror=function(ex){
            console.log(ex);
        };
        reader.readAsBinaryString(file);
    };
};


function DescargarJSON(texto,NombreArchivo){
    /* var ArchivoCSV;
     var LinkDescarga;
     var csvString = 'ı,ü,ü,ğ,ş,#Hashtag,ä,ö';
     var universalBOM = "\uFEFF";*/
    var json_entexto=JSON.stringify(texto);
    var todo;
    todo="var UBICACIONES="+json_entexto;
    var descarga= document.getElementById("ubi");
    if(!document.getElementById("linkDescarga")){
         var a = window.document.createElement('a');
         a.setAttribute("id","linkDescarga");
         a.setAttribute('href', 'data:text/json; charset=utf-8,' + encodeURIComponent(todo));
         a.setAttribute('download', NombreArchivo+".json");
         a.setAttribute('style','color:white;');
         a.textContent="descargar Archivo JSON";
         descarga.appendChild(a);
    }else{
         var a=document.getElementById("linkDescarga");
         a.setAttribute('href', 'data:text/json; charset=utf-8,' + encodeURIComponent(todo));
         a.setAttribute('download', NombreArchivo+".json");
         a.setAttribute('style','color:white;');
         a.textContent="descargar Archivo JSON";
    }
     
     
 
     //a.click();
};
//******INFORMACION QUE SE MUESTRA */
function filtroID(){
    var Datos=DATOSS;
    console.log(Datos);
    var divID=document.querySelectorAll("div");
    //console.log(divID);
    //console.log(Datos);
    var Arreglo=[];
    var cont=1;
    divID.forEach(element => {
        if(element.className=="numero"||element.className=="numeroPendiente"
        ||element.className=="numeroSinEstatus"||element.className=="numeroBaja"
        ||element.className=="numero_estudioVigente"||element.className=="numero_estudioVencido" 
        ||element.className=="numeroPendiente_estudioVigente"||element.className=="numeroPendiente_estudioVencido" 
        ||element.className=="numeroSinEstatus_estudioVigente"||element.className=="numeroSinEstatus_estudioVencido" ){        
          // console.log(element);
            cont=cont+1;
            for (let i = 0; i < Datos.length; i++) {
                if(Datos[i].Gage_iD==element.textContent){
                    Arreglo.push(Datos[i]);
                                            
                }
            }                                                               
        }                                
    });
   // console.log(Arreglo);
    DescargarJSON(Arreglo,"UBICACIONES");
   
}




function handleFileSelect2(evento){
    if(evento.type=="change"){
        var archivos=evento.target.files;
        var excel2Json=new ExcelAJSON2();
        excel2Json.parseExcel(archivos[0]);

    }
    
};
document.getElementById('cargarArchivo').addEventListener('change',handleFileSelect2,false)

