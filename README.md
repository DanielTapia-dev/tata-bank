
# Reto técnico

Este proyecto está desarrollado en Angular, y se usa para como parte del reto técnico para TCS.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/TU_USUARIO/mi-proyecto-angular.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd mi-proyecto-angular
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Cómo correr el proyecto

### 1. Ejecutar con Proxy

El backend entregado no tiene configurado el CORS, por lo que se ha creado un archivo de proxy para evitar problemas al hacer peticiones a la API. Para correr el proyecto con el proxy, utiliza el siguiente comando:

```bash
npm start
```

Esto ejecutará el proyecto y usará el archivo `proxy.conf.json` para redirigir las solicitudes de la API.

### 2. Ejecutar con `ng serve`

Alternativamente, también puedes correr el proyecto usando `ng serve`. Sin embargo, debes tener en cuenta que **esto no utilizará el proxy** y si el backend no está configurado para aceptar solicitudes de otros orígenes, puede ocasionar problemas con CORS.

```bash
ng serve
```

## Cómo correr los tests

Para ejecutar los tests y ver un resumen con el porcentaje de cobertura, puedes usar el siguiente comando:

```bash
npm test
```

Este comando ejecutará los tests de Jest y te mostrará un resumen con la cobertura de los tests, que indica qué porcentaje del código está cubierto por los tests.

## Tecnologías y Versiones

- **Angular**: v14.x.x
- **Jest**: v29.x.x
- **TypeScript**: v4.x.x
- **Node.js**: v16.x.x

### Dependencias principales

- **@angular/core**: 14.2.0
- **@angular/cli**: 14.2.12
- **@angular/common**: 14.2.0
- **@angular/forms**: 14.2.0
- **rxjs**: 7.x.x
- **zone.js**: 0.11.x
