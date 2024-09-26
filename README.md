## Dashboard de Bienestar Emocional
Este proyecto es un dashboard de bienestar emocional diseñado para ayudar a las personas a visualizar su nivel de estrés en tiempo real, basado en interacciones con el mouse y los clics del usuario. Si el nivel de estrés supera los 70 puntos, el sistema recomienda tomar un descanso y ofrece un ejercicio de respiración guiado para ayudar a reducir el estrés.

## Funcionalidades
-Registro del nivel de estrés: A medida que el usuario mueve el mouse y hace clic, se acumulan puntos que simulan un aumento en el estrés. Cada vez que se hace clic en el botón "Saber el nivel de estrés", se actualiza el nivel de estrés en el gráfico.
-Visualización gráfica: El nivel de estrés se muestra en un gráfico dinámico que registra cada nivel en tiempo real.
-Ejercicio de respiración: Si el nivel de estrés supera 70 puntos, el dashboard ofrece un ejercicio de respiración guiado para ayudar al usuario a relajarse.
-Fases del ejercicio: El ejercicio sigue un patrón simple:
Inhalar durante 4 segundos.
Sostener la respiración durante 4 segundos.
Exhalar lentamente durante 6 segundos.

## Tecnologías utilizadas
React: El framework principal para la creación de la interfaz de usuario.
Chart.js: Biblioteca utilizada para crear el gráfico de línea interactivo.
Axios: Utilizado para hacer peticiones HTTP al backend que simula la evaluación del nivel de estrés.
CSS: Para los estilos personalizados de los componentes.
