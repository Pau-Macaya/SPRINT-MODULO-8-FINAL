# SPRINT-MODULO-8-FINAL

Módulo: Implementación de API BackEnd Node Express. 

Nivel de Dificultad: Media

Tema: Competencia del Módulo 

Evaluación Final del Módulo:
● Crear una API REST con el Framework Express.
● Servir contenido dinámico con express-handlebars.
● Ofrecer la funcionalidad Upload File con express-fileupload.
● Implementarseguridad y restricción de recursos o contenido
con JWT.

                          Descripción de la Evaluación:

La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games próximos, y han iniciado con la gestión para desarrollar la
plataforma web en la que los participantes se podrán registrar y revisar el estado de su solicitud.
En esta prueba deberás ocupar todos tus conocimientos para desarrollar un sistema que involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el frontend y backend.
Las tecnologías y herramientas que deberás ocupar son las siguientes:
● Express
● Handlebars
● MySQL
● JWT
● Express-fileupload

A continuación, se muestra la interfaz gráfica que tendrás disponible como propuesta. No obstante, siéntete libre
de maquetar a tu gusto siempre y cuando cumplas con los requerimientos.

    Indicaciones:
    
● El sistema debe permitir registrar nuevos participantes.
● Se debe crear una vista para que los participantes puedan iniciarsesión con su correo y contraseña.
● Luego de iniciar la sesión, los participantes deberán poder modificar sus datos, exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT y los datos que se utilicen en la planilla deben ser extraídos del token.
● La vista correspondiente a la ruta raíz debe mostrar todos los participantes registrados y su estado de revisión.
● La vista del administrador debe mostrar los participantes registrados y permitir aprobarlos para cambiar su
estado.
Se debe persistir la información de los usuarios en MySQL, por lo que deberás usar las siguientes sentencias SQL
para la creación de la base datos y la tabla de participantes.

CREATE DATABASE skatepark;
CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre
VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia
INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
NULL, estado BOOLEAN NOT NULL);

    Requerimientos:
    
1. Crear una API REST con el Framework Express
2. Servir contenido dinámico con express-handlebars
3. Ofrecer la funcionalidad Upload File con express-fileupload
4. Implementarseguridad y restricción de recursos o contenido con JWT

