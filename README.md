Desafíos

1. Un buscador con hooks
   Migrar el buscado de mercadolibre usando solo componentes funcionales. O sea, ningún componente (incluyendo App) debe ser de clase y por lo tanto deberás usar hooks para almacenar valores.

Repetimos las consideraciones:

App: Es el único componente que tiene estado y es el que realmente llama a la API. El componente App coordina a los otros dos y les pasa data via props.

SearchForm: Es un formulario que recibe una sola prop (onSubmit) y recibe en esta prop un callback para ser invocado cuando aprieten el botón buscar.

SearchResultItem: Recibe vía props la data de un resultado y la muestra.

Crear un archivo para cada componente.

Usar el index.tsx para importar App y montarlo en el dom.

No es necesario crear carpetas por el momento.

Para usar css simplemente carguemos una hoja de estilos y usemos BEM para determinar nombres y la prop className (de todos los componentes html) para setearle el clásico atributo class a los componentes HTML.
