# Wallet Bootstrap jQuery

Proyecto frontend desarrollado para una evaluación de módulo del Bootcamp Full Stack Java. La aplicación simula una billetera digital simple, permitiendo iniciar sesión, consultar saldo, depositar dinero, enviar dinero a contactos y revisar los últimos movimientos.

## Objetivo del proyecto

Construir una interfaz web funcional usando HTML, CSS, Bootstrap, jQuery y JavaScript modular, aplicando validaciones de formularios, manipulación del DOM, persistencia en el navegador y separación de responsabilidades en archivos JavaScript.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5.3.8
- jQuery 3.7.1
- JavaScript ES Modules
- LocalStorage y SessionStorage


## Funcionalidades

- Inicio de sesión con usuario de prueba obligatorio.
- Protección de páginas internas mediante sesión activa.
- Visualización del saldo disponible.
- Depósito de dinero con validación de monto.
- Envío de dinero a contactos registrados.
- Validación de saldo suficiente antes de transferir.
- Agenda de contactos inicial.
- Creación de nuevos contactos desde un modal.
- Búsqueda de contactos por nombre o alias.
- Registro de movimientos de depósito y transferencia.
- Visualización de últimos movimientos con fecha, monto y detalles.
- Persistencia de saldo, contactos y movimientos en `localStorage`.
- Manejo de sesión en `sessionStorage`.
- Loader visual entre pantallas.
- Botones con estado de carga durante acciones como login, depósito y envío de dinero.
- Transición suave al cargar cada página.

## Credenciales de prueba

Para ingresar a la aplicación se debe usar obligatoriamente el siguiente usuario de prueba:

```txt
Email: usuario@wallet.cl
Contraseña: 123456
```

Si se ingresa otro correo o una contraseña distinta, la aplicación muestra un mensaje de error y no permite acceder al menú principal.

## Cómo ejecutar el proyecto

Este proyecto no requiere instalación de dependencias locales, ya que Bootstrap y jQuery se cargan desde CDN.

Por usar módulos de JavaScript, se recomienda ejecutar el proyecto desde un servidor local con live server en vsCode .

Luego abrir en el navegador:

```txt
http://localhost:5500/login.html
```


## Descripción de archivos principales

### HTML

- `login.html`: pantalla de inicio de sesión.
- `menu.html`: menú principal con saldo y navegación.
- `deposit.html`: formulario para depositar dinero.
- `sendmoney.html`: formulario para transferir dinero y agregar contactos.
- `transactions.html`: listado de últimos movimientos.
- `index.html`: redirige al menú principal mediante el archivo principal de JavaScript.

### JavaScript

- `app.js`: inicializa datos base, detecta la página actual, protege rutas y carga el módulo correspondiente.
- `config.js`: define saldo inicial, usuario válido, claves de almacenamiento, rutas protegidas y contactos iniciales.
- `auth.js`: valida credenciales, inicia sesión, cierra sesión y protege páginas internas.
- `wallet.js`: maneja saldo, depósitos y transferencias.
- `transactions.js`: crea, guarda y obtiene movimientos.
- `contacts.js`: gestiona contactos, búsqueda, creación y validación de duplicados.
- `loader.js`: centraliza el loader visual, la transición de páginas y los botones en estado de carga.
- `storage.js`: centraliza lectura y escritura en `localStorage`.
- `validators.js`: contiene validaciones reutilizables para email, montos, CBU y campos requeridos.
- `ui.js`: contiene funciones reutilizables para mensajes, formato de moneda, fechas y renderizado.
- `assets/js/pages/`: contiene la lógica específica de cada pantalla.

### CSS

- `styles.css`: define los estilos principales de la aplicación, tarjetas, botones, saldo y movimientos.
- `loader.css`: define el overlay de carga, spinner, efecto de desenfoque y transición suave entre páginas.

## Flujo de uso

1. El usuario ingresa a `login.html`.
2. Inicia sesión con las credenciales de prueba.
3. La aplicación guarda la sesión en `sessionStorage`.
4. Desde el menú principal puede:
   - Ver el saldo disponible.
   - Depositar dinero.
   - Enviar dinero a un contacto.
   - Revisar los últimos movimientos.
   - Cerrar sesión.
5. Las operaciones modifican el saldo y registran movimientos en `localStorage`.

## Persistencia de datos

La aplicación usa `localStorage` para conservar:

- Saldo actual: `walletBalance`
- Movimientos: `walletTransactions`
- Contactos: `walletContacts`

La sesión activa se guarda en `sessionStorage` con la clave:

- `walletAuthenticated`

Al cerrar sesión se elimina solamente la sesión, pero se mantienen el saldo, los contactos y los movimientos guardados.

## Validaciones implementadas

- Campos obligatorios en login y formularios.
- Formato básico de email.
- Montos numéricos mayores que cero.
- Saldo suficiente antes de enviar dinero.
- Contacto seleccionado antes de transferir.
- CBU de exactamente 22 dígitos.
- Prevención de contactos duplicados por CBU o alias.
- Validación de datos recuperados desde `localStorage`.

## Funcionalidades técnicas utilizadas

- Eventos con jQuery para formularios, botones y búsqueda de contactos.
- Manipulación del DOM para mostrar saldo, contactos, mensajes y movimientos.
- Módulos JavaScript con `import` y `export`.
- Carga dinámica de módulos según la página actual.
- Uso de `localStorage` para datos persistentes.
- Uso de `sessionStorage` para controlar la sesión iniciada.
- Uso de Bootstrap para formularios, botones, alertas, modal y spinner.
- Uso de `Intl.NumberFormat` para mostrar montos en pesos chilenos.
- Uso de `Intl.DateTimeFormat` para mostrar fechas de movimientos.
- Uso de `crypto.randomUUID()` para generar identificadores únicos.
- Loader reutilizable separado en su propio archivo para mantener el código ordenado.

## Datos iniciales

Al iniciar por primera vez, la aplicación crea automáticamente:

- Saldo inicial de `$850.000`.
- Movimiento inicial de saldo.
- Contactos de prueba:
  - María González
  - Juan Pérez

## Consideraciones para la evaluación

Este proyecto demuestra:

- Uso de Bootstrap para diseño responsive.
- Uso de jQuery para eventos y manipulación del DOM.
- Organización del código JavaScript en módulos.
- Separación entre lógica de negocio, UI, validaciones y persistencia.
- Uso de almacenamiento del navegador.
- Validación de datos antes de ejecutar operaciones.
- Navegación entre múltiples pantallas.
- Mejora de experiencia de usuario mediante loaders y transiciones.


## Autor

⌨️ con 💖 por [Abraham Lillo](https://github.com/toffycaluga)

Proyecto desarrollado como parte de una evaluación de módulo del Bootcamp Full Stack Java.
