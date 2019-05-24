// JavaScript Document
 <!-- DECLARACIÓN DE VARIABLES -->
        var SecuenciaID = null
        var imagen = 0
        var tiempo = 1
         
        <!-- ARRAY DE IMÁGENES -->
        {imagenes = new CreaArray(10)
        imagenes[1].src = "image/canon.jpg"
		imagenes[2].src = "image/rovx3_v01.jpg"
        imagenes[3].src = "image/buzox2_acquascatt.jpg"
        imagenes[4].src = "image/buzox2.jpg"
        imagenes[5].src = "image/medidas_potencial_v01.jpg"
		imagenes[6].src = "image/doppler.jpg"
		imagenes[7].src = "image/globo.jpg"
		imagenes[8].src = "image/tomas_manolo.jpg"
		imagenes[9].src = "image/buzos_estacion.jpg"
		imagenes[10].src = "image/buzo_muestrasx2.jpg"
		
        }
         
        <!-- ARRAY DE "DURACIONES". Tiempo durante el cual se mostrará cada imagen (milisegundos)-->
        {duracion = new CreaArray2(10)
        
		duracion[1] = 2500
        duracion[2] = 2500
        duracion[3] = 2500
        duracion[4] = 2500
        duracion[5] = 2500
		duracion[6] = 2500
		duracion[7] = 2500
		duracion[8] = 2500
		duracion[9] = 2500
		duracion[10] = 2000
		}
         
        <!-- ARRAY DE "TAMAÑOS". Tamaño que irá tomando cada imagen -->
        {size = new CreaArray2(10)
        
		size[1] = 350
        size[2] = 350
        size[3] = 350
        size[4] = 350
		size[5] = 350
		size[6] = 350
		size[7] = 350
		size[8] = 350
		size[9] = 350
		size[10] = 350
        }
         
        <!-- FUNCIONCES QUE DEBEMOS DEFINIR PARA CREAR LOS ARRAYS -->
        function CreaArray(n) {
            <!-- DEFINIMOS EL TAMAÑO DEL ARRAY -->
            this.length = n
            for (var i = 1; i<=n; i++) {
                this[i] = new Image()
            }
            return this
        }
         
        function CreaArray2(n) {
            this.length = n
            for (var i = 1; i<=n; i++) {
                this[i] = 0
            }
            return this
        }
         
        function MostrarSecuencia () {
            {
                <!-- DEFINIR TAMAÑO DE LAS IMÁGENES -->
                document.images["secuencia"].width = 1.9*size[imagen]
                document.images["secuencia"].height = size[imagen]
                 
                <!-- A TODAS LAS IMÁGENES DE <body> CUYO NOMBRE SEA "Secuencia" -->
                <!-- LE ASIGNAMOS LAS DEL ARRAY -->
                document.images["secuencia"].src = imagenes[imagen].src
                <!-- INCREMENTA EL VALOR DE "imagen" PARA QUE A CADA VUELTA MUESTRE LA -->
                <!-- SIGUIENTE SI LLEGA AL FINAL, COMIENZA POR LA PRIMERA DE NUEVO. -->
                imagen++
                if ( imagen == 11 )
                    imagen = 1
            }
            <!-- setTimeout PERMITE EJECUTAR UNA FUNCIÓN PASADO CIERTO TIEMPO. -->
            SecuenciaID = setTimeout("MostrarSecuencia()", duracion[tiempo])
            tiempo++
                if ( tiempo == 5 )
                    tiempo = 1
            SecuenciaEjecutandose = true
        }
         
        function IniciarSecuencia() {
            imagen = 1
            MostrarSecuencia()
        }
         
   